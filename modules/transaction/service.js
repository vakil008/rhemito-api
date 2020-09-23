const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4');
const { getFundingAccount, checkCCAccount } = require('../../lib/bank');
const to  = require('await-to-js').default
class  TransactionService {

    async calculate ({uid,
        sessiontoken,
        fromcountry,
        fromcurrency,
        tocountry,
        tocurrency,
        amount,
        direction,
        service,
        discountcode,
        isvalidate, banktoken}) {

            let calculateResult;
        const randomguid = uuid()

        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid,
            fromcountry.toLowerCase(),fromcurrency.toLowerCase(),
            tocountry.toLowerCase(),tocurrency.toLowerCase(),service.toLowerCase())
            calculateResult = await R.post('/RetailTransactionCalculateRate', {
                randomguid,
                apiKey: process.env.API_KEY,
                sessiontoken,
                hash,
                Uid:uid,
                fromcountryiso3:fromcountry,
                fromcurrencyiso3:fromcurrency,
                tocountryiso3:tocountry,
                tocurrencyiso3:tocurrency,
                Amount:amount,
                Direction:direction,
                Service:service,
                discountcode:discountcode,
                isvalidate

            })
            if(banktoken) {
               const [bankDetailError, bankdetail] = await to(checkCCAccount(uid, fromcurrency, amount, banktoken))
                if(bankDetailError) {
                    return  {
                        calculate : calculateResult.data.RetailApiResponse,
                        bank: {}
                    }
                }
                console.log('bank detail', bankdetail)
                  return{
                      calculate:  calculateResult.data.RetailApiResponse,
                    bank: bankdetail.data}
            }

              return{
                  calculate:  calculateResult.data.RetailApiResponse,
                bank: {}
            }

    }

    async namecheck (uid,
        sessiontoken,
        providerid,
        accountno) {
            let nameCheckResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid,providerid, accountno)

            nameCheckResult = await R.post('/RetailTransactionAccountNameCheck', {
                randomguid,
                apiKey: process.env.API_KEY,
                sessiontoken,
                hash,
                Uid:uid,
                Providerid:providerid,
                BenAccountNo:accountno  })
        return nameCheckResult.data.RetailApiResponse

    }

    async submit ({uid,
        sessiontoken,
        fromcountry,
        fromcurrency,
        tocountry,
        tocurrency,
        amount,
        direction,
        service,
        paymentmethod,
        discountcode,
        validateid,
        provider,
        provideritem,
        benfirstname,
        benlastname,
        sendamount,
        receiveamount,
        benmobileno,
        benaccountno,
        benbankname,
        benbic,
        beniban,
        bendob,
        benrouting,
        benidtype,
        benidcountry,
        benidnumber,
        benidissuedate,
        benidexpirydate,
        benaddress,
        benbillref,
        relationshipid,
        reasonid,
        bencity,
        senderaddress1,
        senderaddress2,
        sendercity,
        senderpostcode,
        sendergender,
        senderdob,
        sendernationality,
        senderoccupation,
        senderbirthcountry,
        senderidcountry,
        senderidissuedate,
        senderidexpirydate,
        senderidnumber,
        senderidtype,
        documents
        }) {
            let submitResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid,validateid,
            fromcountry.toLowerCase(),fromcurrency.toLowerCase(),
            tocountry.toLowerCase(),tocurrency.toLowerCase(),service.toLowerCase(),service.toLowerCase())
           let submitResultData = {
            channel: 'app',
            randomguid,
            apiKey: process.env.API_KEY,
            sessiontoken,
            hash,
            Uid:uid,
            fromcountryiso3:fromcountry,
            fromcurrencyiso3:fromcurrency,
            tocountryiso3:tocountry,
            tocurrencyiso3:tocurrency,
            Amount:amount,
            Direction:direction,
            servicecode:service,
            Service:service,
            ServiceCode:service,
            discountcode:discountcode,
            validateid,
            PaymentMethodCode:paymentmethod,
            amount: direction==="S"?sendamount:receiveamount,
            providerid:provider,
            benfirstname,
            benlastname,
            benmobileno,
            benaccountno,
            benbankname,
            benaddress,
            benbillref,
            relationshipid,
            reasonid,
            bencity:bencity? bencity:'City unknown',
            benbic,
            beniban,
            bendob,
            benrouting,
            benidtype,
            benidcountry,
            benidnumber,
            benidissuedate,
            benidexpirydate,
            senderaddress1,
            senderaddress2,
            sendercity,
            senderpostcode,
            sendergender,
            senderdob,
            sendernationality,
            senderoccupation,
            senderbirthcountry,
            senderidcountry,
            senderidissuedate,
            senderidexpirydate,
            senderidnumber,
            senderidtype
        }

        if(provideritem) submitResultData['provideritemid'] = provideritem
        if(documents.length) {
            submitResultData['docs'] = documents
        }
        for(var key in submitResultData){
            if(submitResultData.hasOwnProperty(key) && submitResultData[key] == false){
             delete submitResultData[key];
            }
          }

          submitResult = await R.post('/RetailTransactionSubmit', submitResultData)
          return submitResult.data.RetailApiResponse

    }
    async transactions ({uid,
        sessiontoken,
        startdate,
        enddate
         ,servicecode, reference}) {
        const randomguid = uuid()
        let transactionListQuery = [];
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid)
            let options = {uid,
                sessiontoken,
            datefrom:startdate,
               dateto: enddate
            }
            if(servicecode) options['servicecode']= servicecode
            if(reference) options['tnxref']= reference
            const [error,transactionsResult] = await to(R.post('/RetailAccountTransactionList', {
                randomguid,
                apiKey: process.env.API_KEY,
                hash,
                ...options
               }))
        if(error) return error

        if(!transactionsResult.data.RetailApiResponse.Transactions.length) {
            return [];
        }
        transactionsResult.data.RetailApiResponse.Transactions.map(txn=>{
           let tuuid = uuid();
            let Thash = hasher(tuuid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid)
            let Treq = R.post('/RetailAccountTransactionGet', {
                randomguid:tuuid,
                apiKey: process.env.API_KEY,
                hash:Thash,
                tnxref: txn.TnxRef,
                sessiontoken,
                uid,
            })
            transactionListQuery.push(Treq)
        })
        try {
            const transactionGetResult =  await Promise.all(transactionListQuery);

            const transactionGetResultArray =  transactionGetResult.filter(t=>t.data.RetailApiResponse.ResponseCode === '10000').map(txnGet=>{
                                    return txnGet.data.RetailApiResponse.Transactions[0]
            })
            return transactionGetResultArray
        }catch(e) {
            throw e
        }
        // return transactionsResult.data.RetailApiResponse

    }
    async transaction({uid, sessiontoken, reference }) {

     try {
        let tuuid = uuid();
        let Thash = hasher(tuuid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid, reference)
        let Treq = R.post('/RetailAccountTransactionGet', {
            randomguid:tuuid,
            apiKey: process.env.API_KEY,
            hash:Thash,
            tnxref: reference,
            sessiontoken,
            uid,
        })
        return Treq.data.RetailApiResponse
     }catch(e) {
         throw e
     }

    }

}

module.exports = TransactionService