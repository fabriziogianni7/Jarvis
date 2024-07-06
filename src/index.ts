import { Request, Response, route } from './httpSupport'
import { call_brian } from './internals/brianAgent';

export const keywords = {
    brian: "/tx", // just brian
    chatGpt: "/info", // just chatgpt
    pond: "/price" // chatgpt -> pond -> gpt again 
}


export async function POST(req: Request): Promise<Response> {
    const key = req.queries?.key ?? ''; // if that's empty there is smt wronk
    const path = req.path // /, /tx, /price

    const brian_api_key = req.secret?.brianApiKey as string; // this is an identifier for the api key --> we need to pass it from the FE // this is "BRIAN_API_KEY"
    const {prompt, fromAddress} = req.body;
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

    return new Response(result)
}

export default async function main(request: string) {
    return await route({  POST }, request)
}

