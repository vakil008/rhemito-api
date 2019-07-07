const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')

class  AccessService { 
  
    async register (fname,mname,lname,country,mobileno,regtype,businessname,email, pass,issubscribe) { 
        let registerResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,email.toLowerCase(),country)
           registerResult = await R.post('/RetailAccessRegister', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
                fname,mname,lname,
                countryiso3: country,
                mobileno,
                regtype,
                businessname,
                email,
                pass: hasher(email.toLowerCase(),pass),
                issubscribe
            })
      
         return registerResult.data.RetailApiResponse
    
    }

    async activate (accesstoken) {    
        let activateResult
    
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, accesstoken)
     
            activateResult = await  R.post('/RetailAccessRegisterActivate',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash,
                accesstoken
                
            })
            return {
                ResponseMessage:'none'
            }
        // return activateResult.data.RetailApiResponse
      }
    
    async login(email,pass) { 
        let loginResult
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,email.toLowerCase())
        
        loginResult = await  R.post('/RetailAccessLogin',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash,
                email,
                pass: hasher(email.toLowerCase(),pass)
                
            })
         return loginResult.data.RetailApiResponse
    }
    


    async validatePassword(accesstoken) { 
        let validatePasswordResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,accesstoken)
        try { 

         validatePasswordResult = R.post('/RetailAccessPasswordResetValidate',{
                randomguid,
                apiKey,
                hash,
                accesstoken
                
            })


        }catch(error) { 
            throw error
        }

        return validatePasswordResult
    
    }
    async occupations() { 
        let confirmPasswordResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,accesstoken)
        try { 

         confirmPasswordResult = R.post('/RetailAccessPasswordResetConfirm',{
                randomguid,
                apiKey,
                hash,
                accesstoken
                
            })


        }catch(error) { 
            throw error
        }

        return confirmPasswordResult
    
    }

    async postcode() { 
        let signoutResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,sessiontoken)
        try { 

         signoutResult = R.post('/RetailAccessSignOut',{
                randomguid,
                apiKey,
                hash,
                sessiontoken
                
            })


        }catch(error) { 
            throw error
        }

        return signoutResult
    
    }
    async ticketCategory() { 
        let signoutResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,sessiontoken)
        try { 

         signoutResult = R.post('/RetailAccessSignOut',{
                randomguid,
                apiKey,
                hash,
                sessiontoken
                
            })


        }catch(error) { 
            throw error
        }

        return signoutResult
    
    }
}

module.exports = AccessService