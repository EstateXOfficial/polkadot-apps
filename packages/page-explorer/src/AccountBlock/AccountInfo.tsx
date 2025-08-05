// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { AddressMini, styled } from '@polkadot/react-components';
import { FormatBalance } from '@polkadot/react-query';

import { useAccountInfo } from './useAccountInfo.js';

interface Props {
  address: string | null;
  className?: string;
}

function AccountInfo ({ address, className }: Props): React.ReactElement<Props> | null {
  const { accountInfo, balance, error, isLoading } = useAccountInfo(address);

  if (!address) {
    return null;
  }

  if (error) {
    return (
      <StyledDiv className={className}>
        <div className='error-message'>
          {error}
        </div>
      </StyledDiv>
    );
  }

  if (isLoading) {
    return (
      <StyledDiv className={className}>
        <div className='loading'>
          Loading account information...
        </div>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv className={className}>
      <div className='account-header'>
        <h3>Account Information</h3>
      </div>
      <div className='account-content'>
        <div className='account-address'>
          <label>Address:</label>
          <AddressMini value={address} />
        </div>
        {balance && (
          <>
            <div className='account-balance'>
              <label>Free Balance:</label>
              <FormatBalance value={balance.freeBalance} />
            </div>
            <div className='account-balance'>
              <label>Available Balance:</label>
              <FormatBalance value={balance.availableBalance} />
            </div>
            <div className='account-balance'>
              <label>Reserved Balance:</label>
              <FormatBalance value={balance.reservedBalance} />
            </div>
            {balance.lockedBalance && !balance.lockedBalance.isZero() && (
              <div className='account-balance'>
                <label>Nonce:</label>
                <FormatBalance value={balance.lockedBalance} />
              </div>
            )}
          </>
        )}
        {accountInfo && (
          <div className='account-nonce'>
            <label>Nonce:</label>
            <span>{accountInfo.nonce.toString()}</span>
          </div>
        )}
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background: var(--bg-table);
  border: 1px solid var(--border-table);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;

  .account-header {
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      color: var(--primary-estate);
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  .account-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .account-address,
  .account-balance,
  .account-nonce {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-table);

    &:last-child {
      border-bottom: none;
    }

    label {
      font-weight: 500;
      min-width: 120px;
    }

    span {
      color: var(--color-text);
      font-family: monospace;
    }
  }

  .error-message {
    color: var(--color-error);
    text-align: center;
    padding: 1rem;
    font-weight: 500;
  }

  .loading {
    color: var(--color-text);
    text-align: center;
    padding: 1rem;
    font-style: italic;
  }
`;

export default React.memo(AccountInfo);
