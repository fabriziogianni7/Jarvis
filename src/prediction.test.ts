import { promises as fs } from 'fs';
import main from './openai'
import 'dotenv/config'

async function execute(inputObj: any) {
    const inputJson = JSON.stringify(inputObj)
    console.log('INPUT:', inputJson)
    return await main(inputJson)
}

async function test() {
    const getResult = await execute({
        method: 'GET',
        queries: {
            chatQuery: ["Give me a json in javascript format of Chainlink's token symbol and address on Base Mainnet and nothing else!"],
            openAiModel: ["gpt-4o"]
        },
        secret: { openaiApiKey: process.env.OPENAI_API_KEY },
        headers: {},
    })
    console.log(getResult);
    let token = JSON.parse(getResult);
    console.log('GET RESULT:', token )

    const pondBaseUrl = "http://model-v2-api-471546444.us-east-1.elb.amazonaws.com:8001/api/v1/predict";
    let fullPondUrl = `${pondBaseUrl}/${token}`;
    //let fullPondUrl = `${pondBaseUrl}/0x514910771af9ca656af840dff83e8264ecf986ca`;

    try {
        const pondResult = await fetch(fullPondUrl);
        let pondPredictions = await pondResult.json();
        pondPredictions.sort((a, b) => b.predict_at - a.predict_at);

        console.log(`The ${token} token is predited to move $${pondPredictions[0].prediction} in the next hour`);
        //console.log(pondPredictions.slice(3,6));
        //await fs.writeFile('pondPredictions.json', JSON.stringify(pondPredictions, null, 2));
        //console.log('Pond predictions saved to pondPredictions.json');
    } catch (error) {
        console.error('Error fetching pond predictions:', error);
    }
}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())