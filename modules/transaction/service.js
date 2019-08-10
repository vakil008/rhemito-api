const  {R , hasher}  =  require('../../lib/api')
const uuid = require('uuid/v4')

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
            console.log('account no', accountno)
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
        console.log('namecheck',nameCheckResult.data.RetailApiResponse)
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
        benfirstname,
        benlastname,
        sendamount,
        receiveamount,
        benmobileno,
        benaccountno,
        benbankname,
    benaddress,
    relationshipid,
    reasonid,bencity}) {
    
            let submitResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid,validateid,
            fromcountry.toLowerCase(),fromcurrency.toLowerCase(),
            tocountry.toLowerCase(),tocurrency.toLowerCase(),service.toLowerCase(),service.toLowerCase())
            submitResult = await R.post('/RetailTransactionSubmit', {
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
                relationshipid,
                reasonid,
                bencity

            })
        console.log('create',submitResult.data.RetailApiResponse)
        return submitResult.data.RetailApiResponse
    
    }
    async transactions ({uid,
        sessiontoken,
        startdate,
        enddate
         ,servicecode, reference}) {
            let transactionsResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid)
            let options = {Uid:uid,
                sessiontoken,
            datefrom:startdate,
               dateto: enddate}
            if(servicecode) options['servicecode']= servicecode
            if(reference) options['tnxref']= reference
            transactionsResult = await R.post('/RetailAccountTransactionList', {
                randomguid,
                apiKey: process.env.API_KEY, 
                hash,
                ...options
               })
        return transactionsResult.data.RetailApiResponse
    
    }

}

module.exports = TransactionService