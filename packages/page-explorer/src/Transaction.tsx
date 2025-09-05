import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { useApi, useIsMountedRef } from '@polkadot/react-hooks';
import { AddressSmall, CopyButton, LinkExternal, MarkError, styled, Table } from '@polkadot/react-components';
import { convertWeight, V2Weight } from '@polkadot/react-hooks/useWeight';
import { KeyedEvent } from '@polkadot/react-hooks/ctx/types';

import { useTranslation } from './translate.js';
import Summary from './BlockInfo/Summary.js';

import type { HeaderExtended } from '@polkadot/api-derive/types';
import type { EventRecord, Hash, RuntimeVersionPartial, SignedBlock } from '@polkadot/types/interfaces';

import { formatBalance, formatNumber, isBn } from '@polkadot/util';

interface Props {
  className?: string;
  error?: Error | null;
  value?: string | null;
}

interface ExtrinsicData {
  from: string;
  to: string;
  amount: string;
  fee: string;
}

const EMPTY_HEADER: [React.ReactNode?, string?, number?][] = [['...', 'start', 6]];

export async function fetchBlockNumberByTx(txHash: string): Promise<string> {
  try {
    const SUBQUERY_GRAPHQL = process.env.SUBQUERY_GRAPHQL;
    if (!SUBQUERY_GRAPHQL) {
      throw new Error('subquery service is not defined');
    }

    const query = `
      {
        txIndex(id: "${txHash}") {
          blockNumber
        }
      }
    `;

    const res = await fetch(SUBQUERY_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const json = await res.json();
    const blockNumber = json?.data?.txIndex?.blockNumber?.toString();

    if (!blockNumber) {
      throw new Error('transaction not found. Please check that the specified transaction hash is correct');
    }

    return blockNumber;
  } catch (err: any) {
    throw new Error(`Failed to fetch block number: ${err.message}`)
  }
}

export default function Transaction({ className = '', error, value }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { txHash } = useParams<{ txHash: string }>();
  const mountedRef = useIsMountedRef();

  const [block, setBlock] = useState<SignedBlock | undefined>(undefined);
  const [header, setHeader] = useState<HeaderExtended | null>(null);
  const [extrinsicData, setExtrinsicData] = useState<ExtrinsicData | null>(null);
  const [events, setEvents] = useState<KeyedEvent[] | null>(null);
  const [runtimeVersion, setRuntimeVersion] = useState<RuntimeVersionPartial | null>(null);
  const [nextBlockHash, setNextBlockHash] = useState<Hash | null>(null);
  const [blkError, setBlkError] = useState<Error | null | undefined>(error);

  const safeSet = useCallback((setter: Function) => (value: any) => {
    if (mountedRef.current) setter(value);
  }, [mountedRef]);


  useEffect((): void => {
    error && setBlkError(error);
  }, [error]);

  useEffect(() => {
    safeSet(setBlkError)(error || null);
    safeSet(setBlock)(null);
    safeSet(setHeader)(null);
    safeSet(setExtrinsicData)(null);
    safeSet(setEvents)(null);
    safeSet(setRuntimeVersion)(null);
    safeSet(setNextBlockHash)(null);
  }, [txHash, error, safeSet]);

  const transformEvents = useCallback((events: EventRecord[] | null): KeyedEvent[] | null =>
    events?.map((record, index) => ({
      indexes: [index],
      key: `${Date.now()}-${index}-${record.hash.toHex()}`,
      record
    })) || null
  , []);

  useEffect(() => {
    if (!txHash) return;

    const fetchExtrinsic = async (): Promise<void> => {
      try {
        const blockNumber = await fetchBlockNumberByTx(txHash);

        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash).catch((err: Error) => {
          safeSet(setBlkError)(err);
          return null;
        });
        if (!signedBlock) return;

        const header = await api.derive.chain.getHeader(blockHash);
        const extrinsicFound = signedBlock.block.extrinsics.find((e) => e.hash.toString() === txHash);
        if (!extrinsicFound) {
          safeSet(setBlkError)(new Error('Transaction not found in block'));
          return;
        }

        const from = extrinsicFound.signer?.toString() || 'unknown';
        let to = 'unknown';
        let amount = 'unknown';
        let fee = extrinsicFound.tip?.toString() || 'unknown';

        const method = extrinsicFound.method.toJSON() as any;
        if (method?.args?.dest) {
          to = typeof method.args.dest === 'object' && method.args.dest.id ? method.args.dest.id : method.args.dest;
        }
        if (method?.args?.value) {
          amount = formatBalance(method.args.value, { forceUnit: '-', withAll: true, withSi: false });
        }

        const evt = await api.at(blockHash).then(apiAt =>
          apiAt.query.system.events().catch(() => [])
        );

        safeSet(setBlock)(signedBlock);
        safeSet(setHeader)(header);
        safeSet(setExtrinsicData)({ from, to, amount, fee });
        safeSet(setEvents)(transformEvents(evt));
        safeSet(setRuntimeVersion)(api.runtimeVersion);
      } catch (err) {
        safeSet(setBlkError)(err instanceof Error ? err : new Error('Error fetching transaction'));
      }
    };

    fetchExtrinsic();
  }, [api, txHash, safeSet, transformEvents]);

  // Subscribe to next block hash
  useEffect(() => {
    if (!header?.number || !mountedRef.current) return;

    const nextBlockNumber = header.number.unwrap().addn(1);
    let unsub: (() => void) | undefined;

    api.rpc.chain.getBlockHash(nextBlockNumber)
      .then((hash) => {
        if (!hash.isEmpty) {
          safeSet(setNextBlockHash)(hash);
        } else {
          api.derive.chain.subscribeNewHeads((newHeader: HeaderExtended) => {
            if (mountedRef.current && newHeader.number.unwrap().eq(nextBlockNumber)) {
              safeSet(setNextBlockHash)(newHeader.hash);
              unsub && unsub();
            }
          }).then(_unsub => { unsub = _unsub; })
            .catch(err => safeSet(setBlkError)(err));
        }
      })
      .catch(err => mountedRef.current && setBlkError(err));

    return () => { unsub && unsub(); };
  }, [api, header?.number, mountedRef, safeSet]);


  const maxBlockWeight = useMemo(() => {
    return api.consts.system.blockWeights && api.consts.system.blockWeights.maxBlock &&
      convertWeight(api.consts.system.blockWeights.maxBlock).v2Weight;
  }, [api, runtimeVersion]);


  const extrinsicDisplay = useMemo(() => {
    if (!extrinsicData) return { from: 'unknown', to: 'unknown', amount: 'unknown', fee: 'unknown' };
    return {
      from: typeof extrinsicData.from === 'object' ? JSON.stringify(extrinsicData.from) : extrinsicData.from,
      to: typeof extrinsicData.to === 'object' ? JSON.stringify(extrinsicData.to) : extrinsicData.to,
      amount: extrinsicData.amount,
      fee: extrinsicData.fee
    };
  }, [extrinsicData]);

  
  const blockNumber = header?.number?.unwrap();
  const blockHashHex = header?.hash?.toHex();
  const parentHash = header?.parentHash.toHex();
  const hasParent = !header?.parentHash.isEmpty;

  const tableHeader: [React.ReactNode?, string?, number?][] = header
    ? [
        [formatNumber(blockNumber), 'start --digits', 1],
        [t('hash'), 'start'],
        [t('parent'), 'start'],
        [t('next'), 'start'],
        [t('transactions'), 'start media--1300'],
        [t('state'), 'start media--1200'],
        [
          runtimeVersion 
            ? `${runtimeVersion.specName.toString()}/${runtimeVersion.specVersion.toString()}` 
            : undefined, 
          'media--1000']
      ]
    : EMPTY_HEADER;

  if (!txHash) return <Navigate to="/explorer/dashboard" replace />;

  const extrinsicHeader: [React.ReactNode, string?, number?][] = [
    [t(''), 'hidden-column'],
    [t('from'), 'start'],
    [t('to'), 'start'],
    [t('amount'), 'start'],
    [t('fee'), 'start']
  ];

  return (
    <div className={className}>
      <h2>{t('Transaction Details for {{txHash}}', { replace: { txHash } })}</h2>
        { blkError ? (
            <tr>
              <td colSpan={6}>
              <MarkError content={t('Unable to retrieve the specified transaction details. {{error}}', { replace: { error: blkError instanceof Error ? blkError.message : String(blkError) } })} />
            </td>
            </tr>
          ) : (
            <StyledTable header={extrinsicHeader}>
              <tr>
                <AddressCell value={extrinsicDisplay.from} />
                <AddressCell value={extrinsicDisplay.to} />
                <td>{extrinsicDisplay.amount}</td>
                <td>{extrinsicDisplay.fee}</td>
              </tr>
            </StyledTable>
          )
        }
      <h2>{t('Block Summary')} {header?.number !== undefined && header?.hash && <Link to={`/explorer/query/${blockHashHex}`}>#{formatNumber(blockNumber)}</Link>}</h2>
      <Summary
        events={events}
        maxBlockWeight={(maxBlockWeight as V2Weight).refTime.toBn()}
        maxProofSize={isBn(maxBlockWeight.proofSize) ? maxBlockWeight.proofSize : (maxBlockWeight as V2Weight).proofSize.toBn()}
        signedBlock={block}
      />
      <StyledTable header={tableHeader}>
        {blkError ? (
          <tr>
          </tr>
        ) : (
          block &&
          header &&
          !block.isEmpty &&
          !header.isEmpty && (
            <tr>
              <td className='address'>{header.author && <AddressSmall value={header.author} />}</td>
              <td className='hash overflow'>{blockHashHex}</td>
              <td className='hash overflow'>
                {hasParent ? (
                  <span className='inline-hash-copy'>
                    <Link to={`/explorer/query/${parentHash || ''}`}>{parentHash}</Link>
                    <CopyButton value={parentHash} />
                  </span>
                ) : (
                  parentHash
                )}
              </td>
              <td className='hash overflow'>
                {nextBlockHash ? (
                  <span className='inline-hash-copy'>
                    <Link to={`/explorer/query/${nextBlockHash.toHex()}`}>{nextBlockHash.toHex()}</Link>
                    <CopyButton value={nextBlockHash.toHex()} />
                  </span>
                ) : (
                  t('Waiting for next block...')
                )}
              </td>
              <td className='hash overflow media--1300'>{header.extrinsicsRoot.toHex()}</td>
              <td className='hash overflow media--1200'>{header.stateRoot.toHex()}</td>
              <td className='media--1000'>{value && <LinkExternal data={value} type='block' />}</td>
            </tr>
          )
        )}
      </StyledTable>
    </div>
  );
}

const StyledTable = styled(Table)`
  .hidden-column {
    display: none;
  }

  .inline-hash-copy {
    align-items: center;
    display: inline-flex;
    gap: 0.25em;
    width: 100%;

    a {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const AddressCell = ({ value }: { value: string }) => (
  <td className='hash overflow'>
    <div className='inline-hash-copy'>
      {value && value !== 'unknown' ? <AddressSmall value={value} /> : 'unknown'}
      <CopyButton value={value} />
    </div>
  </td>
);
