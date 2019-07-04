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
    const  {fname,mname,lname,country,mobileno,regtype,businesname,email, pass,issubscribe} = req.body
    const newUser =  await this.accessService.register(fname,mname,lname,country,mobileno,regtype,businesname,email, pass,issubscribe)
    console.log('new user', newUser)
    return {
        message: newUser.ResponseMessage,
       
    }   
  }

  async function loginHandlers(req,reply) {
    const  {email, pass} = req.body
    const loginUser =  await this.accessService.login(email, pass)
    console.log('login user', loginUser)
    return {
        message: loginUser.ResponseMessage,
        uid: loginUser.uid,
        sessiontoken: loginUser.sessiontoken,
        sessionexpiry: loginUser.sessionexpiry
    }   
  }

  async function activateHandlers(req,reply) {
    const  {accesstoken} = req.body
    const activateUser =  await this.accessService.activate(accesstoken)
    console.log('login user', activateUser)
    return {
        message: activateUser.ResponseMessage,
    }   
  }