const auth = {
  // This jsonschema will be used for data validation
  body: {
    type: 'object',
    properties: {
      username: {type: 'string'},
      password: {type: 'string'}
    },
    additionalProperties: true,
  },
  response: {
    // The 200 body response is described
    // by the following schema
    200: {
      type: 'object',
      required: ['message'],
      properties: {
        id: {type: 'string'},
      },
      additionalProperties: false,
    },
  },
};
  const checkaccount = {
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
       FromCurrencyISO3:{ type: 'string' },
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
  const fundingaccount = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      properties: {
        provider: {type:'string'}
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
          count: {type:'number'},
          subproviders: {type:'array',
        items: {
            type:'object',
            properties : {
       id: { type: 'string' },
       name:{ type: 'string' },
       amount:{ type: 'number' },
            }
        } }
        },
        additionalProperties: false
      }
    }
  }

  module.exports =  {
      auth,
      checkaccount,
      fundingaccount
  }