// internal function to interact with brian.
// accessible when the path is 
export const call_chatgpt = async (text: string) => {
    const openAiModel = 'gpt-4o';
    let result = '';
    try {
        const response = await fetch('https://api.red-pill.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Brian-Api-Key': `brian_Tx48fDpsMdvcpfWII`,
                'Authorization': `Bearer sk-qVBlJkO3e99t81623PsB0zHookSQJxU360gDMooLenN01gv2`
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: `${text}` }],
                model: `${openAiModel}`,
            })
        });
        const responseData = await response.json();
        result = responseData.choices[0].message.content as string;

        return result

    } catch (error: any) {
        result = error
        return error
    };
}


////curl "https://agents.phala.network/ipfs/QmPaTcN8cgkzmK2jABeWs9VYvdd7pKYL27foUh3Hc6ApTZ/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""