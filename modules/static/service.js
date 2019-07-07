const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')

class  StaticService { 
  
    async countries () { 
        let countryResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)
      
            countryResult = await R.post('/RetailStaticDataCountries', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
            })
        return countryResult.data.RetailApiResponse
    
    }

    async providers () { 
        let providerResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)
      
            providerResult = await R.post('/RetailStaticDataProviders', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
            })
              return providerResult.data.RetailApiResponse
    
    }
    async corridors () { 
        let providerResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)
      
            providerResult = await R.post('/RetailStaticDataCorridors', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
            })
        return providerResult.data.RetailApiResponse
    
    }

 
    async relationships() { 
        let activateResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,accesstoken)
        try { 

            activateResult = R.post('/RetailAccessRegisterActivate',{
                randomguid,
                apiKey,
                hash,
                accesstoken
                
            })


        }catch(error) { 
            throw error
        }

        return activateResult
    }
    
    async reasons() { 

    }

    async providerItems() { 
        let resetPasswordResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,email)
        try { 

         resetPasswordResult = R.post('/RetailAccessPasswordResetRequest',{
                randomguid,
                apiKey,
                hash,
                email
                
            })


        }catch(error) { 
            throw error
        }

        return resetPasswordResult
    
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

module.exports = StaticService