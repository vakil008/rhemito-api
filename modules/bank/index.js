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
    const bankAuth = bank.authenticateUser(email, password);
    console.log('bankAuth', bankAuth)
    return bankAuth;
  }catch(e) {
    throw reply.badRequest(e);
  }
  }
  async function checkAccountHandler(req,reply) {
    try {
      const {userId, currency, amount, token } = req.body;
      const bankAccountCheck = bank.checkCCAccount(userId, currency, amount, token);
      return bankAccountCheck;
    }catch(e) {
      throw reply.badRequest(e);
    }
  }
  async function fundAccountHandler(req,reply) {
    try {
      const {userId, token } = req.body;
      const bankInfo = bank.getFundingAccount(userId, token );
      return bankInfo;
    }catch(e) {
      throw reply.badRequest(e);
    }
  }
