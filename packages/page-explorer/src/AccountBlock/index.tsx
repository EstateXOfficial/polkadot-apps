// [object Object]
// SPDX-License-Identifier: Apache-2.0

import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountInfo from './AccountInfo.js';

const AccountBlock = () => {
  const { value } = useParams<{ value: string }>();
  const [stateValue, setStateValue] = useState<string | undefined>(value);

  useEffect((): void => {
    setStateValue((stateValue) =>
      value && value !== stateValue
        ? value
        : stateValue
    );
  }, [value]);

  if (!stateValue) {
    return null;
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <AccountInfo address={stateValue} />
    </div>
  );
};

export default memo(AccountBlock);
