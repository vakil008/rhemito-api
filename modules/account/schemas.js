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
          postcode:{type:'string'},
          countrycode: {type:'string'},
          balances: {type:'array',
        items: {
            type:'object',
            properties : {
      currencycode:{ type: 'string' },
       amount:{ type: 'number' },
         }
        } },
          gender: {type:'string'},
          mobileno: {type:'string'},
          dob: {type:'string'},
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

  const beneficiaries = {
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
          firstname: {type:'string'},
          lastname: {type:'string'},
          country: {type:'string'},
          currency: {type:'string'},
          servicecode: {type:'string'},
          reasonid: {type:'string'},
          reason: {type:'string'},
          relationshipid: {type:'string'},
          relationship: {type:'string'},
          providerid: {type:'string'},
          provider:{type:'string'},
          provideritemid: {type:'string'},
          provideritem: {type:'string'},
          reference : {type:'string'},
          ibank: {type:'string'},
          swift: {type:'string'},
          routing: {type:'string'},
          date: {type:'string'},
          active:{type:'boolean'}
        },
        additionalProperties: false
      }
    }
  }
  const beneficiary = {
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
          firstname: {type:'string'},
          lastname: {type:'string'},
          country: {type:'string'},
          currency: {type:'string'},
          servicecode: {type:'string'},
          reasonid: {type:'string'},
          reason: {type:'string'},
          relationshipid: {type:'string'},
          relationship: {type:'string'},
          providerid: {type:'string'},
          provider:{type:'string'},
          provideritemid: {type:'string'},
          provideritem: {type:'string'},
          reference : {type:'string'},
          ibank: {type:'string'},
          swift: {type:'string'},
          routing: {type:'string'},
          date: {type:'string'},
          active:{type:'boolean'}
        },
        additionalProperties: false
      }
    }
  }
  const createbeneficiary = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required:[
        'uid','sessiontoken','firstname','lastname','active','deleted',
        'service','country','currency','provider',
        'account'
      ],
      properties: {
        uid: { type: 'string' },
        sessiontoken: { type: 'string' },
        contact:{type:'string'},
         firstname: {type:'string'},
          lastname: {type:'string'},
          account: {type:'string'},
          active: {type:'integer'},
          deleted: {type:'integer'},
          service: {type:'string'},
          country: {type:'string'},
          currency: {type:'string'},
          reason: {type:'string'},
          relationship: {type:'string'},
          provider: {type:'string'},
          provideritem: {type:'string'},
          reference: {type:'string'},
          iban: {type:'string'},
          swift: {type:'string'},
          routing: {type:'string'},
          providername: {type:'string'}
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
          
        },
        additionalProperties: false
      }
    }
  } 
  const listbeneficiary = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required:[
        'uid','sessiontoken',
        'service','country'
      ],
      properties: {
        uid: { type: 'string' },
        sessiontoken: { type: 'string' },
          service: {type:'string'},
          country: {type:'string'}
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
          contacts:{
            type:'array',
            items:{
              type:'object',
              properties: {
                id:{ type: 'string' },
                name:{ type: 'string' },
                country:{ type: 'string' },
                countrycode:{ type: 'string' },
                service:{ type: 'string' },
                servicecode:{ type: 'string' },
                datecreated:{ type: 'string' },
                active:{ type: 'string' }
              }
            }
          }
          
        },
        additionalProperties: false
      }
    }
  } 
  module.exports =  { 
      user,
      createbeneficiary,
      listbeneficiary
  }

  