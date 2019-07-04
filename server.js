// Require the framework and instantiate it
//modules 
require('dotenv').config()

const fp = require('fastify-plugin')
const RHEMITO_PORT = process.env.PORT|| 3000
const StaticService = require('./modules/static/service')
const AccessService = require('./modules/access/service')
// const staticModule = require('./modules/static'); 
const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-sensible'))
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
    if(envError) console.error('envError',envError)
})

/**
 * 
 * add swagger
 */

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schemes: ['http','https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'access', description: 'Access related end-points' },
      { name: 'static', description: 'Static related end-points' }
    ],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  }
}).ready(err => {
  if (err) throw err
  fastify.swagger()
})
/**
 * decorate with serive
 */

async function decorateFastifyInstance(fastify, opts, next){
  const staticService = new StaticService();
  const accessService = new AccessService()
  fastify.decorate('staticService', staticService);
  fastify.decorate('accessService', accessService)
  next()
}
 /**
  * end docuration
  */
 fastify
 .register(fp(decorateFastifyInstance))
 .register(require('./modules/static'), {prefix:'/static'})
 .register(require('./modules/access'), {prefix:'/access'})
// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})



// Run the server!
const start = async () => {
  try {
    await fastify.listen(RHEMITO_PORT,'0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()