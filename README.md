![Jarvis pragmatic multi-agent](./public/Jarvis.png)

- Collaborative: meant for teams (eg traders)
- Token-Gated: only the owner of the Jarvis NFT are granted access
- Pragmatic: can build ready-to-go transaction from the user's intent
- Multi-Agent: combines many agents (potentially an infinite number of agents) to get the most powerful AI assistant ever

__Jarvis__ is powered by:
- [Phala Network](https://phala.network)
- [Brian](https://www.brianknows.org)
- [Pond](https://cryptopond.xyz)
- [Base](https://www.base.org)
- [MBD](https://www.mbd.xyz)

![Jarvis pragmatic multi-agent](./public/Jarvis-quote.png)

Browse the deployed [__Demo App__](https://jarvis-orpin-one.vercel.app) or watch the [__Ultra-short Explainer Video__](https://www.youtube.com/watch?v=2keF5hi94xU)

## Our Feedback for overall DevEx
### MBD
Awesome playground, facilitating pleasant DevEx good and easy API calls

### Phala Network
- Not clear how to upload the secrets to TEE
- The [POST method](https://github.com/fabriziogianni7/Jarvis/blob/d9ea315ca960a15d90ceaf99dca00043381ae0bf/src/index.ts#L50) did not work
- Difficult to troubleshoot and debug the API

### Pond
- Slow API response times
- No explanations on the response format

### Brian
- Lack of testnets
- Vague error response messages (e.g. the actual error was the wrong network, but the response was too generic)
- Does [NOT](https://github.com/fabriziogianni7/Jarvis/blob/d9ea315ca960a15d90ceaf99dca00043381ae0bf/frontend/src/app/hooks/useBrian.ts#L54) work with Metamask

## Getting Started
### Install dependencies
```shell
npm i
```

Include all your secrets in `.env` file and add it to `.gitignore`

### Build
```shell
npm run build
```

### Test Locally
```shell
npm run test
```

### Publish Your AI Agent
Upload your compiled AI Agent code to IPFS using `thirdweb`.
```shell
npm run publish-agent
```
or (if thirdweb fails on you, like it did on us) use `CURL`:
```shell
curl -F file=@./dist/index.js https://agents.phala.network/ipfs
```

The command should show the URL to access your AI Agent.
```shell
> phat-gpt-template@0.0.1 publish-agent
> phat-fn build --experimentalAsync && tsx scripts/publish.ts

✓ Compiled successfully.
  72.73 KB  dist/index.js

    $$\     $$\       $$\                 $$\                         $$\       
    $$ |    $$ |      \__|                $$ |                        $$ |      
  $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\  
  \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\ 
    $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
    $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
    \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |
     \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/ 

 💎 thirdweb v0.14.12 💎

- Uploading file to IPFS. This may take a while depending on file sizes.

✔ Successfully uploaded file to IPFS.
✔ Files stored at the following IPFS URI: ipfs://QmayeZxHXwJxABXaNshP6j8uBE6RedkhmEgiaXd1w1Jib3
✔ Open this link to view your upload: https://bafybeif3y2jpswse2n6s2cikwyjmbak4cxlpm6vrmgobqkgsmmn34l6m4i.ipfs.cf-ipfs.com/

AI Agent Contract deployed at: https://agents.phala.network/ipfs/QmayeZxHXwJxABXaNshP6j8uBE6RedkhmEgiaXd1w1Jib3

Make sure to add your secrets to ensure your AI-Agent works properly.
```

### Access the Published AI Agent

Once published, your AI Agent will be available at the URL: `https://agents.phala.network/ipfs/<your-cid>`. You can get it from the "Publish to IPFS" step.

Test it with `curl`.

```bash
curl https://agents.phala.network/ipfs/<your-cid>
```

### Add Secrets

By default, all the compiled JS code is visible for anyone to view if they look at IPFS CID. This makes private info like API keys, signer keys, etc. vulnerable to be stolen. To protect devs from leaking keys, we have added a field called `secret` in the `Request` object. It allows you to store secrets in a vault for your AI Agent to access.

<details>
<summary><b>How to Add Secrets</b></summary>

The steps to add a `secret` is simple. We will add the [Brian](https://www.brianknows.org/app/) API Key in this example by creating a secret JSON object with the `brianApiKey`:

```json
{"brianApiKey": "<BRIAN_API_KEY>"}
```

Then in your frame code, you will be able to access the secret key via `req.secret` object:

```js
async function POST(req: Request): Promise<Response> {
    const apiKey = req.secret?.apiKey
}
```

> **Note**: Before continuing, make sure to publish your compiled AI Agent JS code, so you can add secrets to the CID.

**Open terminal**
Use `curl` to `POST` your secrets to `https://agents.phala.network/vaults`. Replace `IPFS_CID` with the CID to the compile JS code in IPFS, and replace `<BRIAN_API_KEY>` with your Brian API key. Note that you can name the secret field name something other than `brianApiKey`, but you will need to access the key in your `index.ts` file with the syntax `req.secret?.<your-secret-field-name> as string`

The command will look like this:
```shell
curl https://agents.phala.network/vaults -H 'Content-Type: application/json' -d '{"cid": "IPFS_CID", "data": {"brianApiKey": "<BRIAN_API_KEY>"}}'
# Output:
# {"token":"e85ae53d2ba4ca8d","key":"e781ef31210e0362","succeed":true}
```

The API returns a `token` and a `key`. The `key` is the id of your secret. It can be used to specify which secret you are going to pass to your frame. The `token` can be used by the developer to access the raw secret. You should never leak the `token`.

To verify the secret, run the following command where `key` and `token` are replaced with the values from adding your `secret` to the vault.
```shell
curl https://agents.phala.network/vaults/<key>/<token>
```

Expected output:
```shell
{"data":{"brianApiKey":"<BRIAN_API_KEY>"},"succeed":true}
```

If you are using secrets, make sure that your URL is set in the following syntax where `cid` is the IPFS CID of your compiled JS file and `key` is the `key` from adding secrets to your vault.
```text
https://agents.phala.network/ipfs/<cid>?key=<key>
```

Example:
https://agents.phala.network/ipfs/QmX5ofLpppdaFuuZx3LvGaAZAXz7zuD6gy5AuzE6cyoz4N?key=2e01c25ca431c806&chatQuery=What%20is%20Uniswap

</details>

### Access Queries
To help create custom logic, we have an array variable named `queries` that can be accessed in the `Request` class. To access the `queries` array variable `chatQuery` value at index `0`, the syntax will look as follows:
```typescript
const query = req.queries.chatQuery[0] as string;
```
The example at https://agents.phala.network/ipfs/QmX5ofLpppdaFuuZx3LvGaAZAXz7zuD6gy5AuzE6cyoz4N?key=2e01c25ca431c806&chatQuery=What%20is%20Uniswap will have a value of `When did humans land on the moon`. `queries` can have any field name, so `chatQuery` is just an example of a field name and not a mandatory name, but remember to update your `index.ts` file logic to use your expected field name.

## Useful Curl Commands
`curl https://agents.phala.network/vaults -H 'Content-Type: application/json' -d '{"cid": "QmWTXjtJJUQKacRD2x4Dxj2ysKoo2PKMrSBwV2PBTRuUv6/0", "data": {"brianApiKey": "brian_key"}}'`

`curl https://agents.phala.network/ipfs/QmWTXjtJJUQKacRD2x4Dxj2ysKoo2PKMrSBwV2PBTRuUv6/0\?key\=the_key_from_previous_call`