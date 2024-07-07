// internal function to interact with brian.
// accessible when the path is 
export const call_mdb = async (prompt: string) => {
    let result = '';
    try {
        const url = 'https://api.mbd.xyz/v1/farcaster/casts/labels/for-text';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'HTTP-Referer': 'https://docs.mbd.xyz/',
                'X-Title': 'mbd_docs',
                'content-type': 'application/json',
                'x-api-key': 'mbd-7490a745b289d0e619a9958b73be657dbd396299975e641535dca8500a54e50f'
            },
            body: JSON.stringify({
                text_inputs: [prompt],
                label_category: 'sentiment'
            })
        };

        const result = await fetch(url, options)
        const body = (await result.json()).body


        // chat gpt analyze it
        const openAiModel = 'gpt-4o';
        const response = await fetch('https://api.red-pill.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Brian-Api-Key': `brian_Tx48fDpsMdvcpfWII`,
                'Authorization': `Bearer sk-qVBlJkO3e99t81623PsB0zHookSQJxU360gDMooLenN01gv2`
            },
            body: JSON.stringify({
                messages: [{
                    role: "user", content: `
                Someone asked this question "${prompt}? to a sentiment analysis tool. The tool returned this data: ${JSON.stringify(body)}.
                can you analyze the data and give the results?
                Just spit out the analysis without useless stuff.
                Also, be detailed regarding the question and try to look natural in the answer. convert decimal numbers in percentages. mention that the sentiment analysis tool is mdb`
                }],
                model: `${openAiModel}`,
            })
        });
        const responseData = await response.json();
        const chatGptAnalysis = responseData.choices[0].message.content as string;
        console.log("chatGptAnalysis", chatGptAnalysis)
        return chatGptAnalysis



    } catch (error: any) {
        result = error
        return error
    };
}


////curl "https://agents.phala.network/ipfs/QmPaTcN8cgkzmK2jABeWs9VYvdd7pKYL27foUh3Hc6ApTZ/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""