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

   

}

module.exports = TransactionService