import { http, createStorage, cookieStorage, useClient } from 'wagmi'
import { arbitrumSepolia, avalancheFuji, sepolia, polygonAmoy, base } from 'wagmi/chains'

import { Chain, WalletList, connectorsForWallets, getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'

import { getLogs } from 'viem/actions'
import {
  rabbyWallet,
} from '@rainbow-me/rainbowkit/wallets';

const projectId = `${process.env.NEXT_PUBLIC_WALLET_CONNECT_ID}`;

const supportedChains: Chain[] = [sepolia, arbitrumSepolia, avalancheFuji, polygonAmoy, base];

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rabbyWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);
export const wagmiConfig = getDefaultConfig({
    appName: "WalletConnection",
    projectId,
    chains: supportedChains as any,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    wallets:[
       {groupName: 'Recommended',
      wallets: [rabbyWallet],
    } 
    ],
    transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {}),
});

