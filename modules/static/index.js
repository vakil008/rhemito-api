const {
    countries: countriesSchema,
    providers: providerSchema,
    corridors: corridorsSchema,
    relationships: relationshipsSchema,
    reasons: reasonsSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
      fastify.post('/countries' , {schema: countriesSchema}, countriesHandlers )
      fastify.post('/providers' , {schema: providerSchema}, providerHandlers )
      fastify.post('/corridors' , {schema: corridorsSchema}, corridorHandlers )
      fastify.post('/relationships' , {schema: relationshipsSchema}, relationshipHandlers )
      fastify.post('/reasons' , {schema: reasonsSchema}, reasonHandlers )
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
  async function relationshipHandlers(req,reply) {
    const relationships =  await this.staticService.relationships()
    return {
        message: relationships.ResponseMessage,
        count: relationships.Count,
        relationships: relationships.Relationships.map(rl=>({
          name:rl.Name,
          id:rl.Id
        }))
    }   
  }

  async function reasonHandlers(req,reply) {
    const reasons =  await this.staticService.reasons()
    return {
        message: reasons.ResponseMessage,
        count: reasons.Count,
        reasons: reasons.Reasons.map(re=>({
          name:re.Name,
          id:re.Id
        }))
    }   
  }
