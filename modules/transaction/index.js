const {
    calculate: calculateSchema,
    nameCheck: nameCheckSchema,
    submit: submitSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
      fastify.post('/calculate' , {schema: calculateSchema}, calculateHandlers )
      fastify.post('/checkaccount' , {schema: nameCheckSchema}, namecheckHandlers )
      fastify.post('/create' , {schema: submitSchema}, submitHandlers )
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
    
      if(calculate.ResponseCode!='10000') {
        throw reply.badRequest(calculate.ResponseMessage)
      }
    let paymentmethods = null 

    if(isvalidate) {
       paymentmethods = calculate.TransactionCalculate.PaymentMethods.map(pm=>({
         fee:pm.Fees,
         code:pm.PaymentMethodCode
       }))
    }  
    return {
        message: calculate.ResponseMessage,
        rate: calculate.TransactionCalculate.Rate,
        sendamount: calculate.TransactionCalculate.SendAmount,
        receiveamount: calculate.TransactionCalculate.ReceiveAmount,
        sendcountry: calculate.TransactionCalculate.FromCountryISO3,
        sendcurrency: calculate.TransactionCalculate. FromCurrencyISO3,
        receivecountry: calculate.TransactionCalculate.ToCountryISO3,
        receivecurrency: calculate.TransactionCalculate.ToCurrencyISO3,
        validateid: calculate.TransactionCalculate.ValidateId,
        paymentmethods,
        servicecode: calculate.TransactionCalculate.ServiceCode

          // calculate: calculate.Countries
    }   
  }

  async function namecheckHandlers(req,reply) {
    const { uid,
       sessiontoken,
      providerid,
      accountno,
     } = req.body
    const namecheck =  await this.transactionService.namecheck(uid,sessiontoken,
      providerid,
      accountno)
    return {
        message: namecheck.ResponseMessage,
       
    }   
  }



  async function submitHandlers(req,reply) {
    console.log('body',req.body)
  
  
    const create =  await this.transactionService.submit(req.body)
    if(create.ResponseCode!='10000') {
      throw reply.badRequest(create.ResponseMessage)
    }
    return {
        message: create.ResponseMessage,
        rate: create.Transactioncreate.Rate,
        sendamount: create.Transactioncreate.SendAmount,
        receiveamount: create.Transactioncreate.ReceiveAmount,
        sendcountry: create.Transactioncreate.FromCountryISO3,
        sendcurrency: create.Transactioncreate. FromCurrencyISO3,
        receivecountry: create.Transactioncreate.ToCountryISO3,
        receivecurrency: create.Transactioncreate.ToCurrencyISO3,
          // calculate: calculate.Countries
    }   
  }