const bank = require('../../lib/bank')
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
  try {
    const {email, password } = req.body
    const bankAuth = await bank.authenticateUser(email, password);
    console.log('bankAuth', bankAuth)
    return bankAuth.data.data;
  }catch(e) {
    throw reply.badRequest(e);
  }
  }
  async function checkAccountHandler(req,reply) {
    try {
      const {userId, currency, amount, token } = req.body;
      const bankAccountCheck = await bank.checkCCAccount(userId, currency, amount, token);
      return bankAccountCheck.data.data;
    }catch(e) {
      throw reply.badRequest(e);
    }
  }
  async function fundAccountHandler(req,reply) {
    try {
      const {userId, token } = req.body;
      const bankInfo = await bank.getFundingAccount(userId, token );
      return bankInfo.data.data;
    }catch(e) {
      throw reply.badRequest(e);
    }
  }
