// Copyright 2017-2025 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { LanguageDetectorModule, Newable } from 'i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE_DEFAULT, settings } from '@polkadot/ui-settings';

import Backend from './Backend.js';

// This is a workaround for the above package -
//
// 1. It does have an ESM export which would be used
// 2. The package type is set to commonjs
// 3. Unless we run fixup on it, it seems problematic... (here we opt for no fixup)
const languageDetector = new (LanguageDetector as unknown as Newable<LanguageDetectorModule & { addDetector: (...args: unknown[]) => unknown }>)();

languageDetector.addDetector({
  lookup: () => {
    // Always return English language regardless of settings
    return 'en';
  },
  name: 'i18nLangDetector'
});

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    backend: {},
    debug: false,
    detection: {
      order: ['i18nLangDetector', 'navigator']
    },
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
      prefix: '{{',
      suffix: '}}'
    },
    keySeparator: false,
    load: 'languageOnly',
    ns: [
      'apps',
      'apps-config',
      'apps-electron',
      'apps-routing',
      'app-accounts',
      'app-claims',
      'app-contracts',
      'app-council',
      'app-democracy',
      'app-explorer',
      'app-extrinsics',
      'app-generic-asset',
      'app-js',
      'app-parachains',
      'app-poll',
      'app-rpc',
      'app-settings',
      'app-signing',
      'app-society',
      'app-staking',
      'app-staking-async',
      'app-staking-legacy',
      'app-storage',
      'app-sudo',
      'app-tech-comm',
      'app-treasury',
      'react-api',
      'react-components',
      'react-hooks',
      'react-params',
      'react-query',
      'react-signer',
      'translation'
    ],
    nsSeparator: false,
    react: {
      useSuspense: true
    },
    returnEmptyString: false,
    returnNull: false
  })
  .catch((error: Error): void =>
    console.log('i18n: failure', error)
  );

settings.on('change', (settings): void => {
  // Always set English language regardless of settings
  i18next.changeLanguage('en').catch(console.error);
});

export default i18next;
