const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')
const to  = require('await-to-js').default
class  TransactionService { 
  
    async calculate (uid,
        sessiontoken,
        fromcountry,
        fromcurrency,
        tocountry,
        tocurrency,
        amount,
        direction,
        service,
        discountcode,
        isvalidate) {
    
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
           return calculateResult.data.RetailApiResponse
    
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
    benaddress,
    benbillref,
    relationshipid,
    reasonid,bencity}) {
    
            let submitResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid,validateid,
            fromcountry.toLowerCase(),fromcurrency.toLowerCase(),
            tocountry.toLowerCase(),tocurrency.toLowerCase(),service.toLowerCase(),service.toLowerCase())
           let submitResultData = {
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
            bencity

        }
        if(provideritem) submitResultData['provideritemid'] = provideritem
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
            let options = {Uid:uid,
                sessiontoken,
            datefrom:startdate,
               dateto: enddate}
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
            let Thash = hasher(tuuid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid, txn.TnxRef)
            let Treq = R.post('/RetailAccountTransactionGet', {
                randomguid:tuuid,
                apiKey: process.env.API_KEY, 
                hash:Thash,
                tnxref: txn.TnxRef,
                sessiontoken,
                Uid:uid,
            })
            transactionListQuery.push(Treq)
        })
        const transactionGetResult =  await Promise.all(transactionListQuery);

        const transactionGetResultArray =  transactionGetResult.filter(t=>t.data.RetailApiResponse.ResponseCode === '10000').map(txnGet=>{

            return txnGet.data.RetailApiResponse.Transactions[0]
        })
        return transactionGetResultArray
        // return transactionsResult.data.RetailApiResponse
    
    }

}

module.exports = TransactionService