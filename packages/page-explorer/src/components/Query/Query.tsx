// Copyright 2017-2025 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useCallback, useState} from 'react';

import {Dropdown, Input, styled} from '@polkadot/react-components';
import {isHex} from '@polkadot/util';
import { useApi } from '@polkadot/react-hooks';
import type { ApiPromise } from '@polkadot/api';
import { fetchBlockNumberByTx } from '@polkadot/app-explorer/Transaction';

const QUERY_TYPES = {
  BLOCK_HASH: 'hash',
  BLOCK_NUMBER: 'blockNumber',
  TRANSACTION_HASH: 'transaction',
  ADDRESS: 'address',
  CALL_DATA: 'callData',
} as const;

type QueryType = typeof QUERY_TYPES[keyof typeof QUERY_TYPES];

const URL_PATHS = {
  EXPLORER_QUERY: '/explorer/query',
  EXTRINSICS_DECODE: '/explorer/decode',
  EXPLORER_ACCOUNT_QUERY: '/explorer/account-query',
  DASHBOARD_QUERY: '/explorer',
  TRANSACTION: '/explorer/transaction'
} as const;

interface Props {
  className?: string;
  value?: string;
}

interface State {
  value: string;
  isValid: boolean;
}

interface Option {
  text: string;
  value: string;
}

async function detectHashType(api: ApiPromise, hash: string): Promise<'blockHash' | 'transactionHash' | 'unknown'> {
  const origConsoleError = console.error;
  const origConsoleWarn = console.warn;
  console.error = () => {};
  console.warn = () => {};
  try {
    try {
      const header = await api.rpc.chain.getHeader(hash);
      if (header?.number)
        return 'blockHash';
    } catch {}
  } finally {
    console.error = origConsoleError;
    console.warn = origConsoleWarn;
  }

  try {
    const blockNumber = await fetchBlockNumberByTx(hash);

    if (blockNumber) {
      return 'transactionHash';
    }
  } catch {}

  return 'unknown';
}

function detectQueryType(api: ApiPromise, value: string, onRefined?: (type: QueryType) => void): string {
  if (!value) {
    return QUERY_TYPES.BLOCK_HASH;
  }

  // Check for 0x and remaining 64 symbols
  if (/^0x[0-9a-fA-F]{64}$/.test(value)) {
    (async () => {
      const refined = await detectHashType(api, value);
      if (refined === 'blockHash') {
        onRefined?.(QUERY_TYPES.BLOCK_HASH);
      } else if (refined === 'transactionHash') {
        onRefined?.(QUERY_TYPES.TRANSACTION_HASH);
      }
    })();

    return QUERY_TYPES.BLOCK_HASH;
  }

  // Check for hex value starting with 0x.
  // Odd check was added so that it wouldn't jump from block hash to call data
  if (isHex(value) && value.length % 2 === 1) {
    return QUERY_TYPES.CALL_DATA;
  }

  // Check for decimal digits
  if (/^\d+$/.test(value)) {
    const num = Number(value);
    if (!isNaN(num) && num > 0 && num < 5_000_000_000) {
      return QUERY_TYPES.BLOCK_NUMBER;
    }
  }

  // Check for first 1 or 5 digit and then up to 47 symbols
  if (/^[1|5][1-9A-HJ-NP-Za-km-z]{0,47}$/.test(value)) {
    return QUERY_TYPES.ADDRESS;
  }

  return QUERY_TYPES.BLOCK_HASH;
}

function stateFromValue(value: string): State {
  return {
    isValid: isHex(value, 256) || /^\d+$/.test(value),
    value
  };
}

function Query({className = '', value: propsValue}: Props): React.ReactElement<Props> {
  const [{value}, setState] = useState(() => stateFromValue(propsValue || ''));
  const { api } = useApi();

  const options: Option[] = [
    {text: 'Block Hash', value: QUERY_TYPES.BLOCK_HASH},
    {text: 'Block Number', value: QUERY_TYPES.BLOCK_NUMBER},
    {text: 'Transaction Hash', value: QUERY_TYPES.TRANSACTION_HASH},
    {text: 'Address', value: QUERY_TYPES.ADDRESS},
    {text: 'Call Data (Hex-encoded)', value: QUERY_TYPES.CALL_DATA}
  ];

  const _setHash = useCallback(
    (value: string): void => {
      setState(stateFromValue(value));

      const initialType = detectQueryType(api, value, (refinedType) => {
        setQueryOpt(refinedType);
      });

      setQueryOpt(initialType);
    },
    [api]
  );

  const [queryOpt, setQueryOpt] = useState<string>(options[0].value);


  const getQueryUrl = useCallback((queryType: string, queryValue: string): string => {
    switch (queryType) {
      case QUERY_TYPES.BLOCK_HASH:
        return `${URL_PATHS.EXPLORER_QUERY}/${queryValue}`;
      case QUERY_TYPES.BLOCK_NUMBER:
        return `${URL_PATHS.EXPLORER_QUERY}/${queryValue}`;
      case QUERY_TYPES.TRANSACTION_HASH:
        return `${URL_PATHS.TRANSACTION}/${queryValue}`;
      case QUERY_TYPES.ADDRESS:
        return `${URL_PATHS.EXPLORER_ACCOUNT_QUERY}/${queryValue}`;
      case QUERY_TYPES.CALL_DATA:
        return `${URL_PATHS.EXTRINSICS_DECODE}/${queryValue}`;
      default:
        return `${URL_PATHS.DASHBOARD_QUERY}/${queryValue}`;
    }
  }, []);

  const _onQuery = useCallback(
    (): void => {
      if (value.length !== 0) {
        const queryUrl = getQueryUrl(queryOpt, value);
        window.location.hash = queryUrl;
      }
    },
    [value, queryOpt, getQueryUrl]
  );

  return (
    <StyledFDiv className={`${className}`}>
      <Dropdown options={options} value={queryOpt} onChange={setQueryOpt} className='dashboard--dropdown'/>
      <Input
        className='dashboard--query'
        defaultValue={propsValue}
        isError={value.length !== 0}
        isFull
        onChange={_setHash}
        onEnter={_onQuery}
        placeholder='Search'
        withLabel={false}
      >
        <button
          className='searchBtn'
          onClick={_onQuery}
        >
          Search
        </button>
      </Input>
    </StyledFDiv>
  );
}

const StyledFDiv = styled.div`
  display: flex;

  .dashboard--dropdown {
    padding: 0 !important;
    margin: 0;
    max-height: 43px;

    label {
      display: none;
    }

    .dropdown {
      max-height: 43px;
      padding-top: 1rem !important;
      border-radius: 4px 0px 0px 4px;

      .icon {
        top: 0.9rem !important;
      }
    }
  }

  .dashboard--query {
    flex: 1;

    input {
      border-left: none;
      border-radius: 0px 4px 4px 0px;
    }
  }

  .searchBtn {
    height: 43px;
    margin-left: -3px;
    background: var(--primary-estate);
    color: var(--color-header);
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
`;

export default React.memo(Query);
