import { Request } from '../httpSupport'
import main, { GET, POST } from '../index'
import 'dotenv/config'

async function execute(inputObj: any) {
    const inputJson = JSON.stringify(inputObj)
    console.log('INPUT:', inputJson)
    return await main(inputJson)
}

const testLocal = async () => {
    const req: Request = {  
        method:"POST",
        path:"",
        body: JSON.stringify({
            prompt: "/tx swap 0.000001 eth for usdt on arbitrum?",
            fromAddress: "0x2DAb3ae0D10da36B840B7855C3420fAC5485C558",
            path:"/tx"
        }),
        queries: {
            //key: ["adsdsdhjfdjfkj"] // needed in prod
        },
        secret: { }, // in prod don't pass that

        headers: {},
        // in the agewnt you'll pass here:
        // key: whatever you get when you add brian api key to the vault 
        async json(): Promise<any> {
            return JSON.parse(this.body!)
        }
    }


    // curl "https://agents.phala.network/ipfs/Qmed5DshabcvX9Rv6wuZYwDPuqqide8RktksLDA1kA1RKX/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""



    console.log("REQ",JSON.stringify(req))

    try {
        const result = await POST(req)
        console.log("getResult:", result) // this looks good
    } catch (error) {
        console.log("test error!", error)
    }
}

const testLocalget = async () => {
    const req: Request = {  
        method:"GET",
        path:"",
        body: "",
        queries: {
            prompt: ["/tx swap 0.000001 eth for usdt on arbitrum?"], // needed in prod
            fromAddress: ["0x2DAb3ae0D10da36B840B7855C3420fAC5485C558"]
        },
        secret: { }, // in prod don't pass that

        headers: {},
        // in the agewnt you'll pass here:
        // key: whatever you get when you add brian api key to the vault 
        async json(): Promise<any> {
            return JSON.parse(this.body!)
        }
    }


    // curl "https://agents.phala.network/ipfs/Qmed5DshabcvX9Rv6wuZYwDPuqqide8RktksLDA1kA1RKX/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""



    console.log("REQ",JSON.stringify(req))

    try {
        const result = await GET(req)
        console.log("getResult:", result) // this looks good
    } catch (error) {
        console.log("test error!", error)
    }
}

const testLocalgetFail = async () => {
    const req: Request = {  
        method:"GET",
        path:"",
        body: "",
        queries: {
            prompt: ["/tx transfer 0.000000001 ETH to 0xCCc1b7533693a95ADDC48ff1072073ED6F08dEE6 on base"], // needed in prod
            fromAddress: ["0x21b129D0e055Bc0435b55867828f86b80b78D76f"]
        },
        secret: { }, // in prod don't pass that

        headers: {},
        // in the agewnt you'll pass here:
        // key: whatever you get when you add brian api key to the vault 
        async json(): Promise<any> {
            return JSON.parse(this.body!)
        }
    }


    // curl "https://agents.phala.network/ipfs/Qmed5DshabcvX9Rv6wuZYwDPuqqide8RktksLDA1kA1RKX/0" --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"prompt\": \"/tx swap 0.000001 eth for usdt on arbitrum?\", \"path\":\"/tx\",\"fromAddress\":\"0x2DAb3ae0D10da36B840B7855C3420fAC5485C558\"}\""



    console.log("REQ",JSON.stringify(req))

    try {
        const result = await GET(req)
        console.log("getResult:", result) // this looks good
    } catch (error) {
        console.log("test error!", error)
    }
}

testLocalgetFail()




/**
 * 
 * axios.post(https://ipfs/q12336564674758shsbdvshdhgdsv, {
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