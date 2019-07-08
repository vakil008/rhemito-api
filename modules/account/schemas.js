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
const user = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      properties: {
        uid: {
          type: 'string'
        },
          sessiontoken: {
            type: 'string'
          },
      } ,
      additionalProperties: false
    },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        required: [ 'message' ],
        properties: {
          message: { type: 'string' },
          uid: {type:'string'},
          uno: {type:'string'},
          lastloggedin: {type:'string'},
          firstname: {type:'string'},
          lastname: {type:'string'},
          email: {type:'string'},
          country: {type:'string'},
        },
        additionalProperties: false
      }
    }
  }
  
  const corridors = {
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
          corridors: {type:'array',
        items: {
            type:'object',
            properties : {
      CorridorCode:{ type: 'string' },
       FromCountryISO3:{ type: 'string' },
       FromCountryName:{ type: 'string' },
       fromCurrencyISO3:{ type: 'string' },
       ToCountryISO3 :{ type: 'string' },
       TOCountryName :{ type: 'string' },
       ToCurrencyISO3 :{ type: 'string' }, 
       IsCanReceiveAirtime:{ type: 'boolean' },
       IsCanReceiveBillPay:{ type: 'boolean' },
       IsCanReceiveMoneyBank:{ type: 'boolean' },
       IsCanReceiveMoneyCash:{ type: 'boolean' },
       IsCanReceiveMoneyMobile:{ type: 'boolean' },
       MinSendValue: {type:'number'},
       MaxSendValue: {type:'number'},
       MinReceiveValue: {type:'number'},
       MaxReceiveValue: {type:'number'},
       
            }
        } }
        },
        additionalProperties: false
      }
    }
  }
  const providers = {
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
          providers: {type:'array',
        items: {
            type:'object',
            properties : {
       Id: { type: 'string' },
       Name:{ type: 'string' },
       CountryISO3:{ type: 'string' },
       IsCanReceiveAirtime:{ type: 'boolean' },
       IsCanReceiveBillPay:{ type: 'boolean' },
       IsCanReceiveMoneyBank:{ type: 'boolean' },
       IsCanReceiveMoneyCash:{ type: 'boolean' },
       IsCanReceiveMoneyMobile:{ type: 'boolean' },
            }
        } }
        },
        additionalProperties: false
      }
    }
  }
  module.exports =  { 
      user
  }