const to  = require('await-to-js').default
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
    let paymentmethods = []
    if(isvalidate) {
       paymentmethods = calculate.TransactionCalculate.PaymentMethods.map(pm=>({
         fee:pm.Fees,
         code:pm.PaymentMethodCode
       }))

    }
    let docrequirements = [];
    if(calculate.TransactionCalculate.DocId && calculate.TransactionCalculate.DocId!='N' ){
      docrequirements.push({
        key: 'docid',
        value:calculate.TransactionCalculate.DocId
      })
    }
    if(calculate.TransactionCalculate.DocAddress && calculate.TransactionCalculate.DocAddress!='N' ){
      docrequirements.push({
        key: 'docaddress',
        value:calculate.TransactionCalculate.DocAddress
      })
    }

    if(calculate.TransactionCalculate.DocFund && calculate.TransactionCalculate.DocFund!='N' ){
      docrequirements.push({
        key: 'docfund',
        value:calculate.TransactionCalculate.DocFund
      })
    }

    if(calculate.TransactionCalculate.DocOccupation && calculate.TransactionCalculate.DocOccupation!='N' ){
      docrequirements.push({
        key: 'dococcupation',
        value:calculate.TransactionCalculate.DocOccupation
      })
    }
    let bankrequirements = [];

    if(calculate.TransactionCalculate.DataBankBic && calculate.TransactionCalculate.DataBankBic!='N' ){
      bankrequirements.push({
        key: 'databankbic',
        value:calculate.TransactionCalculate.DataBankBic
      })
    }
    if(calculate.TransactionCalculate.DataBankIban && calculate.TransactionCalculate.DataBankIban!='N' ){
      bankrequirements.push({
        key: 'databankiban',
        value:calculate.TransactionCalculate.DataBankIban
      })
    }

    if(calculate.TransactionCalculate.DataBankRouting && calculate.TransactionCalculate.DataBankRouting!='N' ){
      bankrequirements.push({
        key: 'databankrouting',
        value:calculate.TransactionCalculate.DataBankRouting
      })
    }
    if(calculate.TransactionCalculate.DataBankAccNo && calculate.TransactionCalculate.DataBankAccNo!='N' ){
      bankrequirements.push({
        key: 'databankaccno',
        value:calculate.TransactionCalculate.DataBankAccNo
      })
    }

    if(calculate.TransactionCalculate.DataBankName && calculate.TransactionCalculate.DataBankName!='N' ){
      bankrequirements.push({
        key: 'databankname',
        value:calculate.TransactionCalculate.DataBankName
      })
    }

    if(calculate.TransactionCalculate.DataBankAddress && calculate.TransactionCalculate.DataBankAddress!='N' ){
      bankrequirements.push({
        key: 'databankaddress',
        value:calculate.TransactionCalculate.DataBankAddress
      })
    }
    let datarequirements = [];


    if(calculate.TransactionCalculate.DataBenAddress && calculate.TransactionCalculate.DataBenAddress!='N' ){
      datarequirements.push({
        key: 'databenaddress',
        value:calculate.TransactionCalculate.DataBenAddress
      })
    }

    if(calculate.TransactionCalculate.DataBenCity && calculate.TransactionCalculate.DataBenCity!='N' ){
      datarequirements.push({
        key: 'databencity',
        value:calculate.TransactionCalculate.DataBenCity
      })
    }

    if(calculate.TransactionCalculate.DataBenDob && calculate.TransactionCalculate.DataBenDob!='N' ){
      datarequirements.push({
        key: 'databendob',
        value:calculate.TransactionCalculate.DataBenDob
      })
    }
    if(calculate.TransactionCalculate.DataBenIdCountry && calculate.TransactionCalculate.DataBenIdCountry!='N' ){
      datarequirements.push({
        key: 'databenidcountry',
        value:calculate.TransactionCalculate.DataBenIdCountry
      })
    }
    if(calculate.TransactionCalculate.DataBenIdExpiryDate && calculate.TransactionCalculate.DataBenIdExpiryDate!='N' ){
      datarequirements.push({
        key: 'databenidexpirydate',
        value:calculate.TransactionCalculate.DataBenIdExpiryDate
      })
    }
    if(calculate.TransactionCalculate.DataBenIdIssueDate && calculate.TransactionCalculate.DataBenIdIssueDate!='N' ){
      datarequirements.push({
        key: 'databenidissuedate',
        value:calculate.TransactionCalculate.DataBenIdIssueDate
      })
    }
    if(calculate.TransactionCalculate.DataBenIdNumber && calculate.TransactionCalculate.DataBenIdNumber!='N' ){
      datarequirements.push({
        key: 'databenidnumber',
        value:calculate.TransactionCalculate.DataBenIdNumber
      })
    }
    if(calculate.TransactionCalculate.DataBenIdType && calculate.TransactionCalculate.DataBenIdType!='N' ){
      datarequirements.push({
        key: 'databenidtype',
        value:calculate.TransactionCalculate.DataBenIdType
      })
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
        fees: calculate.TransactionCalculate.CommissionAmount,
        servicecode: calculate.TransactionCalculate.ServiceCode,
        docrequirements,
        datarequirements,
        bankrequirements
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

    const create =  await this.transactionService.submit(req.body)
    if(create.ResponseCode!='10000') {
      throw reply.badRequest(create.ResponseMessage)
    }
    const transaction = create.Transactions[0]
    return {
        message: create.ResponseMessage,
        rate: transaction.Rate,
        reference: transaction.TnxRef,
        accountreference: transaction.Uno,
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

    const [transactionError,transaction] =  await to(this.transactionService.transactions(req.body))
    if(transactionError) {
      throw reply.badRequest(transactionError)
    }
    return {
        message: 'Success',
        count: transaction.length,
        transactions:transaction.map(t=>({
          service:t.Service,
          servicecode:t.ServiceCode,
          status:t.Status,
          value:t.Value,
          reference:t.TnxRef,
          date:t.TnxDate,
          currency:t.Currency,
          summary:t.Summary,
          fee:t.Fees,
          firstname:t.BenFirstName,
          lastname:t.BenLastName,
          mobile:t.BenMobileNo,
          paymentmethod:t.PaymentMethod,
          provider:t.ProviderId,
          provideritem:t.ProviderItemId,
          rate:t.Rate,
          reason:t.ReasonId,
          relationship:t.RelationshipId,
          bank:t.BenBankName,
          benaccountno: t.BenAccountNo,
          tocurrency : t.ToCurrencyISO3,
          fromcurrency:t.FromCurrencyISO3,
          fromcountry: t.FromCountryISO3,
          tocountry:t.ToCountryISO3,
          benbillref: t.BenBillRef,
          beniban: t.BenIban,
          bencity:t.BenCity,
          dob:t.BenDob,
          // documents:{
          //  type:"array",
          //  items: {
          //    doctitle:{ type: 'string' },
          //    doctype:{ type: 'string' },
          //    docformat:{ type: 'string' },
          //    dateuploaded:{ type: 'string' },
          //    active:{ type: 'boolean' },


          //  }
          // }
        }))
      }
  }