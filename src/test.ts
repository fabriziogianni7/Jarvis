import { Request } from './httpSupport'
import main, { POST } from './index'
import 'dotenv/config'

const testLocal = async () => {
    const req: Request = {
        method: 'GET',
        path: '/tx', // that's for brian
        body: {
            prompt: "/tx swap 0.000001 eth for usdt on arbitrum?",
            fromAddress: "0x2DAb3ae0D10da36B840B7855C3420fAC5485C558"
        },
        queries: {
            key: ["adsdsdhjfdjfkj"] // needed in prod
        },
        secret: { brianApiKey: process.env.BRIAN_API_KEY }, // in prod don't pass that

        headers: {},
        // in the agewnt you'll pass here:
        // key: whatever you get when you add brian api key to the vault 
        async json(): Promise<any> {
            return JSON.parse(this.body!)
        }
    }

    try {
        const result = await POST(req)
        console.log("getResult:", result) // this looks good
    } catch (error) {
        console.log("test error!", error)
    }
}

testLocal()



/**
 * FRONTEND WILL BE:
 * axios.post(https://ipfs/<cid>, {
        method: 'POST',
        path: '/tx', // that's for brian
        body: {
            prompt: "/tx swap 0.000001 eth for usdt on arbitrum?",
            fromAddress: "0x2DAb3ae0D10da36B840B7855C3420fAC5485C558"
        },
        queries: {
            key: ["adsdsdhjfdjfkj"] // needed in prod
        },
        secret: { brianApiKey: process.env.BRIAN_API_KEY }, // in prod don't pass that

        headers: {},
        // in the agewnt you'll pass here:
        // key: whatever you get when you add brian api key to the vault 
        async json(): Promise<any> {
            return JSON.parse(this.body!)
        }
    })
 */