// Copyright 2017-2025 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Route, TFunction } from './types.js';

import Component from '@polkadot/app-dashboard';

export default function dashboard (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'dashboard',
    icon: 'leaf',
    name: 'dashboard',
    text: t('nav.dashboard', 'Dashboard', { ns: 'apps-routing' })
  };
}
