// internal function to interact with brian.
// accessible when the path is 
export const call_chatgpt_and_pond = async (tokenSymbol: string) => {
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
                messages: [{ role: "user", content: `Give ${tokenSymbol}'s token symbol and address on ethereum mainnet! list it in this format {\"symbol\":string, \"address\":string}. don't print anything else` }],
                model: `${openAiModel}`,
            })
        });
        const responseData = await response.json();
        result = responseData.choices[0].message.content as string;
        let token = JSON.parse(result);
        const tokenAddress = token.address
        // const tokenSymbol = token.symbol

        const pondBaseUrl = "http://model-v2-api-471546444.us-east-1.elb.amazonaws.com:8001/api/v1/predict";
        let fullPondUrl = `${pondBaseUrl}/${tokenAddress}`;

        const pondResult = await fetch(fullPondUrl);
        let pondPredictions = await pondResult.json();
        console.log(pondPredictions)
        pondPredictions.sort((a: { predict_at: number; }, b: { predict_at: number; }) => b.predict_at - a.predict_at);

        return `${tokenSymbol} token is predicted to move by $ ${pondPredictions[0].prediction} in the next hour`

    } catch (error: any) {
        result = error
        return error
    };
}


////curl "https://agents.phala.network/ipfs/QmPaTcN8cgkzmK2jABeWs9VYvdd7pKYL27foUh3Hc6ApTZ/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""