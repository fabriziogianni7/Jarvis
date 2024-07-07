import { promises as fs } from 'fs';
import 'dotenv/config'
import { Request } from '../httpSupport';
import main, { GET, POST } from '../index'


async function test() {
    const req: Request = {
        method: "GET",
        path: "",
        queries: {
            prompt: ["/prediction WBTC"], // needed in prod
        },
        secret: {}, // in prod don't pass that
        headers: {},
        async json(): Promise<any> {
            return JSON.parse(this.body!)
        }
    }
    console.log("REQ", JSON.stringify(req))
    const result = await GET(req)
    console.log("getResult:", result)
}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())