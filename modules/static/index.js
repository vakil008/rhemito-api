const {
    countries: countriesSchema,
    providers: providerSchema,
    corridors: corridorsSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
      fastify.post('/countries' , {schema: countriesSchema}, countriesHandlers )
      fastify.post('/providers' , {schema: providerSchema}, providerHandlers )
      fastify.post('/corridors' , {schema: corridorsSchema}, corridorHandlers )
    }
  
module.exports[Symbol.for('plugin-meta')] = {
        decorators: {
          fastify: [
            // 'authPreHandler',
            'staticService'
            // 'jwt',
            // 'transformStringIntoObjectId'
          ]
        }
      }
  async function countriesHandlers(req,reply) {
    const countries =  await this.staticService.countries()
    return {
        message: countries.ResponseMessage,
        count: countries.Count,
        countries: countries.Countries
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
  async function corridorHandlers(req,reply) {
    const corridors =  await this.staticService.corridors()
    return {
        message: corridors.ResponseMessage,
        count: corridors.Count,
        corridors: corridors.Corridors
    }   
  }