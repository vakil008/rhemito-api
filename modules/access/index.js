const {
    register: registerSchema,
    activate:activateSchema,
    login: loginSchema,
    reset: resetSchema,
    validate: validateSchema,
    confirm: confirmSchema,
    // corridors: corridorsSchema,
    // search: searchSchema,
    // getProfile: getProfileSchema
  } = require('./schemas')
    module.exports= async  function(fastify,opts) {
        fastify.post('/register' , {schema: registerSchema}, registerHandlers )
        fastify.post('/login' , {schema: loginSchema}, loginHandlers )
        fastify.post('/activate' , {schema: activateSchema}, activateHandlers )
        fastify.post('/reset' , {schema: resetSchema}, passwordResetHandler )
        fastify.post('/validate' , {schema: validateSchema}, passwordValidateHandler )
        fastify.post('/confirm' , {schema: confirmSchema}, passwordConfirmHandler )
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
    const  {firstname,middlename,lastname,country,mobileno,regtype,businessname,email, pass,issubscribe} = req.body
    const newUser =  await this.accessService.register(firstname,middlename,lastname,country,mobileno,regtype,businessname,email, pass,issubscribe)
    if(newUser.ResponseCode!='10000') {
      throw reply.badRequest(newUser.ResponseMessage)
    }
    return {
        message: newUser.ResponseMessage,

    }
  }

  async function loginHandlers(req,reply) {
    const  {email, pass} = req.body
    const {loginUser, bankToken } =  await this.accessService.login(email, pass)
    if(loginUser.ResponseCode!='10000') {
      throw reply.badRequest(loginUser.ResponseMessage)
    }
    return {
      message: loginUser.ResponseMessage,
      uid: loginUser.User.Uid,
      bankToken,
      sessiontoken: loginUser.User.SessionToken,
      sessionexpiry: loginUser.User.SessionExpiry
  }

  }

  async function activateHandlers(req,reply) {
    const  {accesstoken} = req.body
    const activateUser =  await this.accessService.activate(accesstoken)
    if(activateUser.ResponseCode!='10000') {
      throw reply.badRequest(activateUser.ResponseMessage)
    }
    return {
        message: activateUser.ResponseMessage,
    }
  }

  async function passwordResetHandler(req,reply) {
    const  {email} = req.body
    const resetPassword =  await this.accessService.reset(email)
    if(resetPassword.ResponseCode!='10000') {
      throw reply.badRequest(resetPassword.ResponseMessage)
    }
    return {
        message: resetPassword.ResponseMessage,
    }
  }

  async function passwordValidateHandler(req,reply) {
    const  {accesstoken} = req.body
    const validatePassword =  await this.accessService.validate(accesstoken)
    if(validatePassword.ResponseCode!='10000') {
      throw reply.badRequest(validatePassword.ResponseMessage)
    }
    return {
        message: validatePassword.ResponseMessage,
    }
  }
  async function passwordConfirmHandler(req,reply) {
    const  {accesstoken,pass,email} = req.body
    const confirmPassword =  await this.accessService.confirm(accesstoken,email,pass)
    if(confirmPassword.ResponseCode!='10000') {
      throw reply.badRequest(confirmPassword.ResponseMessage)
    }
    return {
        message: confirmPassword.ResponseMessage,
    }
  }