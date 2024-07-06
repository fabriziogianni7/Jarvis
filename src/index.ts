import { Request, Response, route } from './httpSupport'
import { call_brian } from './internals/brianAgent';

export const keywords = {
    brian: "/tx", // just brian
    chatGpt: "/info", // just chatgpt
    pond: "/price" // chatgpt -> pond -> gpt again 
}

/*
/////////////////////*
 for phala: this post call is not working, the response can just return small strings.
 */////////////////////
 
export async function POST(req: Request) {
    const key = req.queries?.key ?? ''; // if that's empty there is smt wronk

    const brian_api_key = req.secret?.brianApiKey as string; // this is an identifier for the api key --> we need to pass it from the FE // this is "BRIAN_API_KEY"
    const bodyString = req.body as string;
    const parsedBody = JSON.parse(bodyString)
    let result: any;
    let resp: any
    try {

         result = await call_brian(brian_api_key, parsedBody.prompt, parsedBody.fromAddress)

        console.log("XXX", result.steps[0].from)
    } catch (error) {
        console.error('Error happened:', error);
        result = { error };
    }
        // return new Response("ciao")
        return new Response(`
         from: ${result.steps[0].from.toString()},
        `)


}

export async function GET(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    const prompt = (req.queries.prompt) ? req.queries.prompt[0] as string : '';
    const fromAddress = (req.queries.fromAddress) ? req.queries.fromAddress[0] as string : '';
    let result;

    try {
        result = await call_brian("", prompt, fromAddress)
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        result = error;
    }

    return new Response(JSON.stringify(result))
}

export default async function main(request: string) {
    return await route({ GET,POST }, request)
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
