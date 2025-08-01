// Copyright 2017-2025 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { styled } from './styled.js';
import { useTranslation } from './translate.js';

interface Props {
  className?: string;
  label?: React.ReactNode;
  noLabel?: boolean;
  variant?: 'app' | 'appPadded' | 'cover' | 'push' | 'mini';
}

function Spinner ({ className = '', label, noLabel, variant = 'app' }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  return (
    <StyledSpinner className={`${className} ui--Spinner variant-${variant}`}>
      {/*      <img
        className={variant === 'push' ? '' : 'highlight--bg highlight--border'}
        src={spinnerSrc}
      />*/}
      <div className={'loader'}>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
      {!noLabel && variant.startsWith('app') && <div className='text'>{label || t('Retrieving data')}</div>}
    </StyledSpinner>
  );
}

const StyledSpinner = styled.div`
  display: block;
  line-height: 1rem;
  margin: 0 auto;
  text-align: center;

  .loader {
    bottom: 0;
    display: inline-block;
    height: 80px;
    left: 0;
    margin: auto;
    position: absolute !important;
    right: 0;
    top: 0;
    width: 80px;

    div {
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border: 8px solid var(--primary-estate);
      border-color: var(--primary-estate) transparent transparent transparent;
      border-radius: 50%;
      box-sizing: border-box;
      display: block;
      height: 64px;
      margin: 8px;
      position: absolute;
      width: 64px;
    }

    div:nth-child(1) {
      animation-delay: -0.45s;
    }

    div:nth-child(2) {
      animation-delay: -0.3s;
    }

    div:nth-child(3) {
      animation-delay: -0.15s;
    }

  }

  &.variant-appPadded {
    margin-top: 0.5rem;
  }

  img {
    border: 1px solid transparent;
    border-radius: 10rem;
  }

  &.variant-cover {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;

    img {
      border: 1 px solid white;
      margin: 0 auto;
    }
  }

  .text {
    color: inherit !important;
    margin: 0.25rem auto 1.5rem auto;
    opacity: var(--opacity-light);

    div+div {
      margin-top: 0.25rem;
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

`;

export default React.memo(Spinner);
