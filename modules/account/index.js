const to  = require('await-to-js').default
const {
    user: userSchema,
    createbeneficiary: createbeneficiarySchema,
    listbeneficiary: listbeneficiarySchema,
    document: documentSchema,
    ticket: ticketSchema,
    overview: overviewSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) {
      fastify.post('/user', {schema: userSchema}, userHandler )
      fastify.post('/overview', {schema: overviewSchema}, overviewHandler )
      fastify.post('/createbeneficiary' , {schema: createbeneficiarySchema}, createbeneficiaryHandler )
      fastify.post('/beneficiaries' , {schema: listbeneficiarySchema}, listbeneficiaryHandler )
      fastify.post('/document', {schema:documentSchema},documentHandler)
      fastify.post('/ticket', {schema:ticketSchema},ticketHandler);
      // fastify.post('/updateuser' , {schema: providerSchema}, providerHandlers )
      // fastify.post('/updateuserpassword' , {schema: corridorsSchema}, corridorHandlers )
      // fastify.post('/dashboard' , {schema: corridorsSchema}, corridorHandlers )
    }

module.exports[Symbol.for('plugin-meta')] = {
        decorators: {
          fastify: [
            // 'authPreHandler',
            'accountService'
            // 'jwt',
            // 'transformStringIntoObjectId'
          ]
        }
      }
  async function userHandler(req,reply) {
  const  {uid,sessiontoken} = req.body
    const user =  await this.accountService.useraccount(sessiontoken,uid)
    return {
        message: user.ResponseMessage,
        uid: user.Uid,
        uno: user.Uno,
        lastloggedin : user.User.LastLoggedIn,
        firstname: user.User.FName,
        dob: user.User.dob,
        mobileno: user.User.mobileno,
        nationality: user.User.nationality,
        lastname:user.User.LName,
        email:user.User.Email,
        country:user.User.Country,
        postcode: user.User.Postcode,
        countrycode: user.User.CountryIso3,
        balances: user.User.Balances.map(b=>({
          currencycode:b.CurrencyCode,
          amount: b.Amount
        })),
        othercorridors: user.User.othercorridors,
        gender: user.User.Gender
    }
  }

  async function createbeneficiaryHandler(req,reply) {
      const user =  await this.accountService.createBeneficiary(req.body)
      if(user.ResponseCode!='10000') {
        throw reply.badRequest(user.ResponseMessage)
      }
      return {
          message: user.ResponseMessage,
      }
    }


  async function listbeneficiaryHandler(req,reply) {
    const [error,user] = await to(this.accountService.listBeneficiary(req.body))
    if(error) {
      throw reply.badRequest(error)
    }

    return {
      message: 'Success',
      count: user.length,
      contacts: user.map(c=>({
          id:c.ContactId,
          country:c.Country,
          countrycode: c.CountryIso3,
          datecreated:c.DateCreated,
          name:c.Name,
          service:c.Service,
          servicecode:c.ServiceCode,
          reference:c.AccountRef,
          currency:c.CurrencyIso,
          firstname:c.FName,
          lastname:c.LName,
          iban:c.Iban,
          routing:c.Routing,
          provider:c.ProviderId,
          subprovider: c.ProviderItemId,
          swift:c.Swift,
          relationship:c.RelationshipId,
          reason:c.ReasonId,
          active:c.IsActive

        }))
  }
}


  async function documentHandler(req,reply) {
    const [error,document] = await to(this.accountService.addDocument(req.body))
    if(document.ResponseCode!='10000') {
      throw reply.badRequest(document.ResponseMessage)
    }
    return {
        message: document.ResponseMessage,
        docid :document.docid
    }
  }

  async function ticketHandler(req,reply) {
    const [error,ticket] = await to(this.accountService.addTicket(req.body))
    if(error) {
      throw reply.badRequest(error)
    }
    if(ticket.ResponseCode!='10000') {
      throw reply.badRequest(ticket.ResponseMessage)
    }
    return {
        message: ticket.ResponseMessage,
        ticketid :ticket.ticketid
    }
  }

  async function overviewHandler(req,reply) {
    const [error,overview] = await to(this.accountService.overview(req.body))
    if(error) {
      throw reply.badRequest(error)
    }
    if(overview.ResponseCode!='10000') {
      throw reply.badRequest(overview.ResponseMessage)
    }
    console.log('overview', overview);
    return {
        message: overview.ResponseMessage,
        overview: {
          recentrecipient: overview.recentrecipient,
          recenttransaction: overview.recenttransaction
        }
    }
  }