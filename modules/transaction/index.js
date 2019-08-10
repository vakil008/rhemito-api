const {
    calculate: calculateSchema,
    nameCheck: nameCheckSchema,
    submit: submitSchema,
    transactions:transactionSchema
     } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
      fastify.post('/calculate' , {schema: calculateSchema}, calculateHandlers )
      fastify.post('/checkaccount' , {schema: nameCheckSchema}, namecheckHandlers )
      fastify.post('/create' , {schema: submitSchema}, submitHandlers )
      fastify.post('/transactions' , {schema: transactionSchema}, transactionsHandler )
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
    let fees = 0;
    if(isvalidate) {
       paymentmethods = calculate.TransactionCalculate.PaymentMethods.map(pm=>({
         fee:pm.Fees,
         code:pm.PaymentMethodCode
       }))
       if(paymentmethods.length) {
         fees = paymentmethods[0].fee
       }
    }  
    return {
        message: calculate.ResponseMessage,
        rate: calculate.TransactionCalculate.Rate,
        sendamount: calculate.TransactionCalculate.SendAmount,
        receiveamount: calculate.TransactionCalculate.ReceiveAmount,
        fromcountry: calculate.TransactionCalculate.FromCountryISO3,
        fromcurrency: calculate.TransactionCalculate. FromCurrencyISO3,
        tocountry: calculate.TransactionCalculate.ToCountryISO3,
        tocurrency: calculate.TransactionCalculate.ToCurrencyISO3,
        validateid: calculate.TransactionCalculate.ValidateId,
        paymentmethods,
        fees,
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

      if(namecheck.ResponseCode!='10000') {
        throw reply.badRequest(create.ResponseMessage)
      }
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
    const transaction = create.Transactions[0]
    return {
        message: create.ResponseMessage,
        rate: transaction.Rate,
        reference: transaction.TxnRef,
        sendamount: transaction.SendAmount,
        receiveamount: transaction.ReceiveAmount,
        fee: transaction.Fees,
        total: transaction.TotalAmountToPay,
        fromcountry: transaction.FromCountryISO3,
        fromcurrency: transaction. FromCurrencyISO3,
        tocountry: transaction.ToCountryISO3,
        tocurrency: transaction.ToCurrencyISO3,
        value: transaction.Value,
        paymenturl: transaction.PaymentUrl
      }   
  }


  async function transactionsHandler(req,reply) {
   
    const transaction =  await this.transactionService.transactions(req.body)
    if(transaction.ResponseCode!='10000') {
      throw reply.badRequest(transaction.ResponseMessage)
    }
    return {
        message: transaction.ResponseMessage,
        count: transaction.Count,
        transactions:transaction.Transactions.map(t=>({
          service:t.Service,
          status:t.Status,
          value:t.Value,
          reference:t.TnxRef,
          date:t.TnxDate,
          currency:t.Currency,
          summary:t.Summary
        }))
      }   
  }