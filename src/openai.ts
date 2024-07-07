import { Request, Response, route } from './httpSupport'
//import { renderHtml } from './uiSupport'

async function GET(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    const openaiApiKey = req.secret?.openaiApiKey as string;
    const openAiModel = 'gpt-4o';
    const query = req.queries.chatQuery[0] as string;
    let result = '';

    try {
        const response = await fetch('https://api.red-pill.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: `${query}` }],
                model: `${openAiModel}`,
            })
        });
        const responseData = await response.json();
        result = responseData.choices[0].message.content as string;
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        result = error;
    }

    return new Response(result);
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}