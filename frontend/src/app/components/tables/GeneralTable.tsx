'use client'

// import { HSOverlay, ICollectionItem } from "preline/preline";
import GeneralModal from "../modals/GeneralModal";
import { useEffect, useState } from "react";
import { Pool } from "@/app/config/interfaces";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { HSOverlay, ICollectionItem } from "preline";
import { formatEther } from "viem";


interface GeneralTableProps {
}




export default function GeneralTable({ }: GeneralTableProps) {
    const path = usePathname();
    const [preline, setPreline] = useState<any>()

    useEffect(() => {
        const dynamicImport = async () => {
            const preline = (await import("preline/preline"))
            setPreline(preline)
        }
        if (path) {
            dynamicImport()
        }
    }, [path])

    const openModal = () => {
        const modal = preline.HSOverlay.getInstance('#general-modal' as unknown as HTMLElement, true) as ICollectionItem<HSOverlay>;
        modal.element.open();
    }

    return (
        // That's a table
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead>
                                <tr key={1}>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">element 1</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">element 2</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">element 3</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">element 4</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">element 4</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {
                                    [1,2,3,4].map((i) => <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{
                                            i
                                        }</td>
                                        <td className="px-6 py-4 whitespace-nowrap te  t-sm text-gray-800 dark:text-neutral-200 ">
                                            <div className="flex">
                                                {
                                            i
                                        }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 ">
                                            <div className="flex">
                                                {
                                            i
                                        }
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 ">
                                            <div className="flex">
                                                xxx
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 ">
                                            <div className="flex">
                                               {
                                            i
                                        }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-slate-300 dark:hover:bg-neutral-800disabled:opacity-50"
                                                data-hs-overlay="#general-modal"
                                                onClick={() => openModal()}
                                            >
                                                Action x
                                            </button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <GeneralModal  />
        </div>
    )
}