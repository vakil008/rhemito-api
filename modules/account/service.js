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

    async createBeneficiary ({sessiontoken, uid, 
        contact,
        firstname,
        lastname,
        active,
        deleted,
        service,
        country,
        currency,
       reason,
       relationship,
         provider,
       provideritem,
        providername,
        account,
        iban,
        swift,
        routing
}) { 
        let userResult;
        let userRequest = {
           fname: firstname,
            lname:lastname,
            isactive:active,
            isdelete: deleted,
            countryiso3:country,
            currencyiso:currency,
            servicecode:service,
            providerid: provider,
           providername,
           accountref:account,
        }
        if(contact) userRequest['contactid'] = contact
        if(relationship) userRequest['relationshipid'] = relationship
        if(reason) userRequest['reasonid'] = reason
      
        if(iban) userRequest['iban'] = iban
        if(swift) userRequest['swift'] = swift
        if(routing) userRequest['routing'] = routing
        if(provideritem) userRequest['provideritemid'] = provideritem
        const randomguid = uuid()
        const hash =contact ? hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken,uid,contact):
        hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken,uid)
            userResult = await R.post('/RetailAccountBeneficiarySave', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
                uid, 
                sessiontoken,
                ...userRequest
            })
        console.log('beneficiary',userResult.data.RetailApiResponse)
        return userResult.data.RetailApiResponse
    
    }

    async listBeneficiary ({sessiontoken, uid, 
        service,
        country,
        currency
}) { 
        let userResult;
        let userRequest = {
            countryiso3:country,
            service,
             }
             if(country) userRequest['countryiso3'] = country
             if(service) userRequest['service'] = service
      
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken,uid,country)
     
            userResult = await R.post('/RetailAccountBeneficiaryList', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
                uid, 
                sessiontoken,
                ...userRequest
            })
        console.log('beneficiaries',userResult.data.RetailApiResponse)
        return userResult.data.RetailApiResponse
    
    }
}

module.exports = AccountService