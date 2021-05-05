const {
    countries: countriesSchema,
    providers: providerSchema,
    subproviders:subProviderSchema,
    corridors: corridorsSchema,
    relationships: relationshipsSchema,
    reasons: reasonsSchema,
    doctypes:doctypesSchema,
    tickettypes: tickettypesSchema,
    occupations: occupationsSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) {
      fastify.post('/countries' , {schema: countriesSchema}, countriesHandlers )
      fastify.post('/providers' , {schema: providerSchema}, providerHandlers )
      fastify.post('/subproviders' , {schema: subProviderSchema}, subProviderHandlers )
      fastify.post('/corridors' , {schema: corridorsSchema}, corridorHandlers )
      fastify.post('/relationships' , {schema: relationshipsSchema}, relationshipHandlers )
      fastify.post('/reasons' , {schema: reasonsSchema}, reasonHandlers )
      fastify.post('/doctypes' , {schema: doctypesSchema}, doctypeHandlers )
      fastify.post('/occupations' , {schema: occupationsSchema}, occupationHandlers )
      fastify.post('/tickettypes' , {schema: tickettypesSchema}, ticketTypeHandlers )
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
  async function subProviderHandlers(req,reply) {
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
  async function corridorHandlers(req,reply) {
    const cutoff = 232150;
    const optin = ['210145', '230284']
    const {
      body: {
        uno
      }
    } = req
   try {
    const corridors =  await this.staticService.corridors()

    if(!uno) {
      return {
        message: corridors.ResponseMessage,
        count: corridors.Count,
        corridors: corridors.Corridors
    }
    }
      const refinedCorridors = corridors?.Corridors?.filter(cor => {
      
        if(cor.ToCurrencyISO3 ==='NGN' && !optin.includes(uno)){
          if(parseInt(uno) < cutoff) return true;
          return false;
        }
        return true;
      })
     return {
        message: corridors.ResponseMessage,
        count: corridors.Count,
        corridors: refinedCorridors
    }
    }catch(error) {
      console.log('erro', error);
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

  async function occupationHandlers(req,reply) {
    const occupations =  await this.staticService.occupations()
    return {
        message: occupations.ResponseMessage,
        count: occupations.Count,
        occupations: occupations.Occupations.map(oc=>({
          name:oc.Name,
          id:oc.Id
        }))
    }
  }

  async function doctypeHandlers(req,reply) {
    const doctypes =  await this.staticService.doctypes()
    return {
        message: doctypes.ResponseMessage,
        count: doctypes.Count,
        documenttypes: doctypes.DocumentTypes.map(dt=>{
          return {
          name:dt.Name,
          id:dt.Id,
          isapplyindividual:dt.IsApplyIndividual,
          isapplycompany:dt.IsApplyCompany,
          isapplyid:dt.IsApplyId,
          isapplyaddress:dt.IsApplyAddress,
          isapplyoccupation:dt.IsApplyOccupation,
          isapplyfund:dt.IsApplyFund,


        }})
    }

  }

  async function ticketTypeHandlers(req,reply) {
    const ticketTypes =  await this.staticService.ticketTypes()
    return {
        message: ticketTypes.ResponseMessage,
        count: ticketTypes.Count,
        tickettypes: ticketTypes.TicketCategoryTypes.map(re=>({
          name:re.Name,
          id:re.Id
        }))
    }
  }