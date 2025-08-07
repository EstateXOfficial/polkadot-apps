// Copyright 2017-2025 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import { Dropdown, Input, styled } from '@polkadot/react-components';
import { isHex } from '@polkadot/util';

const QUERY_TYPES = {
  HASH: 'hash',
  BLOCK_NUMBER: 'blockNumber',
  TRANSACTION: 'transaction',
  ADDRESS: 'address'
} as const;

const URL_PATHS = {
  EXPLORER_QUERY: '/explorer/query',
  EXTRINSICS_DECODE: '/explorer/decode',
  EXPLORER_ACCOUNT_QUERY: '/explorer/account-query',
  DASHBOARD_QUERY: '/explorer'
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

function stateFromValue (value: string): State {
  return {
    isValid: isHex(value, 256) || /^\d+$/.test(value),
    value
  };
}

function Query ({ className = '', value: propsValue }: Props): React.ReactElement<Props> {
  const [{ value }, setState] = useState(() => stateFromValue(propsValue || ''));

  const options: Option[] = [
    { text: 'Block Hash', value: QUERY_TYPES.HASH },
    { text: 'Block Number', value: QUERY_TYPES.BLOCK_NUMBER },
    { text: 'Transaction Hash', value: QUERY_TYPES.TRANSACTION },
    { text: 'Address', value: QUERY_TYPES.ADDRESS},
    { text: 'Call data', value: QUERY_TYPES.TRANSACTION}
  ];

  const _setHash = useCallback(
    (value: string): void => setState(stateFromValue(value)),
    []
  );

  const [queryOpt, setQueryOpt] = useState<string>(options[0].value);


  const getQueryUrl = useCallback((queryType: string, queryValue: string): string => {
    switch (queryType) {
      case QUERY_TYPES.HASH:
        return `${URL_PATHS.EXPLORER_QUERY}/${queryValue}`;
      case QUERY_TYPES.BLOCK_NUMBER:
        return `${URL_PATHS.EXPLORER_QUERY}/${queryValue}`;
      case QUERY_TYPES.TRANSACTION:
        return `${URL_PATHS.EXTRINSICS_DECODE}/${queryValue}`;
      case QUERY_TYPES.ADDRESS:
        return `${URL_PATHS.EXPLORER_ACCOUNT_QUERY}/${queryValue}`;
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
      <Dropdown options={options} value={queryOpt} onChange={setQueryOpt} className='dashboard--dropdown' />
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
  margin-top: 1rem;

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
