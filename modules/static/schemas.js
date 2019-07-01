const requestProperties ={
    apiKey: {
      type: 'string'
    },
    randomguid: {
      type: 'string'
    },
      hash: {
        type: 'string'
      },
  
  }
const countries = {
    // This jsonschema will be used for data validation
    // body: {
    //   type: 'object',
    //   properties: requestProperties ,
    //   additionalProperties: false
    // },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        required: [ 'message' ],
        properties: {
          message: { type: 'string' },
          count: {type:'number'},
          countries: {type:'array',
        items: {
            type:'object',
            properties : {
       CountryId: { type: 'string' },
       ISO2:{ type: 'string' },
       ISO3:{ type: 'string' },
       Idd:{ type: 'string' },
       IsCanNameCheck:{ type: 'boolean' },
       IsCanRegister:{ type: 'boolean' },
       Name:{ type: 'string' }
            }
        } }
        },
        additionalProperties: false
      }
    }
  }
  

  module.exports =  { 
      countries
  }