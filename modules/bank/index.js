const {
    checkaccount: checkAccountSchema,
    auth: authSchema,
    fundingaccount:fundingAccountSchema,
  } = require('./schemas')
    module.exports= async  function(fastify,opts) {
      fastify.post('/auth' , {schema: authSchema}, authHandler )
      fastify.post('/checkaccount' , {schema: checkAccountSchema}, checkAccountHandler )
      fastify.post('/fundingaccount' , {schema: fundingAccountSchema}, fundAccountHandler )

    }

module.exports[Symbol.for('plugin-meta')] = {
        decorators: {
          fastify: [
            // 'authPreHandler',
            'bankService'
            // 'jwt',
            // 'transformStringIntoObjectId'
          ]
        }
      }
  async function authHandler(req,reply) {
    const countries =  await this.staticService.countries()
    return {
        message: countries.ResponseMessage,
        count: countries.Count,
        countries: countries.Countries
    }
  }
  async function checkAccountHandler(req,reply) {
    const providers =  await this.staticService.providers()
    return {
        message: providers.ResponseMessage,
        count: providers.Count,
        providers: providers.Providers
    }
  }
  async function fundAccountHandler(req,reply) {
   const {provider} = req.body
   const providers =  await this.staticService.subproviders(provider)
    return {
        message: providers.ResponseMessage,
        count: providers.Count,
        subproviders: providers.ProviderItems.map(p=>({
          id:p.Id,
          name:p.Name,
          amount:p.Amount
        }))
    }
  }
