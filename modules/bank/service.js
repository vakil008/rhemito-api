const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')
const to  = require('await-to-js').default
class  StaticService {

    async auth () {
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

    async checkaccount () {
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
    async fundingaccount (provider) {
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

}

module.exports = StaticService