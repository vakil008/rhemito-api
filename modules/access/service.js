const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4');
const { authenticateUser } = require('../../lib/bank');
const to  = require('await-to-js').default

class  AccessService {

    async register (firstname,middlename,lastname,country,mobileno,regtype,businessname,email, pass,issubscribe) {
      try {
        let registerResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,email.toLowerCase(),country)
           registerResult = await R.post('/RetailAccessRegister', {
                randomguid,
                apiKey: process.env.API_KEY,
                hash,
                fname:firstname,
                lname:lastname,
                CountryIso3: country,
                mobileno,
                regtype,
                businessname,
                email,
                pass: hasher(email.toLowerCase(),pass),
                issubscribe
            })

         return registerResult.data.RetailApiResponse
      }catch(registerError) {
          throw registerError
      }

    }

    async activate (accesstoken) {
        let activateResult

        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,accesstoken.toLowerCase())

            activateResult = await  R.post('/RetailAccessRegisterActivate',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash,
                accesstoken

            })

     return activateResult.data.RetailApiResponse
      }

    async reset (email) {
        let resetResult

        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY,process.env.API_KEY, email.toLowerCase())

            resetResult = await  R.post('/RetailAccessPasswordResetRequest',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash,
                email

            })

         return resetResult.data.RetailApiResponse
      }
      async validate (accesstoken) {
        let validateResult

        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,accesstoken.toLowerCase())

            validateResult = await  R.post('/RetailAccessPasswordResetValidate',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash,
                accesstoken

            })

         return validateResult.data.RetailApiResponse
      }
      async confirm (accesstoken,email,pass) {
        let confirmResult

        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,accesstoken.toLowerCase())

            confirmResult = await  R.post('/RetailAccessPasswordResetConfirm',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash,
                accesstoken,
                pass: hasher(email.toLowerCase(),pass)
               })

         return confirmResult.data.RetailApiResponse
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
        const [loginBankError, loginBank]  =  await to(authenticateUser(email,pass))
        if(loginBankError) {
            throw loginBankError
        }
        return  {
            loginUser: loginResult.data.RetailApiResponse,
            bankToken: loginBank.data.token
        }

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