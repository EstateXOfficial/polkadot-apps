import { useCallback, useState } from 'react';
import { useApi, useCall } from '@polkadot/react-hooks';
import type { DeriveBalancesAll } from '@polkadot/api-derive/types';
import type { AccountInfo } from '@polkadot/types/interfaces';
import { isAddress } from '@polkadot/util-crypto';

interface AccountInfoResult {
  address: string | null;
  balance: DeriveBalancesAll | null;
  accountInfo: AccountInfo | null;
  isLoading: boolean;
  error: string | null;
}

export const useAccountInfo = (address: string | null): AccountInfoResult => {
  const { api } = useApi();
  const [error, setError] = useState<string | null>(null);

  const balance = useCall<DeriveBalancesAll>(
    address && isAddress(address) ? api.derive.balances?.all : null,
    [address]
  );

  const accountInfo = useCall<AccountInfo>(
    address && isAddress(address) ? api.query.system.account : null,
    [address]
  );

  const isLoading = !!(address && isAddress(address) && (!balance || !accountInfo));

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  if (address && !isAddress(address)) {
    if (!error) {
      setError('Invalid address format');
    }
  } else if (error) {
    clearError();
  }

  if (balance && 'error' in balance) {
    setError('Error getting balance');
  }

  return {
    address,
    balance: balance || null,
    accountInfo: accountInfo || null,
    isLoading,
    error
  };
};
