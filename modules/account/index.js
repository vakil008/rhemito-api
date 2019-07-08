const {
    user: userSchema,
    // providers: providerSchema,
    // corridors: corridorsSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
      fastify.post('/user' , {schema: userSchema}, userHandler )
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
        lastname:user.User.LName,
        email:user.User.Email,
        country:user.User.Country
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