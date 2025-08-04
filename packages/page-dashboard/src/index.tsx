// Copyright 2017-2025 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { styled } from '@polkadot/react-components';
import useChartEstate from "./hooks/use-chart-estate.js";
import useTickerEstate from "./hooks/use-ticker-estate.js";

interface Props {
  basePath: string;
  className?: string;
}

function DashboardApp ({ className }: Props): React.ReactElement<Props> {
  const chartEstateRef = useChartEstate();
  const tickerEstateRef = useTickerEstate();

  return (
    <StyledMain className={className}>
      <div className={"graphWrapper"}>
        <div ref={chartEstateRef}/>
        <div ref={tickerEstateRef}/>
      </div>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  min-height: 100vh;

  .graphWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: 1025px) {
        grid-template-columns: 1fr;
    }
  }
`;


export default React.memo(DashboardApp);
