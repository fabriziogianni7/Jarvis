import { Request, Response, route } from './httpSupport'

async function GET(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    const brianApiKey = req.secret?.brianApiKey as string;
    const query = (req.queries.chatQuery) ? req.queries.chatQuery[0] as string : 'swap 0.000001 eth for usdt on arbitrum';
    let result;

    try {
        const response = await fetch('https://api.brianknows.org/api/v0/agent/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Brian-Api-Key': `${brianApiKey}`
            },
            body: JSON.stringify({
                address: "0x2DAb3ae0D10da36B840B7855C3420fAC5485C558",
                prompt: query,
            })
        });
        const responseData = await response.json();
        console.log(JSON.stringify(responseData))
        result = responseData;
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        result = { error };
    }

    return new Response(result)
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}

