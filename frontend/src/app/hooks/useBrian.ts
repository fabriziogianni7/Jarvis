import { wagmiConfig } from "@/app/config/WagmiConfig";
import { allowedChainids } from "@/app/config/generalConfig";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useChainId, useClient, useReadContracts, useSendTransaction } from "wagmi";



export default function useBrian() {
    const publicClient = useClient({ config: wagmiConfig })
    const chainId = useChainId() as allowedChainids
    const { address: userAddress } = useAccount()
    const [data, setData] = useState<any>()
    const { sendTransaction } = useSendTransaction()


    useEffect(() => {
        sendTransaction({
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          value: parseEther('0.01'),
        })
    },[])


    // const { data: balances } = useReadContracts({
    //     contracts: allPools?.flatMap(poolAddress => {
    //         return [{
    //             abi: crossChainPoolAbi,
    //             address: poolAddress,
    //             functionName: "getTotalProtocolBalances"
    //         }]

    //     }) as any,

    // })


    return { data }
}