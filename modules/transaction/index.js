const {
    calculate: calculateSchema,
    providers: providerSchema
    // corridors: corridorsSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
      fastify.post('/calculate' , {schema: calculateSchema}, calculateHandlers )
      // fastify.post('/checkaccount' , {schema: providerSchema}, providerHandlers )
      // fastify.post('/create' , {schema: providerSchema}, providerHandlers )
    }
  
module.exports[Symbol.for('plugin-meta')] = {
        decorators: {
          fastify: [
            // 'authPreHandler',
            'transactionService'
            // 'jwt',
            // 'transformStringIntoObjectId'
          ]
        }
      }
  async function calculateHandlers(req,reply) {
    const { uid,
       sessiontoken,
      fromcountry,
      fromcurrency,
      tocountry,
      tocurrency,
      amount,
      direction,
      service,
      discountcode,
      isvalidate} = req.body
    const calculate =  await this.transactionService.calculate(uid,sessiontoken,
      fromcountry,
      fromcurrency,
      tocountry,
      tocurrency,
      amount,
      direction,
      service,
      discountcode,
      isvalidate)
    
    return {
        message: calculate.ResponseMessage,
        rate: calculate.TransactionCalculate.Rate,
        sendamount: calculate.TransactionCalculate.SendAmount,
        receiveamount: calculate.TransactionCalculate.ReceiveAmount,
        sendcountry: calculate.TransactionCalculate.FromCountryISO3,
        sendcurrency: calculate.TransactionCalculate. FromCurrencyISO3,
        receivecountry: calculate.TransactionCalculate.ToCountryISO3,
        receivecurrency: calculate.TransactionCalculate.ToCurrencyISO3,
          // calculate: calculate.Countries
    }   
  }
  async function providerHandlers(req,reply) {
    const providers =  await this.staticService.providers()
    return {
        message: providers.ResponseMessage,
        count: providers.Count,
        providers: providers.Providers
    }   
  }