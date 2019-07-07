const {
    register: registerSchema,
    activate:activateSchema,
    login: loginSchema,

    // corridors: corridorsSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) { 
        fastify.post('/register' , {schema: registerSchema}, registerHandlers )
        fastify.post('/login' , {schema: loginSchema}, loginHandlers )
        fastify.post('/activate' , {schema: activateSchema}, activateHandlers )
    }
  
module.exports[Symbol.for('plugin-meta')] = {
        decorators: {
          fastify: [
            // 'authPreHandler',
            'accessService'
            // 'jwt',
            // 'transformStringIntoObjectId'
          ]
        }
      }
  async function registerHandlers(req,reply) {
    const  {fname,mname,lname,country,mobileno,regtype,businessname,email, pass,issubscribe} = req.body
    const newUser =  await this.accessService.register(fname,mname,lname,country,mobileno,regtype,businessname,email, pass,issubscribe)
    if(newUser.ResponseCode!='10000') {
      throw reply.badRequest(newUser.ResponseMessage)
    }
    return {
        message: newUser.ResponseMessage,
       
    }   
  }

  async function loginHandlers(req,reply) {
    const  {email, pass} = req.body
    const loginUser =  await this.accessService.login(email, pass)
    if(loginUser.ResponseCode!='10000') {
      throw reply.badRequest(loginUser.ResponseMessage)
    }
    return {
      message: loginUser.ResponseMessage,
      uid: loginUser.User.Uid,
      sessiontoken: loginUser.User.SessionToken,
      sessionexpiry: loginUser.User.SessionExpiry
  }    
   
  }

  async function activateHandlers(req,reply) {
    const  {accesstoken} = req.body
    const activateUser =  await this.accessService.activate(accesstoken)
    return {
        message: activateUser.ResponseMessage,
    }   
  }