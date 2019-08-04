const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')

class  AccountService { 
  
    async useraccount (sessiontoken,uid) { 
        let userResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken,uid)
      
            userResult = await R.post('/RetailAccountUserGet', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
                uid,
                sessiontoken
            })
       
        return userResult.data.RetailApiResponse
    
    }

    async createBeneficiary ({sessiontoken, uid, }) { 
        let userResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken,uid)
      
            userResult = await R.post('/RetailAccountUserGet', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
                uid,
                sessiontoken
            })
        return userResult.data.RetailApiResponse
    
    }
}

module.exports = AccountService