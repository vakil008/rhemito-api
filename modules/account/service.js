const { R, hasher } = require('../../lib/api')
const uuid = require('uuid/v4')
const to = require('await-to-js').default;
class AccountService {

    async useraccount(sessiontoken, uid) {
        let userResult;
        const randomguid = uuid()

        const hash = hasher(randomguid, process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken, uid)

        userResult = await R.post('/RetailAccountUserGet', {
            randomguid,
            apiKey: process.env.API_KEY,
            hash,
            uid,
            sessiontoken
        })

        return userResult.data.RetailApiResponse

    }

    async createBeneficiary({ sessiontoken, uid,
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
            lname: lastname,
            isactive: active,
            isdelete: deleted,
            countryiso3: country,
            currencyiso: currency,
            servicecode: service,
            providerid: provider,
            providername,
            accountref: account,
        }
        if (contact) userRequest['contactid'] = contact
        if (relationship) userRequest['relationshipid'] = relationship
        if (reason) userRequest['reasonid'] = reason

        if (iban) userRequest['iban'] = iban
        if (swift) userRequest['swift'] = swift
        if (routing) userRequest['routing'] = routing
        if (provideritem) userRequest['provideritemid'] = provideritem
        const randomguid = uuid()
        const hash = contact ? hasher(randomguid, process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken, uid, contact) :
            hasher(randomguid, process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken, uid)
        userResult = await R.post('/RetailAccountBeneficiarySave', {
            randomguid,
            apiKey: process.env.API_KEY,
            hash,
            uid,
            sessiontoken,
            ...userRequest
        })
        return userResult.data.RetailApiResponse

    }

    async listBeneficiary({ sessiontoken, uid,
        service,
        country,
    }) {
        let recipientListQuery = [];

        let userRequest = {
            countryiso3: country,
            service,
        }
        if (country) userRequest['countryiso3'] = country
        if (service) userRequest['service'] = service

        const randomguid = uuid()
        const hash = hasher(randomguid, process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken, uid, country)

        const [error, userResult] = await to(R.post('/RetailAccountBeneficiaryList', {
            randomguid,
            apiKey: process.env.API_KEY,
            hash,
            uid,
            sessiontoken,
            ...userRequest
        }));

        //    return userResult.data.RetailApiResponse

        if (error) return error
        if (!userResult.data.RetailApiResponse.Contacts.length) {
            return [];
        }
        userResult.data.RetailApiResponse.Contacts.map(cnt => {
            let cuuid = uuid();
            let Chash = hasher(cuuid, process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken, uid, cnt.ContactId)
            let Creq = R.post('/RetailAccountBeneficiaryGet', {
                randomguid: cuuid,
                apiKey: process.env.API_KEY,
                hash: Chash,
                contactid: cnt.ContactId,
                sessiontoken,
                Uid: uid,
            })
            recipientListQuery.push(Creq)
        })
        const recipientGetResult = await Promise.all(recipientListQuery);
        const recipientGetResultArray = recipientGetResult.filter(c => c.data.RetailApiResponse.ResponseCode === '10000').map(cntGet => {

            return cntGet.data.RetailApiResponse.Contacts[0]
        })

        return recipientGetResultArray

    }

    async addDocument({ sessiontoken, uid,
        title,
        dateexpire,
        typeid,
        docstring
    }) {
        let documentResult;
        let docstringSplit = docstring.split(',');
        let documentRequest = {
            title,
            format: 'JPG',
            typeid,
            dateexpire,
            docbase64string: docstringSplit[1]
        }
        if (title) {
            documentRequest['title'] = title;
        }
        const randomguid = uuid();
        const hash = hasher(randomguid, process.env.PRIVATE_KEY, process.env.API_KEY, sessiontoken, uid)
        documentResult = await R.post('/RetailAccountDocumentAdd', {
            randomguid,
            apiKey: process.env.API_KEY,
            hash,
            uid,
            sessiontoken,
            ...documentRequest
        })
        return documentResult.data.RetailApiResponse

    }
}
module.exports = AccountService