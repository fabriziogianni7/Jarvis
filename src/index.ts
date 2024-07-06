import { Request, Response, route } from './httpSupport'
import { call_brian } from './internals/brianAgent';

export const keywords = {
    brian: "/tx", // just brian
    chatGpt: "/info", // just chatgpt
    pond: "/price" // chatgpt -> pond -> gpt again 
}


export async function POST(req: Request): Promise<Response> {
    const key = req.queries?.key ?? ''; // if that's empty there is smt wronk

    const brian_api_key = req.secret?.brianApiKey as string; // this is an identifier for the api key --> we need to pass it from the FE // this is "BRIAN_API_KEY"
    const {prompt, fromAddress,path} = req.body;
    let result;

    try {
        // const agentId = prompt.split(" ")[0]
        switch (path) {
            case keywords.brian:
                result = await call_brian(brian_api_key, prompt, fromAddress)
                break;
            // case keywords.brian:
            //     result = await call_brian(brian_api_key, prompt)
            //     break;

            default:
                break;
        }
    } catch (error) {
        console.error('Error happened:', error);
        result = { error };
    }

    return new Response("RESULT")
}

export default async function main(request: string) {
    return await route({  POST }, request)
}


/**
 * 
curl --location 'https://agents.phala.network/ipfs/QmY9L7rLsR3bHw3XxwWSSNnKTngzvkiWnVWwKj4SCw9nz3/0' \
--header 'Content-Type: application/json' \
--data '{
    "prompt": "/tx swap 0.000001 eth for usdt on arbitrum?",
    "fromAddress": "0x2DAb3ae0D10da36B840B7855C3420fAC5485C558",
    "path": "/tx"
}'
--method:POST
 */
