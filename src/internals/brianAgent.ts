// internal function to interact with brian.
// accessible when the path is 
export const  call_brian = async (brian_api_key:string, promt: string, fromAddress:string) =>  {
     try {
        const response = await fetch('https://api.brianknows.org/api/v0/agent/transaction', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'X-Brian-Api-Key': `${brian_api_key}`
               },
               body: JSON.stringify({
                   address: fromAddress,
                   prompt: promt,
               })
           });
           const responseData = await response.json();
           const returnValue = responseData.result[0].data
           return returnValue
     } catch (error) {
       return error
     };
}