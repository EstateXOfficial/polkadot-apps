// Copyright 2017-2025 @polkadot/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { Balance, RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import type { MultiAddress } from '@polkadot/types/interfaces';

import React, { useEffect, useMemo, useState } from 'react';

import { AddressSmall, Card, styled } from '@polkadot/react-components';
import { useApi, useIsMountedRef } from '@polkadot/react-hooks';
import { ZERO_ACCOUNT } from '@polkadot/react-hooks/useWeight';
import { formatBalance } from '@polkadot/util';
import { nextTick } from '@polkadot/util';


interface Props {
  className?: string;
  extrinsic?: SubmittableExtrinsic<'promise'> | null;
}

interface TransactionInfo {
  fromAccount?: string;
  toAccount?: string;
  amount?: string;
  fee?: string;
}

function extractAccountId(address: any): string {
  if (typeof address === 'string') {
    return address;
  }
  return address.toString();
}

function extractTransactionInfo(extrinsic: SubmittableExtrinsic<'promise'>): TransactionInfo {
  const result: TransactionInfo = {};

  try {
    if (extrinsic.signer) {
      result.fromAccount = extrinsic.signer.toString();
    }

    const { method, section } = extrinsic.method;

    if (section === 'balances') {
      if (method === 'transfer' || method === 'transferKeepAlive') {
        const [dest, value] = extrinsic.method.args;
        result.toAccount = extractAccountId(dest as MultiAddress);
        result.amount = formatBalance(value as Balance, { withSiFull: false, withUnit: false });
      } else if (method === 'transferAll') {
        const [dest] = extrinsic.method.args;
        result.toAccount = extractAccountId(dest as MultiAddress);
        result.amount = 'All available balance';
      }
    }

    if (section === 'assets') {
      if (method === 'transfer' || method === 'transferKeepAlive') {
        const [, dest, amount] = extrinsic.method.args;
        result.toAccount = extractAccountId(dest as MultiAddress);
        result.amount = amount.toString();
      }
    }

    if (section === 'currencies') {
      if (method === 'transfer') {
        const [dest, , amount] = extrinsic.method.args;
        result.toAccount = extractAccountId(dest as MultiAddress);
        result.amount = amount.toString();
      }
    }

    if (section === 'tokens') {
      if (method === 'transfer' || method === 'transferKeepAlive') {
        const [dest, , amount] = extrinsic.method.args;
        result.toAccount = extractAccountId(dest as MultiAddress);
        result.amount = amount.toString();
      }
    }

    if (section === 'utility') {
      if (method === 'batchAll' || method === 'batch') {
        const [calls] = extrinsic.method.args;
        const callsArray = (calls as unknown) as any[];
        if (callsArray.length > 0) {
          const firstCall = callsArray[0];
          if (firstCall.section === 'balances' && (firstCall.method === 'transfer' || firstCall.method === 'transferKeepAlive')) {
            const [dest, value] = firstCall.args;
            result.toAccount = extractAccountId(dest);
            result.amount = formatBalance(value as Balance, { withSiFull: false, withUnit: false });
          }
        }
      }
    }

  } catch (error) {
    console.warn('Error extracting transaction info:', error);
  }

  return result;
}

function TransactionDetails({ className, extrinsic }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const mountedRef = useIsMountedRef();
  const [feeInfo, setFeeInfo] = useState<RuntimeDispatchInfo | null>(null);

  const transactionInfo = useMemo(
    () => extrinsic ? extractTransactionInfo(extrinsic) : {},
    [extrinsic]
  );

  useEffect((): void => {
    if (extrinsic && api.call.transactionPaymentApi) {
      nextTick(async (): Promise<void> => {
        try {
          const info = await extrinsic.paymentInfo(ZERO_ACCOUNT);
          mountedRef.current && setFeeInfo(info);
        } catch (error) {
          console.error('Fee calculation error:', error);
          mountedRef.current && setFeeInfo(null);
        }
      });
    } else {
      setFeeInfo(null);
    }
  }, [api, extrinsic, mountedRef]);

  const partialFee = useMemo(
    () => {
      if (feeInfo?.partialFee) {
        return formatBalance(feeInfo.partialFee, { withSiFull: false, withUnit: true });
      }
      return null;
    },
    [feeInfo]
  );

  if (!extrinsic || Object.keys(transactionInfo).length === 0) {
    return null;
  }

  return (
    <StyledCard className={className}>
      <h3>Transaction Details</h3>

      {transactionInfo.fromAccount && (
        <div className='transaction-row'>
          <span className='label'>From Account:</span>
          <AddressSmall value={transactionInfo.fromAccount} />
        </div>
      )}

      {transactionInfo.toAccount && (
        <div className='transaction-row'>
          <span className='label'>To Account</span>
          <AddressSmall value={transactionInfo.toAccount} />
        </div>
      )}

      {transactionInfo.amount && (
        <div className='transaction-row'>
          <span className='label'>Amount Sent</span>
          <span className='value'>{transactionInfo.amount}</span>
        </div>
      )}

      {partialFee && (
        <div className='transaction-row'>
          <span className='label'>Fee</span>
          <span className='value'>{partialFee}</span>
        </div>
      )}
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  margin-top: 1rem;

  h3 {
    margin-bottom: 1rem;
  }

  .transaction-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    gap: 1rem;

    .label {
      min-width: 8rem;
      font-weight: 600;
    }

    .value {
      font-family: var(--font-mono);
      font-weight: 500;
    }
  }

  .ui--AddressSmall {
    .ui--AccountName {
      max-width: 15rem;
    }
  }
`;

export default React.memo(TransactionDetails);
