
import { poolFactoryAbi } from "../abis/poolFactoryAbi";
import * as all from "viem/chains";

const { ...chains } = all;
export enum ChainId {
    SEPOLIA = 11155111,
    ARB_SEPOLIA = 421614,
    FUJI = 43113,
    AMOY = 80002,
}

export type allowedChainids = 11155111 | 421614 | 43113 | 80002


export function getChain(chainId: number) {
    for (const chain of Object.values(chains)) {
        if (chain.id === chainId) {
            return chain;
        }
    }

    throw new Error(`Chain with id ${chainId} not found`);
}