import { wagmiConfig } from "@/app/config/WagmiConfig";
import { PHALA_CID, allowedChainids } from "@/app/config/generalConfig";
import { useEffect, useState } from "react";
import { formatUnits, parseEther } from "viem";
import { useAccount, useChainId, useClient, useEstimateGas, usePrepareTransactionRequest, useReadContracts, useSendTransaction } from "wagmi";
import { BrianResponse } from "./hookUtils";
import axios from "axios";
import { estimateGas } from "wagmi/actions";


type HookProps = {
  text: string
}

// const PHALA_CID = "Qmef5oM4XSdXZHtPPW56b4rKj6TSrMpQPgeBP1pcUy7n3p"// working
// const PHALA_CID = "QmWcWgGz59AByhQHYhy8nJUxvohNpASwaxjpovnxDK7gez"// working

export default function useBrian({ text }: HookProps) {
  const { sendTransaction } = useSendTransaction()
  const { address } = useAccount()
  const [brianResp, setBrianResp] = useState<any>()
  const [brianDescription, setBrianDescription] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [error, setError] = useState<string>("")

  useEffect(() => { console.log(text) }, [text])

  const sendPrompt = async () => {
    setIsLoading(true)
    const encodedPrompt = encodeURIComponent(text);
    const brianResponse = await axios.get(`https://agents.phala.network/ipfs/${PHALA_CID}/0?prompt=${encodedPrompt}&fromAddress=${address}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
       
      })
    if(brianResponse?.data?.error){
      setError(brianResponse.data.error)
    }else if(brianResponse?.data == null){
      setError("an error occurred")
    }
    else{
    setBrianResp(brianResponse.data)
    setBrianDescription(brianResponse.data.description)
    }
    setIsLoading(false)
  }


  const buildTx = async () => {
    console.log("brian resp: ", brianResp)
    
    sendTransaction({
      to: brianResp?.steps[0].to as `0x${string}`,
      value:brianResp?.steps[0].value,
      data: brianResp?.steps[0].data as `0x${string}`
    })
  }

  useEffect(() => {
    if (text) {
      sendPrompt()
    }
  }, [text])

  useEffect(() => {
    if (text) {
      buildTx()
    }
  }, [brianResp])

  return { isLoading, error, brianDescription }
}