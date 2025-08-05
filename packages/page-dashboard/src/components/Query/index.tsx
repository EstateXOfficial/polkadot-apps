// SPDX-License-Identifier: Apache-2.0

import React, { memo } from 'react';
import Query from './Query.js';

const QueryBlock = () => {
  return (
    <div style={{ marginBottom: 10 }}>
      <Query />
    </div>
  );
};

export default memo(QueryBlock);
