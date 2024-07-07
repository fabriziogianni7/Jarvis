import { JarvisABI } from '@/app/config/abi';
import { JARVIS_ADDRESS } from '@/app/config/generalConfig';
import React, { useState } from 'react';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
// import { ethers } from 'ethers';

export const CreateJarvis = () => {
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [minting, setMinting] = useState(false);
    const [message, setMessage] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const { writeContract } = useWriteContract()

    const handleNameInputChange = (event: any) => {
        setNameInput(event.target.value);
    };


    const handleAddressInputChange = (event: any) => {
        setAddressInput(event.target.value);
    };

    const jarvisAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address

    const handleOptionChange = (event: any) => {
        const options = event.target.options;
        let selected = selectedOptions
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        // console.log(selected)
        setSelectedOptions(selected as any);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen ">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Your Jarvis Multi Agent</h2>
                <p className="text-gray-600 mb-4 text-center">Start working with your teammates</p>
                <input
                    type="text"
                    value={nameInput}
                    onChange={handleNameInputChange}
                    className="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter a name for you Jarvis"
                />
                <input
                    type="text"
                    value={addressInput}
                    onChange={handleAddressInputChange}
                    className="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your teammate address"
                />
                <select
                    multiple
                    value={selectedOptions}
                    onChange={handleOptionChange}
                    className="block w-full mt-1 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                >
                    <option value="chatgpt">Chat GPT</option>
                    <option value="pond">Pond</option>
                    <option value="brian">Brian</option>
                </select>
                <button
                    onClick={() => { writeContract({
                            abi: JarvisABI,
                            address: JARVIS_ADDRESS,
                            functionName: 'mintToken',
                            args: [
                                nameInput,
                                addressInput
                            ],
                            value: parseEther("0.00000001")
                        })
                    }}
                    disabled={minting}
                    className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${minting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                >
                    {minting ? 'Cereating A Collaborative Jarvis...' : 'Create A Collaborative Jarvis'}
                </button>
                {message && <p className="mt-4 text-center text-red-600">{message}</p>}
            </div>
        </div>
    );
};
