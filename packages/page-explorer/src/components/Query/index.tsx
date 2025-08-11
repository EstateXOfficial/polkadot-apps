// SPDX-License-Identifier: Apache-2.0

import React, { memo } from 'react';
import { styled } from '@polkadot/react-components';
import Query from './Query.js';

const StyledQueryContainer = styled.div`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: center;

  .dashboardGif {
    width: 100%;
    border-radius: 6px;
  }

  @media screen and (min-width: 1441px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const QueryBlock = () => {
  return (
    <StyledQueryContainer>
      <Query/>
      <div>
        <img className={'dashboardGif'} src="/assets/estate.gif" alt="dashboard gif"/>
      </div>
    </StyledQueryContainer>
  );
};

export default memo(QueryBlock);
