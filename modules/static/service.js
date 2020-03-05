const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')
const to  = require('await-to-js').default
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
            console.log('countries', countryResult.data.RetailApiResponse);
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
    async subproviders (provider) {
        let providerResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY, provider.toLowerCase())

            providerResult = await R.post('/RetailStaticDataProviderItems', {
                randomguid,
                apiKey: process.env.API_KEY,
                hash,
                Providerid: provider
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

        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)

          const [error,relationshipResult] =await  to(R.post('/RetailStaticDataRelationships',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash
            }))
       if(error) throw error
        return relationshipResult.data.RetailApiResponse
    }

    async reasons() {
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)

            const [error,reasonResult] = await to(R.post('/RetailStaticDataReasons',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash

            }))
      if(error) throw error
       return reasonResult.data.RetailApiResponse
    }

    async doctypes() {
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)

            const [error,docTypesResult] = await to(R.post('/RetailStaticDataDocumentTypes',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash
            }))
      if(error) throw error
       return docTypesResult.data.RetailApiResponse
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
    async ticketTypes() {
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY)

            const [error,ticketTypesResult] = await to(R.post('/RetailStaticDataTicketCategoryTypes',{
                randomguid,
                apiKey:process.env.API_KEY,
                hash

            }))
      if(error) throw error
       return ticketTypesResult.data.RetailApiResponse

    }
}

module.exports = StaticService