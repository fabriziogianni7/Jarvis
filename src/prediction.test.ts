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
            chatQuery: ["Give me just the CHAINLINK token address on Ethereum Mainnet and nothing else!"],
            openAiModel: ["gpt-4o"]
        },
        secret: { openaiApiKey: process.env.OPENAI_API_KEY },
        headers: {},
    })
    let answer = JSON.parse(getResult).body;
    console.log('GET RESULT:', answer)

    const pondBaseUrl = "http://model-v2-api-471546444.us-east-1.elb.amazonaws.com:8001/api/v1/predict";
    let fullPondUrl = `${pondBaseUrl}/${answer}`;
    //let fullPondUrl = `${pondBaseUrl}/0x514910771af9ca656af840dff83e8264ecf986ca`;

    const pondResult = await fetch(fullPondUrl);
    let pondPredictions = await pondResult.json();
    console.log(pondPredictions.length);
    console.log(pondPredictions.slice(3,6));
}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())