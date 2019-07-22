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
            console.log('service',service)
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
                Amount:sendamount,
                Direction:direction,
                Service:service,
                discountcode:discountcode,
                isvalidate

            })

            console.log('calculate', calculateResult.data.RetailApiResponse)
            console.log('calculate payment code', calculateResult.data.RetailApiResponse.TransactionCalculate.PaymentMethods)
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
    benaddress,bencity}) {
    
            let submitResult;
        const randomguid = uuid()
        const hash = hasher(randomguid,process.env.PRIVATE_KEY, process.env.API_KEY,sessiontoken,uid,validateid,
            fromcountry.toLowerCase(),fromcurrency.toLowerCase(),
            tocountry.toLowerCase(),tocurrency.toLowerCase(),service.toLowerCase(),service.toLowerCase())
      console.log('benaddress',benaddress)
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
                discountcode:discountcode,
                ValidateId:'3092303',
                PaymentMethodCode:'BANKTRANSFER',
                amount: direction==="S"?sendamount:receiveamount,
                providerid:provider,
                benfirstname,
                benlastname,
                benmobileno,
                benaccountno,
                benbankname,
                benaddress,
                bencity

            })
        console.log('create',submitResult.data.RetailApiResponse)
        return submitResult.data.RetailApiResponse
    
    }

}

module.exports = TransactionService