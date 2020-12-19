const auth = {
  // This jsonschema will be used for data validation
  body: {
    type: 'object',
    properties: {
      email: {type: 'string'},
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
        id: {type:[ 'string', 'null']},
      },
      additionalProperties: true,
    },
  },
};
  const checkaccount = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      properties: {
        userId: { type: 'string'},
       currency: { type: 'string'},
      amount: { type: 'number'},
       token: { type: 'string'}
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
          id: { type: ['string', 'null'] }
        },
        additionalProperties: true
      }
    }
  }

  const fundingaccount = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      properties: {
        userId: {type:'string'},
        token: { type: 'string'}
      } ,
      additionalProperties: true
    },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        properties: {
          id: { type: ['string', 'null'] },
        },
        additionalProperties: true
      }
    }
  }

  const sendmail = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      properties: {
        transactionId: {type:'string'},
        token: { type: 'string'}
      } ,
      additionalProperties: true
    },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        properties: {
          id: { type: ['string', 'null'] },
        },
        additionalProperties: true
      }
    }
  }


  const refund = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      properties: {
        refunds: { type:['array', 'null'],
        items: {
            type:'object',
            properties : {
              transactionId: {type:'string'},
              amount: { type: 'number' },
              currency: { type: 'string' }
         }
        } },
      } ,
      additionalProperties: true
    },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        properties: {
          message: { type: ['string', 'null'] },
        },
        additionalProperties: true
      }
    }
  }

  module.exports =  {
      auth,
      checkaccount,
      fundingaccount,
      sendmail,
      refund
  }