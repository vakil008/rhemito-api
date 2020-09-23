const to  = require('await-to-js').default
const _ = require('lodash')
const {
    calculate: calculateSchema,
    nameCheck: nameCheckSchema,
    submit: submitSchema,
    transactions:transactionsSchema,
    transaction:transactionSchema
     } = require('./schemas')
    module.exports= async  function(fastify,opts) {
      fastify.post('/calculate' , {schema: calculateSchema}, calculateHandlers )
      fastify.post('/checkaccount' , {schema: nameCheckSchema}, namecheckHandlers )
      fastify.post('/create' , {schema: submitSchema}, submitHandlers )
      fastify.post('/transactions' , {schema: transactionsSchema}, transactionsHandler )
      fastify.post('/transaction' , {schema: transactionSchema}, transactionHandler )
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
      isvalidate, banktoken} = req.body
    const {calculate, bank} =  await this.transactionService.calculate({uid,sessiontoken,
      fromcountry,
      fromcurrency,
      tocountry,
      tocurrency,
      amount,
      direction,
      service,
      discountcode,
      isvalidate,
      banktoken})

      if(calculate.ResponseCode!='10000') {
        throw reply.badRequest(calculate.ResponseMessage)
      }
    let paymentmethods = []
    if(isvalidate) {
       paymentmethods = calculate.TransactionCalculate.PaymentMethods.map(pm=>({
         fee:pm.Fees,
         code:pm.PaymentMethodCode
       }))
        // .filter((method) => method.code !=='BANKTRANSFER')


    }
    let docrequirements = [];
    if(calculate.TransactionCalculate.DocId && calculate.TransactionCalculate.DocId !='N' ){
      docrequirements.push({
        key: 'docid',
        value:calculate.TransactionCalculate.DocId
      })
    }
    if(calculate.TransactionCalculate.DocAddress && calculate.TransactionCalculate.DocAddress !='N' ){
      docrequirements.push({
        key: 'docaddress',
        value:calculate.TransactionCalculate.DocAddress
      })
    }

    if(calculate.TransactionCalculate.DocFund && calculate.TransactionCalculate.DocFund !='N' ){
      docrequirements.push({
        key: 'docfund',
        value:calculate.TransactionCalculate.DocFund
      })
    }

    if(calculate.TransactionCalculate.DocOccupation && calculate.TransactionCalculate.DocOccupation !='N' ){
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

    let senderrequirements = [];
   if(calculate.TransactionCalculate.DataSenderAddress1 && calculate.TransactionCalculate.DataSenderAddress1!='N' ){
      senderrequirements.push({
        key: 'datasenderaddress1',
        value:calculate.TransactionCalculate.DataSenderAddress1
      })
    }
    if(calculate.TransactionCalculate.DataSenderAddress2 && calculate.TransactionCalculate.DataSenderAddress2==='M' ){
      senderrequirements.push({
        key: 'datasenderaddress2',
        value:calculate.TransactionCalculate.DataSenderAddress2
      })
    }
    if(calculate.TransactionCalculate.DataSenderCity && calculate.TransactionCalculate.DataSenderCity!='N' ){
      senderrequirements.push({
        key: 'datasendercity',
        value:calculate.TransactionCalculate.DataSenderCity
      })
    }
    if(calculate.TransactionCalculate.DataSenderPostCode && calculate.TransactionCalculate.DataSenderPostCode!='N' ){
      senderrequirements.push({
        key: 'datasenderpostcode',
        value:calculate.TransactionCalculate.DataSenderPostCode
      })
    }
    if(calculate.TransactionCalculate.DataSenderGender && calculate.TransactionCalculate.DataSenderGender!='N' ){
      senderrequirements.push({
        key: 'datasendergender',
        value:calculate.TransactionCalculate.DataSenderGender
      })
    }
    if(calculate.TransactionCalculate.DataSenderDob && calculate.TransactionCalculate.DataSenderDob!='N' ){
      senderrequirements.push({
        key: 'datasenderdob',
        value:calculate.TransactionCalculate.DataSenderDob
      })
    }
    if(calculate.TransactionCalculate.DataSenderNationality && calculate.TransactionCalculate.DataSenderNationality!='N' ){
      senderrequirements.push({
        key: 'datasendernationality',
        value:calculate.TransactionCalculate.DataSenderNationality
      })
    }
    if(calculate.TransactionCalculate.DataSenderOccupation && calculate.TransactionCalculate.DataSenderOccupation!='N' ){
      senderrequirements.push({
        key: 'datasenderoccupation',
        value:calculate.TransactionCalculate.DataSenderOccupation
      })
    }
    if(calculate.TransactionCalculate.DataSenderBirthCountry && calculate.TransactionCalculate.DataSenderBirthCountry!='N' ){
      senderrequirements.push({
        key: 'datasenderbirthcountry',
        value:calculate.TransactionCalculate.DataSenderBirthCountry
      })
    }
    let kycrequirements =[];
    if(calculate.TransactionCalculate.DataSenderIdType && calculate.TransactionCalculate.DataSenderIdType!='N' ){
      kycrequirements.push({
        key: 'datasenderidtype',
        value:calculate.TransactionCalculate.DataSenderIdType
      })
    }
    if(calculate.TransactionCalculate.DataSenderIdNumber && calculate.TransactionCalculate.DataSenderIdNumber!='N' ){
      kycrequirements.push({
        key: 'datasenderidnumber',
        value:calculate.TransactionCalculate.DataSenderIdNumber
      })
    }
    if(calculate.TransactionCalculate.DataSenderIdIssueDate && calculate.TransactionCalculate.DataSenderIdIssueDate!='N' ){
      kycrequirements.push({
        key: 'datasenderidissuedate',
        value:calculate.TransactionCalculate.DataSenderIdIssueDate
      })
    }
    if(calculate.TransactionCalculate.DataSenderIdExpiryDate && calculate.TransactionCalculate.DataSenderIdExpiryDate!='N' ){
      kycrequirements.push({
        key: 'datasenderidexpirydate',
        value:calculate.TransactionCalculate.DataSenderIdExpiryDate
      })
    }
    if(calculate.TransactionCalculate.DataSenderIdCountry && calculate.TransactionCalculate.DataSenderIdCountry!='N' ){
      kycrequirements.push({
        key: 'datasenderidcountry',
        value:calculate.TransactionCalculate.DataSenderIdCountry
      })
    }
     if(['USD', 'GBP', 'EUR'].includes(calculate.TransactionCalculate.ToCurrencyISO3) &&
    calculate.TransactionCalculate.ServiceCode === 'MONEYBANKACCOUNT' ) {
       //find and ensure that
       const otherRequirements = [{ key: 'databencity', value: 'M' },
       { key: 'databenaddress', value: 'M' }]
      datarequirements = _.unionBy(datarequirements, otherRequirements, 'key');
    }
    console.log('bank address', bank);
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
        bankrequirements,
        senderrequirements,
        kycrequirements,
        docregtype: calculate.TransactionCalculate.DocRegType,
        bank
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

  async function transactionHandler(req,reply) {

    const [transactionError,transaction] =  await to(this.transactionService.transaction(req.body))
    if(transactionError) {
      throw reply.badRequest(transactionError)
    }
    return {
        message: 'Success',
        transaction:{
          service:transaction.Service,
          servicecode:transaction.ServiceCode,
          status:transaction.Status,
          value:transaction.Value,
          reference:transaction.TnxRef,
          date:transaction.TnxDate,
          currency:transaction.Currency,
          summary:transaction.Summary,
          fee:transaction.Fees,
          firstname:transaction.BenFirstName,
          lastname:transaction.BenLastName,
          mobile:transaction.BenMobileNo,
          paymentmethod:transaction.PaymentMethod,
          provider:transaction.ProviderId,
          provideritem:transaction.ProviderItemId,
          rate:transaction.Rate,
          reason:transaction.ReasonId,
          relationship:transaction.RelationshipId,
          bank:transaction.BenBankName,
          benaccountno: transaction.BenAccountNo,
          tocurrency : transaction.ToCurrencyISO3,
          fromcurrency:transaction.FromCurrencyISO3,
          fromcountry: transaction.FromCountryISO3,
          tocountry:transaction.ToCountryISO3,
          benbillref: transaction.BenBillRef,
          beniban: transaction.BenIban,
          bencity:transaction.BenCity,
          dob:transaction.BenDob,
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
        }
      }
      }