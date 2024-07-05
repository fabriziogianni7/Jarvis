import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

async function GET(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    const brianApiKey = req.secret?.brianApiKey as string;
    const query = (req.queries.chatQuery) ? req.queries.chatQuery[0] as string : 'What is Brian?';
    let result;

    try {
        const response = await fetch('https://api.brianknows.org/api/v0/agent/knowledge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Brian-Api-Key': `${brianApiKey}`
            },
            body: JSON.stringify({
                prompt: query,
            })
        });
        const responseData = await response.json();
        result = responseData.result.text as string;
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        result = error;
    }

    return new Response(renderHtml(result as string))
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
