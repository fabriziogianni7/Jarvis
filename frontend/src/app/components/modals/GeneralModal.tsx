import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import Image from 'next/image';
import { allowedChainids } from "@/app/config/generalConfig";


interface GeneralModalProps {
}

export default function GeneralModal({}: GeneralModalProps) {
    const [phase, setPhase] = useState<"approve" | "deposit" | "success">()
    const { address } = useAccount()
    const chainId = useChainId() as allowedChainids

    return (<div id="general-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 className="font-bold text-gray-800 dark:text-slate-300">
                      Modal Title
                    </h3>
                    <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-slate-300 dark:hover:bg-neutral-700" data-hs-overlay="#general-modal">
                        <span className="sr-only">Close</span>
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                        <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
                            <div className="flex p-4">
                                <div className="ms-4">
                                    <h3 className="text-gray-800 font-semibold dark:text-slate-300">
                                        Deposit Tokens
                                    </h3>
                                    <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                       blabla here
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <br />
                    <hr></hr>
                    <br />
                    {/* <CustomInput disabled={false} title="Select Amount of Tokens you want to deposit" setValue={call a function here} /> */}
                </div>
            </div>
        </div>
    );
}