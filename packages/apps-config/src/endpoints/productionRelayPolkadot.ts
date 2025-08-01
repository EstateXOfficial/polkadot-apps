// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EndpointOption } from './types.js';

import { POLKADOT_GENESIS } from '../api/constants.js';
import { chainsAcalaSVG, chainsBitgreenPNG, chainsComposableFinancePNG, chainsEquilibriumSVG, chainsFrequencySVG, chainsGeminisPNG, chainsHydrationSVG, chainsInvarchJPEG, chainsLaosPNG, chainsLogionPNG, chainsMyxcavPNG, chainsNeurowebPNG, chainsOakPNG, chainsPeaqPNG, chainsPendulumSVG, chainsPeoplePolkadotSVG, chainsPolkadotCircleSVG, chainsTotemSVG, chainsWatrPNG } from '../ui/logos/chains/index.js';
import { nodesAjunaPNG, nodesAresOdysseySVG, nodesAssetHubSVG, nodesAstarPNG, nodesAventusSVG, nodesBifrostSVG, nodesBridgeHubSVG, nodesCentrifugePNG, nodesCloverSVG, nodesCoinversationPNG, nodesCollectivesSVG, nodesContinuumPNG, nodesCrustParachainSVG, nodesDarwiniaSVG, nodesEfinitySVG, nodesEwxSVG, nodesHashedPNG, nodesHeimaSVG, nodesHyperbridgePNG, nodesIntegriteeSVG, nodesInterlaySVG, nodesJamtonSVG, nodesKiltIconSVG, nodesKylinPNG, nodesMantaPNG, nodesMoonbeamSVG, nodesMoonsamaSVG, nodesMythosPNG, nodesNodleSVG, nodesOmnibtcSVG, nodesParallelSVG, nodesPhalaSVG, nodesPolimecSVG, nodesPolkadexSVG, nodesRobonomicsSVG, nodesSoraSubstrateSVG, nodesSubdaoPNG, nodesSubgameSVG, nodesSubsocialSVG, nodesT3rnPNG, nodesUniqueSVG, nodesXodePNG, nodesZeitgeistPNG } from '../ui/logos/nodes/index.js';
import { getTeleports } from './util.js';

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   providers: The actual hosted secure websocket endpoint
//
// IMPORTANT: Alphabetical based on text
export const prodParasPolkadot: Omit<EndpointOption, 'teleport'>[] = [
  {
    homepage: 'https://acala.network/',
    info: 'acala',
    paraId: 2000,
    providers: {
      'Acala Foundation 0': 'wss://acala-rpc-0.aca-api.network',
      'Acala Foundation 1': 'wss://acala-rpc-1.aca-api.network',
      // 'Acala Foundation 2': 'wss://acala-rpc-2.aca-api.network/ws', // https://github.com/polkadot-js/apps/issues/6965
      'Acala Foundation 3': 'wss://acala-rpc-3.aca-api.network/ws',
      Dwellir: 'wss://acala-rpc.n.dwellir.com',
      IBP1: 'wss://acala.ibp.network',
      IBP2: 'wss://acala.dotters.network'
      // LuckyFriday: 'wss://rpc-acala.luckyfriday.io', // https://github.com/polkadot-js/apps/issues/10728
      // 'Automata 1RPC': 'wss://1rpc.io/aca' // https://github.com/polkadot-js/apps/issues/8648
      // OnFinality: 'wss://acala-polkadot.api.onfinality.io/public-ws'
      // 'Polkawallet 0': 'wss://acala.polkawallet.io' // https://github.com/polkadot-js/apps/issues/9760
    },
    text: 'Acala',
    ui: {
      color: '#645AFF',
      logo: chainsAcalaSVG
    }
  },
  {
    homepage: 'https://ajuna.io',
    info: 'ajuna',
    paraId: 2051,
    providers: {
      AjunaNetwork: 'wss://rpc-para.ajuna.network',
      IBP1: 'wss://ajuna.ibp.network',
      IBP2: 'wss://ajuna.dotters.network'
      // OnFinality: 'wss://ajuna.api.onfinality.io/public-ws'
      // RadiumBlock: 'wss://ajuna.public.curie.radiumblock.co/ws' https://github.com/polkadot-js/apps/issues/10990
    },
    text: 'Ajuna Network',
    ui: {
      color: '#161212',
      logo: nodesAjunaPNG
    }
  },
  {
    homepage: 'https://www.aresprotocol.io/',
    info: 'odyssey',
    paraId: 2028,
    providers: {
      // AresProtocol: 'wss://wss.odyssey.aresprotocol.io' // https://github.com/polkadot-js/apps/issues/9059
    },
    text: 'Ares Odyssey',
    ui: {
      color: '#1295F0',
      logo: nodesAresOdysseySVG
    }
  },
  {
    homepage: 'https://astar.network',
    info: 'astar',
    paraId: 2006,
    providers: {
      Astar: 'wss://rpc.astar.network',
      'Automata 1RPC': 'wss://1rpc.io/astr',
      Blast: 'wss://astar.public.blastapi.io',
      Dwellir: 'wss://astar-rpc.n.dwellir.com',
      OnFinality: 'wss://astar.api.onfinality.io/public-ws',
      RadiumBlock: 'wss://astar.public.curie.radiumblock.co/ws',
      'light client': 'light://substrate-connect/polkadot/astar'
    },
    text: 'Astar',
    ui: {
      color: '#1b6dc1d9',
      logo: nodesAstarPNG
    }
  },
  {
    homepage: 'https://www.aventus.io/',
    info: 'aventus',
    paraId: 2056,
    providers: {
      Aventus: 'wss://public-rpc.mainnet.aventus.io'
    },
    text: 'Aventus',
    ui: {
      color: '#1d2733',
      logo: nodesAventusSVG
    }
  },
  {
    homepage: 'https://bifrost.io/',
    info: 'bifrost',
    paraId: 2030,
    providers: {
      IBP1: 'wss://bifrost-polkadot.ibp.network',
      IBP2: 'wss://bifrost-polkadot.dotters.network',
      Liebi: 'wss://hk.p.bifrost-rpc.liebi.com/ws',
      LiebiEU: 'wss://eu.bifrost-polkadot-rpc.liebi.com/ws',
      // OnFinality: 'wss://bifrost-polkadot.api.onfinality.io/public-ws',
      RadiumBlock: 'wss://bifrost.public.curie.radiumblock.co/ws' // https://github.com/polkadot-js/apps/issues/11098
    },
    text: 'Bifrost',
    ui: {
      color: '#5a25f0',
      logo: nodesBifrostSVG
    }
  },
  {
    homepage: 'https://www.bitgreen.org',
    info: 'bitgreen',
    paraId: 2048,
    providers: {
      Bitgreen: 'wss://mainnet.bitgreen.org'
      // OnFinality: 'wss://bitgreen.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9993
    },
    text: 'Bitgreen',
    ui: {
      color: '#224851',
      logo: chainsBitgreenPNG
    }
  },
  {
    homepage: 'https://centrifuge.io',
    info: 'centrifuge',
    paraId: 2031,
    providers: {
      Centrifuge: 'wss://fullnode.centrifuge.io',
      LuckyFriday: 'wss://rpc-centrifuge.luckyfriday.io',
      OnFinality: 'wss://centrifuge-parachain.api.onfinality.io/public-ws'
    },
    text: 'Centrifuge',
    ui: {
      color: '#fcc367',
      logo: nodesCentrifugePNG
    }
  },
  {
    homepage: 'https://clover.finance',
    info: 'clover',
    paraId: 2002,
    providers: {
      // Clover: 'wss://rpc-para.clover.finance' // https://github.com/polkadot-js/apps/issues/10172
      // OnFinality: 'wss://clover.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9986
    },
    text: 'Clover',
    ui: {
      color: 'linear-gradient(to right, #52ad75, #7cc773)',
      logo: nodesCloverSVG
    }
  },
  {
    homepage: 'http://www.coinversation.io/',
    info: 'coinversation',
    paraId: 2027,
    providers: {
      // Coinversation: 'wss://rpc.coinversation.io/' // https://github.com/polkadot-js/apps/issues/6635
    },
    text: 'Coinversation',
    ui: {
      color: '#e6017a',
      logo: nodesCoinversationPNG
    }
  },
  {
    homepage: 'https://composable.finance/',
    info: 'composable',
    paraId: 2019,
    providers: {
      Composable: 'wss://rpc.composable.finance'
      // OnFinality: 'wss://composable.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9986
    },
    text: 'Composable Finance',
    ui: {
      color: '#C90E8A',
      logo: chainsComposableFinancePNG
    }
  },
  {
    homepage: 'https://mnet.io/?ref=polkadotjs',
    info: 'continuum',
    paraId: 3346,
    providers: {
      // MNet: 'wss://continuum-rpc-1.metaverse.network/wss' // https://github.com/polkadot-js/apps/issues/11531
    },
    text: 'Continuum',
    ui: {
      color: 'linear-gradient(94deg, #2B388F 2.95%, #DB126E 97.18%)',
      logo: nodesContinuumPNG
    }
  },
  {
    homepage: 'https://crust.network',
    info: 'crustParachain',
    paraId: 2008,
    providers: {
      Crust: 'wss://crust-parachain.crustapps.net',
      'Crust APP': 'wss://crust-parachain.crustnetwork.app',
      'Crust CC': 'wss://crust-parachain.crustnetwork.cc',
      'Crust XYZ': 'wss://crust-parachain.crustnetwork.xyz'
      // OnFinality: 'wss://crust-polkadot.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/10013
    },
    text: 'Crust',
    ui: {
      logo: nodesCrustParachainSVG
    }
  },
  {
    homepage: 'https://darwinia.network/',
    info: 'darwinia',
    paraId: 2046,
    providers: {
      Darwinia: 'wss://rpc.darwinia.network',
      // Dcdao: 'wss://darwinia-rpc.dcdao.box', https://github.com/polkadot-js/apps/issues/11157
      Dwellir: 'wss://darwinia-rpc.n.dwellir.com',
      Subquery: 'wss://darwinia.rpc.subquery.network/public/ws'
    },
    text: 'Darwinia',
    ui: {
      color: '#FF0083',
      logo: nodesDarwiniaSVG
    }
  },
  {
    homepage: 'https://efinity.io',
    info: 'efinity',
    paraId: 2021,
    providers: {
      // NOTE We don't support connections to this parachain at all.
      //
      // 1. The chain is migrated away from the parachain with all balances
      // 2. There is a forked relay-involved which we don't support
      //
      // Additional details in original removal at
      // https://github.com/polkadot-js/apps/pull/9555/files#r1225095086
    },
    text: 'Efinity',
    ui: {
      color: '#496ddb',
      logo: nodesEfinitySVG
    }
  },
  {
    homepage: 'https://energywebx.com/',
    info: 'ewx',
    paraId: 3345,
    providers: {
      'Energy Web': 'wss://public-rpc.mainnet.energywebx.com/'
    },
    text: 'Energy Web X',
    ui: {
      color: '#53B1FF',
      logo: nodesEwxSVG
    }
  },
  {
    homepage: 'https://equilibrium.io/',
    info: 'equilibrium',
    paraId: 2011,
    providers: {
      // OnFinality: 'wss://equilibrium.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9977
      // Equilibrium: 'wss://node.equilibrium.io' // https://github.com/polkadot-js/apps/issues/10174
    },
    text: 'Equilibrium',
    ui: {
      color: '#1792ff',
      logo: chainsEquilibriumSVG
    }
  },
  {
    homepage: 'https://frequency.xyz',
    info: 'frequency',
    paraId: 2091,
    providers: {
      'Frequency 0': 'wss://0.rpc.frequency.xyz',
      'Frequency 1': 'wss://1.rpc.frequency.xyz',
      OnFinality: 'wss://frequency-polkadot.api.onfinality.io/public-ws'
    },
    text: 'Frequency',
    ui: {
      color: '#790e70',
      logo: chainsFrequencySVG
    }
  },
  {
    homepage: 'https://geminis.network/',
    info: 'geminis',
    isUnreachable: true,
    paraId: 2038,
    providers: {
      Geminis: 'wss://rpc.geminis.network'
    },
    text: 'Geminis',
    ui: {
      logo: chainsGeminisPNG
    }
  },
  {
    homepage: 'https://hashed.network/',
    info: 'hashed',
    paraId: 2093,
    providers: {
      // 'Hashed Systems 1': 'wss://c1.hashed.network' // https://github.com/polkadot-js/apps/issues/11423
      // 'Hashed Systems 2': 'wss://c2.hashed.network', // https://github.com/polkadot-js/apps/issues/10912
      // 'Hashed Systems 3': 'wss://c3.hashed.network' // https://github.com/polkadot-js/apps/issues/10912
    },
    text: 'Hashed Network',
    ui: {
      color: '#9199A9',
      logo: nodesHashedPNG
    }
  },
  {
    homepage: 'https://heima.network/',
    info: 'heima',
    paraId: 2013,
    providers: {
      Dwellir: 'wss://heima-rpc.n.dwellir.com',
      Heima: 'wss://rpc.heima-parachain.heima.network'
    },
    text: 'Heima',
    ui: {
      color: '#7ed495',
      logo: nodesHeimaSVG
    }
  },
  {
    homepage: 'https://hydration.net/',
    info: 'hydradx',
    paraId: 2034,
    providers: {
      Dwellir: 'wss://hydration-rpc.n.dwellir.com',
      'Galactic Council': 'wss://rpc.hydradx.cloud',
      Helikon: 'wss://rpc.helikon.io/hydradx',
      IBP1: 'wss://hydration.ibp.network',
      IBP2: 'wss://hydration.dotters.network'
      // OnFinality: 'wss://hydradx.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9986
      // ZeePrime: 'wss://rpc-lb.data6.zp-labs.net:8443/hydradx/ws/?token=2ZGuGivPJJAxXiT1hR1Yg2MXGjMrhEBYFjgbdPi' // https://github.com/polkadot-js/apps/issues/9760
    },
    text: 'Hydration',
    ui: {
      color: '#240E32',
      logo: chainsHydrationSVG
    }
  },
  {
    homepage: 'https://hyperbridge.network',
    info: 'hyperbridge',
    paraId: 3367,
    providers: {
      BlockOps: 'wss://hyperbridge-nexus-rpc.blockops.network',
      IBP1: 'wss://nexus.ibp.network',
      IBP2: 'wss://nexus.dotters.network'
    },
    text: 'Hyperbridge (Nexus)',
    ui: {
      color: '#ED6FF1',
      logo: nodesHyperbridgePNG
    }
  },
  {
    homepage: 'https://dot.crowdloan.integritee.network/',
    info: 'integritee',
    paraId: 3359,
    providers: {
      Integritee: 'wss://polkadot.api.integritee.network'
    },
    text: 'Integritee Network',
    ui: {
      color: '#658ea9',
      logo: nodesIntegriteeSVG
    }
  },
  {
    homepage: 'https://integritee.network',
    info: 'integritee',
    paraId: 2039,
    providers: {
      // Integritee: 'wss://polkadot.api.integritee.network'
    },
    text: 'Integritee Network',
    ui: {
      color: '#2e154b',
      logo: nodesIntegriteeSVG
    }
  },
  {
    homepage: 'https://interlay.io/',
    info: 'interlay',
    paraId: 2032,
    providers: {
      'Kintsugi Labs': 'wss://api.interlay.io/parachain',
      LuckyFriday: 'wss://rpc-interlay.luckyfriday.io/'
      // OnFinality: 'wss://interlay.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9986
    },
    text: 'Interlay',
    ui: {
      color: '#3E96FF',
      logo: nodesInterlaySVG
    }
  },
  {
    homepage: 'https://invarch.network/',
    info: 'invarch',
    paraId: 3340,
    providers: {
    },
    text: 'InvArch',
    ui: {
      color: 'linear-gradient(278deg, #f7d365 5.74%, #ff408a 99.41%)',
      logo: chainsInvarchJPEG
    }
  },
  {
    homepage: 'https://jamton.network/',
    info: 'jamton',
    paraId: 3397,
    providers: {
      Jamton: 'wss://rpc.jamton.network'
    },
    text: 'JAMTON',
    ui: {
      color: '#D33AD6',
      logo: nodesJamtonSVG
    }
  },
  {
    homepage: 'https://totemaccounting.com/',
    info: 'kapex',
    paraId: 2007,
    providers: {
      // OnFinality: 'wss://kapex-parachain.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9986
      // Totem: 'wss://k-ui.kapex.network' // https://github.com/polkadot-js/apps/issues/9616
    },
    text: 'Kapex',
    ui: {
      color: 'linear-gradient(158deg, rgba(226,157,0,1) 0%, rgba(234,55,203,1) 100%)',
      logo: chainsTotemSVG
    }
  },
  {
    homepage: 'https://www.kilt.io/',
    info: 'kilt',
    paraId: 2086,
    providers: {
      IBP1: 'wss://kilt.ibp.network',
      IBP2: 'wss://kilt.dotters.network',
      'KILT Foundation': 'wss://spiritnet.kilt.io/'
    },
    text: 'KILT Spiritnet',
    ui: {
      color: 'linear-gradient(45deg, #161B3B 0%, #D73D80 100%)',
      logo: nodesKiltIconSVG
    }
  },
  {
    homepage: 'https://kylin.network/',
    info: 'kylin',
    paraId: 2052,
    providers: {
      // 'Kylin Network': 'wss://polkadot.kylin-node.co.uk' // https://github.com/polkadot-js/apps/issues/10030
    },
    text: 'Kylin',
    ui: {
      color: '#ed007e',
      logo: nodesKylinPNG
    }
  },
  {
    homepage: 'https://laosnetwork.io/',
    info: 'laos',
    paraId: 3370,
    providers: {
      // Dwellir: 'wss://laos-rpc.n.dwellir.com', // https://github.com/polkadot-js/apps/issues/11495
      'laosfoundation.io': 'wss://rpc.laos.laosfoundation.io',
      'light client': 'light://substrate-connect/polkadot/laos'
    },
    text: 'Laos',
    ui: {
      color: 'linear-gradient(90deg, #25143B 0%, #613D93 29.69%, #EF9365 69.79%, #E2CF61 100%)',
      logo: chainsLaosPNG
    }
  },
  {
    homepage: 'https://logion.network/',
    info: 'logion',
    paraId: 3354,
    providers: {
      'Logion 1': 'wss://para-rpc01.logion.network'
      // 'Logion 2': 'wss://para-rpc02.logion.network' // https://github.com/polkadot-js/apps/issues/10890
    },
    text: 'Logion',
    ui: {
      color: 'rgb(21, 38, 101)',
      logo: chainsLogionPNG
    }
  },
  {
    homepage: 'https://manta.network',
    info: 'manta',
    paraId: 2104,
    providers: {
      'Manta Network': 'wss://ws.manta.systems'
      // OnFinality: 'wss://manta.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9977
    },
    text: 'Manta',
    ui: {
      color: '#2070a6',
      logo: nodesMantaPNG
    }
  },
  {
    homepage: 'https://moonbeam.network/networks/moonbeam/',
    info: 'moonbeam',
    paraId: 2004,
    providers: {
      Allnodes: 'wss://moonbeam-rpc.publicnode.com',
      // 'Automata 1RPC': 'wss://1rpc.io/glmr', // https://github.com/polkadot-js/apps/issues/10566
      Blast: 'wss://moonbeam.public.blastapi.io',
      Dwellir: 'wss://moonbeam-rpc.n.dwellir.com',
      IBP1: 'wss://moonbeam.ibp.network',
      IBP2: 'wss://moonbeam.dotters.network',
      'Moonbeam Foundation': 'wss://wss.api.moonbeam.network',
      OnFinality: 'wss://moonbeam.api.onfinality.io/public-ws',
      RadiumBlock: 'wss://moonbeam.public.curie.radiumblock.co/ws',
      UnitedBloc: 'wss://moonbeam.unitedbloc.com'
    },
    text: 'Moonbeam',
    ui: {
      color: '#000000',
      logo: nodesMoonbeamSVG
    }
  },
  {
    homepage: 'https://moonsama.com',
    info: 'moonsama',
    paraId: 3334,
    providers: {
      // Moonsama: 'wss://rpc.moonsama.com/ws' // https://github.com/polkadot-js/apps/issues/10289
    },
    text: 'Moonsama',
    ui: {
      color: '#1a202c',
      logo: nodesMoonsamaSVG
    }
  },
  {
    homepage: 'https://mythos.foundation/',
    info: 'mythos',
    paraId: 3369,
    providers: {
      Helikon: 'wss://rpc.helikon.io/mythos',
      IBP1: 'wss://mythos.ibp.network',
      IBP2: 'wss://mythos.dotters.network',
      parity: 'wss://polkadot-mythos-rpc.polkadot.io'
    },
    text: 'Mythos',
    ui: {
      color: '#262528',
      logo: nodesMythosPNG
    }
  },
  {
    homepage: 'https://neuroweb.ai',
    info: 'neuroweb',
    paraId: 2043,
    providers: {
      TraceLabs: 'wss://parachain-rpc.origin-trail.network'
    },
    text: 'NeuroWeb',
    ui: {
      color: '#000000',
      logo: chainsNeurowebPNG
    }
  },
  {
    homepage: 'https://nodle.com',
    info: 'nodle',
    paraId: 2026,
    providers: {
      Dwellir: 'wss://nodle-rpc.dwellir.com',
      OnFinality: 'wss://nodle-parachain.api.onfinality.io/public-ws'
    },
    text: 'Nodle',
    ui: {
      color: '#1ab394',
      logo: nodesNodleSVG
    }
  },
  {
    homepage: 'https://oak.tech',
    info: 'oak',
    isUnreachable: true,
    paraId: 2090,
    providers: {
      OAK: 'wss://rpc.oak.tech'
    },
    text: 'OAK Network',
    ui: {
      color: '#A8278C',
      logo: chainsOakPNG
    }
  },
  {
    homepage: 'https://www.omnibtc.finance',
    info: 'omnibtc',
    isUnreachable: true,
    paraId: 2053,
    providers: {
      OmniBTC: 'wss://psc-parachain.coming.chat'
    },
    text: 'OmniBTC',
    ui: {
      color: '#6759E9',
      logo: nodesOmnibtcSVG
    }
  },
  {
    homepage: 'https://parallel.fi',
    info: 'parallel',
    paraId: 2012,
    providers: {
      // Parallel: 'wss://polkadot-parallel-rpc.parallel.fi' // https://github.com/polkadot-js/apps/issues/11221
      // OnFinality: 'wss://parallel.api.onfinality.io/public-ws', // https://github.com/polkadot-js/apps/issues/9986
    },
    text: 'Parallel',
    ui: {
      color: '#ef18ac',
      logo: nodesParallelSVG
    }
  },
  {
    homepage: 'https://peaq.network/',
    info: 'peaq',
    paraId: 3338,
    providers: {
      // OnFinality: 'wss://peaq.api.onfinality.io/public-ws'
    },
    text: 'peaq',
    ui: {
      color: '#281C66',
      logo: chainsPeaqPNG
    }
  },
  {
    homepage: 'https://pendulumchain.org/',
    info: 'pendulum',
    paraId: 2094,
    providers: {
      PendulumChain: 'wss://rpc-pendulum.prd.pendulumchain.tech'
    },
    text: 'Pendulum',
    ui: {
      color: '#49E2FD',
      logo: chainsPendulumSVG
    }
  },
  {
    homepage: 'https://phala.network',
    info: 'phala',
    paraId: 2035,
    providers: {
      Dwellir: 'wss://phala-rpc.n.dwellir.com',
      Helikon: 'wss://rpc.helikon.io/phala',
      OnFinality: 'wss://phala.api.onfinality.io/public-ws',
      // Phala: 'wss://api.phala.network/ws', // https://github.com/polkadot-js/apps/issues/11251
      RadiumBlock: 'wss://phala.public.curie.radiumblock.co/ws'
      // Rockx: 'wss://rockx-phala.w3node.com/polka-public-phala/ws' // https://github.com/polkadot-js/apps/issues/10728
    },
    text: 'Phala Network',
    ui: {
      color: '#c6fa4c',
      logo: nodesPhalaSVG
    }
  },
  {
    homepage: 'https://www.polimec.org/',
    info: 'polimec',
    paraId: 3344,
    providers: {
      Amforc: 'wss://polimec.rpc.amforc.com',
      Helikon: 'wss://rpc.helikon.io/polimec',
      IBP1: 'wss://polimec.ibp.network',
      IBP2: 'wss://polimec.dotters.network',
      'Polimec Foundation': 'wss://rpc.polimec.org'
    },
    text: 'Polimec',
    ui: {
      color: '#25311C',
      logo: nodesPolimecSVG
    }
  },
  {
    homepage: 'https://polkadex.trade/crowdloans',
    info: 'polkadex',
    paraId: 3363,
    providers: {
      // OnFinality: 'wss://polkadex-parachain.api.onfinality.io/public-ws',
      // RadiumBlock: 'wss://polkadex-parachain.public.curie.radiumblock.co/ws'
    },
    text: 'Polkadex',
    ui: {
      color: '#7C30DD',
      logo: nodesPolkadexSVG
    }
  },
  {
    homepage: 'https://polkadex.trade/',
    info: 'polkadex',
    paraId: 2040,
    providers: {
      // OnFinality: 'wss://polkadex-parachain.api.onfinality.io/public-ws',
      // RadiumBlock: 'wss://polkadex-parachain.public.curie.radiumblock.co/ws' // https://github.com/polkadot-js/apps/issues/11577
    },
    text: 'Polkadex',
    ui: {
      color: '#7C30DD',
      logo: nodesPolkadexSVG
    }
  },
  {
    homepage: 'http://robonomics.network/',
    info: 'robonomics',
    paraId: 3388,
    providers: {
      Airalab: 'wss://polkadot.rpc.robonomics.network/'
    },
    text: 'Robonomics',
    ui: {
      color: '#e6007a',
      logo: nodesRobonomicsSVG
    }
  },
  {
    homepage: 'https://sora.org/',
    info: 'sora',
    paraId: 2025,
    providers: {
      Soramitsu: 'wss://ws.parachain-collator-3.pc3.sora2.soramitsu.co.jp'
    },
    text: 'SORA',
    ui: {
      color: '#2D2926',
      logo: nodesSoraSubstrateSVG
    }
  },
  {
    homepage: 'https://subdao.network/',
    info: 'subdao',
    isUnreachable: true,
    paraId: 2018,
    providers: {
      SubDAO: 'wss://parachain-rpc.subdao.org'
    },
    text: 'SubDAO',
    ui: {
      color: 'linear-gradient(50deg, #F20092 0%, #FF4D5D 100%)',
      logo: nodesSubdaoPNG
    }
  },
  {
    homepage: 'http://subgame.org/',
    info: 'subgame',
    paraId: 2017,
    providers: {
      // SubGame: 'wss://gamma.subgame.org/' // https://github.com/polkadot-js/apps/pull/6761
    },
    text: 'SubGame Gamma',
    ui: {
      color: '#EB027D',
      logo: nodesSubgameSVG
    }
  },
  {
    homepage: 'https://subsocial.network/',
    info: 'subsocial',
    paraId: 2101,
    providers: {
      // Dappforce: 'wss://para.subsocial.network' // https://github.com/polkadot-js/apps/issues/11569
      // OnFinality: 'wss://subsocial-polkadot.api.onfinality.io/public-ws' // https://github.com/polkadot-js/apps/issues/9977
    },
    text: 'Subsocial',
    ui: {
      color: '#b9018c',
      logo: nodesSubsocialSVG
    }
  },
  {
    homepage: 'https://www.t3rn.io/',
    info: 't3rn',
    paraId: 3333,
    providers: {
      // t3rn: 'wss://ws.t3rn.io' https://github.com/polkadot-js/apps/issues/11157
    },
    text: 't3rn',
    ui: {
      color: '#6f3bb2',
      logo: nodesT3rnPNG
    }
  },
  {
    homepage: 'https://unique.network/',
    info: 'unique',
    paraId: 2037,
    providers: {
      // Dwellir: 'wss://unique-rpc.n.dwellir.com', // https://github.com/polkadot-js/apps/issues/11531
      'Geo Load Balancer': 'wss://ws.unique.network',
      IBP1: 'wss://unique.ibp.network',
      IBP2: 'wss://unique.dotters.network',
      // OnFinality: 'wss://unique.api.onfinality.io/public-ws', // https://github.com/polkadot-js/apps/issues/10030
      'Unique America': 'wss://us-ws.unique.network',
      'Unique Asia': 'wss://asia-ws.unique.network',
      'Unique Europe': 'wss://eu-ws.unique.network'
    },
    text: 'Unique Network',
    ui: {
      color: '#40BCFF',
      logo: nodesUniqueSVG
    }
  },
  {
    homepage: 'https://www.watr.org/',
    info: 'watr',
    paraId: 2058,
    providers: {
      // Watr: 'wss://watr-rpc.watr-api.network' // https://github.com/polkadot-js/apps/issues/10890
    },
    text: 'Watr Network',
    ui: {
      color: '#373b39',
      logo: chainsWatrPNG
    }
  },
  {
    homepage: 'https://xcavate.io/',
    info: 'xcavate',
    paraId: 3413,
    providers: {
      IBP1: 'wss://xcavate.ibp.network',
      IBP2: 'wss://xcavate.dotters.network',
      Xcavate: 'wss://rpc1-polkadot.xcavate.io'
    },
    relayName: 'polkadot',
    text: 'Xcavate',
    ui: {
      color: '#FF0083',
      logo: chainsMyxcavPNG
    }
  },
  {
    homepage: 'https://xode.net',
    info: 'xode',
    paraId: 3417,
    providers: {
      XodeCommunity: 'wss://polkadot-rpcnode.xode.net',
      Zeeve: 'wss://xode-polkadot-rpc-01.zeeve.net/y0yxg038wn1fncc/rpc'
    },
    text: 'Xode',
    ui: {
      color: '#ed1f7a',
      logo: nodesXodePNG
    }
  },
  {
    homepage: 'https://zeitgeist.pm',
    info: 'zeitgeist',
    paraId: 2092,
    providers: {
      OnFinality: 'wss://zeitgeist.api.onfinality.io/public-ws'
      // ZeitgeistPM: 'wss://main.rpc.zeitgeist.pm/ws' // https://github.com/polkadot-js/apps/issues/11215
    },
    text: 'Zeitgeist',
    ui: {
      color: 'linear-gradient(180deg, rgba(32,90,172,1) 0%, rgba(26,72,138,1) 50%, rgba(13,36,69,1) 100%)',
      logo: nodesZeitgeistPNG
    }
  }

];

export const prodParasPolkadotCommon: EndpointOption[] = [
  {
    info: 'PolkadotAssetHub',
    isPeopleForIdentity: true,
    paraId: 1000,
    providers: {
      Blockops: 'wss://polkadot-assethub-rpc.blockops.network/ws',
      Dwellir: 'wss://asset-hub-polkadot-rpc.n.dwellir.com',
      'Dwellir Tunisia': 'wss://statemint-rpc-tn.dwellir.com',
      IBP1: 'wss://sys.ibp.network/asset-hub-polkadot',
      IBP2: 'wss://asset-hub-polkadot.dotters.network',
      LuckyFriday: 'wss://rpc-asset-hub-polkadot.luckyfriday.io',
      OnFinality: 'wss://statemint.api.onfinality.io/public-ws',
      Parity: 'wss://polkadot-asset-hub-rpc.polkadot.io',
      RadiumBlock: 'wss://statemint.public.curie.radiumblock.co/ws',
      Stakeworld: 'wss://dot-rpc.stakeworld.io/assethub'
    },
    relayName: 'polkadot',
    teleport: [-1, 1002, 1001, 1005, 1004],
    text: 'AssetHub',
    ui: {
      color: '#86e62a',
      logo: nodesAssetHubSVG
    }
  },
  {
    info: 'polkadotBridgeHub',
    isPeopleForIdentity: true,
    paraId: 1002,
    providers: {
      Dwellir: 'wss://bridge-hub-polkadot-rpc.n.dwellir.com',
      'Dwellir Tunisia': 'wss://polkadot-bridge-hub-rpc-tn.dwellir.com',
      IBP1: 'wss://sys.ibp.network/bridgehub-polkadot',
      IBP2: 'wss://bridge-hub-polkadot.dotters.network',
      LuckyFriday: 'wss://rpc-bridge-hub-polkadot.luckyfriday.io',
      OnFinality: 'wss://bridgehub-polkadot.api.onfinality.io/public-ws',
      Parity: 'wss://polkadot-bridge-hub-rpc.polkadot.io',
      RadiumBlock: 'wss://bridgehub-polkadot.public.curie.radiumblock.co/ws',
      Stakeworld: 'wss://dot-rpc.stakeworld.io/bridgehub'
    },
    relayName: 'polkadot',
    teleport: [-1, 1000],
    text: 'BridgeHub',
    ui: {
      logo: nodesBridgeHubSVG
    }
  },
  {
    info: 'polkadotCollectives',
    isPeopleForIdentity: true,
    paraId: 1001,
    providers: {
      Dwellir: 'wss://collectives-polkadot-rpc.n.dwellir.com',
      'Dwellir Tunisia': 'wss://polkadot-collectives-rpc-tn.dwellir.com',
      IBP1: 'wss://sys.ibp.network/collectives-polkadot',
      IBP2: 'wss://collectives-polkadot.dotters.network',
      LuckyFriday: 'wss://rpc-collectives-polkadot.luckyfriday.io',
      OnFinality: 'wss://collectives.api.onfinality.io/public-ws',
      Parity: 'wss://polkadot-collectives-rpc.polkadot.io',
      RadiumBlock: 'wss://collectives.public.curie.radiumblock.co/ws',
      Stakeworld: 'wss://dot-rpc.stakeworld.io/collectives'
    },
    relayName: 'polkadot',
    teleport: [-1, 1000],
    text: 'Collectives',
    ui: {
      color: '#e6777a',
      logo: nodesCollectivesSVG
    }
  },
  {
    info: 'polkadotCoretime',
    isPeopleForIdentity: true,
    paraId: 1005,
    providers: {
      Dwellir: 'wss://coretime-polkadot-rpc.n.dwellir.com',
      IBP1: 'wss://sys.ibp.network/coretime-polkadot',
      IBP2: 'wss://coretime-polkadot.dotters.network',
      LuckyFriday: 'wss://rpc-coretime-polkadot.luckyfriday.io',
      OnFinality: 'wss://coretime-polkadot.api.onfinality.io/public-ws',
      Parity: 'wss://polkadot-coretime-rpc.polkadot.io',
      Stakeworld: 'wss://dot-rpc.stakeworld.io/coretime'
    },
    relayName: 'polkadot',
    teleport: [-1, 1000],
    text: 'Coretime',
    ui: {}
  },
  {
    info: 'polkadotPeople',
    isPeople: true,
    isPeopleForIdentity: false,
    paraId: 1004,
    providers: {
      Dwellir: 'wss://people-polkadot-rpc.n.dwellir.com',
      IBP1: 'wss://sys.ibp.network/people-polkadot',
      IBP2: 'wss://people-polkadot.dotters.network',
      LuckyFriday: 'wss://rpc-people-polkadot.luckyfriday.io',
      OnFinality: 'wss://people-polkadot.api.onfinality.io/public-ws',
      Parity: 'wss://polkadot-people-rpc.polkadot.io',
      RadiumBlock: 'wss://people-polkadot.public.curie.radiumblock.co/ws',
      Stakeworld: 'wss://dot-rpc.stakeworld.io/people'
    },
    relayName: 'polkadot',
    teleport: [-1, 1000],
    text: 'People',
    ui: {
      color: '#e84366',
      logo: chainsPeoplePolkadotSVG
    }
  }
];

export const prodRelayPolkadot: EndpointOption = {
  info: 'esx',
  providers: {
    ESX: 'wss://rpc1-weu-testnet.esx.network'
  },
  text: 'ESX Testnet',
  ui: {
    color: '#011a22',
    logo: 'substrate'
  }
};
