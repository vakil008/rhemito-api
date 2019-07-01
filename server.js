// Require the framework and instantiate it
//modules 
require('dotenv').config()
const fp = require('fastify-plugin')

const StaticService = require('./modules/static/service')
// const staticModule = require('./modules/static'); 
const fastify = require('fastify')({ logger: true })

const fastifyEnv = require('fastify-env')
//configure env files
const env_schema =  { 
    type:'object', 
    required: ['RHEMITO_URL', 'API_KEY', 'PRIVATE_KEY'],
    properties:{
        RHEMITO_URL:{
            type:'string',
            default: 'https://apifurp.phasestreamtest.com/BusinessApi.svc/json'
        },
        API_KEY:{
          type:'string',
        },
      PRIVATE_KEY:{
        type:'string',
          }
    }
}

 const envOptions = {
     configKey: 'config',
     schema: env_schema,
     dotenv:true

 }
fastify.register(fastifyEnv, envOptions)
.ready(envError => {

console.log('config', fastify.config)
    if(envError) console.error('envError',envError)
})

/**
 * decorate with serive
 */
async function decorateFastifyInstance(fastify, opts, next){
  const staticService = new StaticService();
  fastify.decorate('staticService', staticService)
  next()
}
 /**
  * end docuration
  */
 fastify
 .register(fp(decorateFastifyInstance))
 .register(require('./modules/static'), {prefix:'/static'})
// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})



// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT|| 3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()