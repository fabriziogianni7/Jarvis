// internal function to interact with brian.
// accessible when the path is 
export const call_brian = async (brian_api_key: string, promt: string, fromAddress: string) => {
    try {
        const response = await fetch('https://api.brianknows.org/api/v0/agent/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Brian-Api-Key': `brian_Tx48fDpsMdvcpfWII`
                //    'X-Brian-Api-Key': `${brian_api_key}`
            },
            body: JSON.stringify({
                address: fromAddress,
                prompt: promt,
            })
        });
        const responseData = await response.json();
        const returnValue = responseData.error ? {
            error: responseData.error
        }  :  responseData.result[0].data 
        return returnValue
    } catch (error) {
        return error
    };
}


////curl "https://agents.phala.network/ipfs/QmPaTcN8cgkzmK2jABeWs9VYvdd7pKYL27foUh3Hc6ApTZ/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""