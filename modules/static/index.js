const {
    countries: countriesSchema,
    // corridors: corridorsSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
        fastify.post('/countries' , {schema: countriesSchema}, countriesHandlers )
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
    console.log('country result', countries)
    return {
        message: countries.ResponseMessage,
        count: countries.Count,
        countries: countries.Countries
    }   
  }