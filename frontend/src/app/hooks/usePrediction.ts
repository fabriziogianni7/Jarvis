import { wagmiConfig } from "@/app/config/WagmiConfig";
import { allowedChainids } from "@/app/config/generalConfig";
import { useEffect, useState } from "react";
import { formatUnits, parseEther } from "viem";
import { useAccount, useChainId, useClient, useEstimateGas, usePrepareTransactionRequest, useReadContracts, useSendTransaction } from "wagmi";
import { BrianResponse } from "./hookUtils";
import axios from "axios";
import { estimateGas } from "wagmi/actions";


type HookProps = {
  text: string
}

const PHALA_CID = "Qmef5oM4XSdXZHtPPW56b4rKj6TSrMpQPgeBP1pcUy7n3p"

export default function usePrediction({ text }: HookProps) {
  const [prediction, setPredictionResp] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [error, setError] = useState<string>("")


  const sendPrompt = async () => {
    setIsLoading(true)
    const encodedPrompt = encodeURIComponent(text);
    const predictionResp = await axios.get(`https://agents.phala.network/ipfs/${PHALA_CID}/0?prompt=${encodedPrompt}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
       
      })
    if(predictionResp?.data?.error){
      setError(predictionResp.data.error)
    }else if(predictionResp?.data == null){
      setError("an error occurred")
    }
    else{
    setPredictionResp(predictionResp.data)
    }
    setIsLoading(false)
  }


  useEffect(() => {
    if (text) {
      sendPrompt()
    }
  }, [text])


  return { isLoading, error, prediction }
}