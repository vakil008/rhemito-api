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
  const subproviders = {
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
  const relationships = {
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
          relationships: {type:'array',
        items: {
            type:'object',
            properties : {
      id:{ type: 'string' },
       name:{ type: 'string' },
         }
        } }
        },
        additionalProperties: false
      }
    }
  }
  const reasons = {
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
          reasons: {type:'array',
        items: {
            type:'object',
            properties : {
      id:{ type: 'string' },
       name:{ type: 'string' },
         }
        } }
        },
        additionalProperties: false
      }
    }
  }
  const reasons = {
    // This jsonschema will be used for data validation
    // body: {
    //   type: 'object',
    //   properties: requestProperties ,
    //   additionalProperties: false
    // },
    occupations: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        required: [ 'message' ],
        properties: {
          message: { type: 'string' },
          count: {type:'number'},
          occupations: {type:'array',
        items: {
            type:'object',
            properties : {
      id:{ type: 'string' },
       name:{ type: 'string' },
         }
        } }
        },
        additionalProperties: false
      }
    }
  }
  const ticketypes = {
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
          ticketypes: {type:'array',
        items: {
            type:'object',
            properties : {
      id:{ type: 'string' },
       name:{ type: 'string' },
         }
        } }
        },
        additionalProperties: false
      }
    }
  }

  const doctypes = {
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
          documenttypes: {type:'array',
        items: {
            type:'object',
            properties : {
       id:{ type: 'string' },
       name:{ type: 'string' },
       isapplyindividual:{ type: 'boolean' },
       isapplycompany:{ type: 'boolean' },
       isapplyid:{ type: 'boolean' },
       isapplyaddress:{ type: 'boolean' },
       isapplyoccupation:{ type: 'boolean' },
       isapplyfund:{ type: 'boolean' },
         }
        } }
        },
        additionalProperties: false
      }
    }
  }
  module.exports =  {
      countries,
      providers,
      subproviders,
      corridors,
      relationships,
      reasons,
      doctypes,
      ticketypes,
      occupations
  }