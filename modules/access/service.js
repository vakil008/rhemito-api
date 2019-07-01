import  {R , hasher} from '../../lib/api'
import uuid from 'uuid/v4'

class  AccessService { 
    constructor(props) {
    
    }
    async register (apiKey,fname,lname, countryiso3,regtype,email,pass,issubscribe,businessname=null) { 
        let registerResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,email, countryiso3)
        try  {
            registerResult = await R.post('/RetailAccessRegister', {
                randomguid,
                apiKey,
                fname,
                lname,
                hash,
                countryiso3,
                regtype,
                businessname,
                email,
                pass,
                issubscribe
            })
        }catch(err){
            throw e
        }
        return registerResult
    }

    async login (email, pass) {    
        let loginResult
        const randomguid = uuid()
        const hash = hasher(randomguid,this.privateKey, apiKey,email)
        try { 

            loginResult = R.post('/RetailAccessLogin',{
                randomguid,
                apiKey,
                hash,
                email,
                pass
                
            })


        }catch(error) { 
            throw error
        }

        return loginResult
      }
    
    async activate(accesstoken) { 
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
    
    async confirmPassword() { 

    }

    async resetPassword(email) { 
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
    async confirmPassword(accesstoken,pass) { 
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

    async signout(sessiontoken) { 
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