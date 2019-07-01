const registration = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: [ 'apiKey', 'fname','lname','hash','countryiso3','regtype','businessname','email','pass','issubscribe' ],
      properties: {
        apiKey: {
          type: 'string'
        },
        fname: {
          type: 'string'
        },
        lname: {
            type: 'string'
          },
          hash: {
            type: 'string'
          },
          countryiso3: {
            type: 'string'
          },
          regtype: {
            type: 'string'
          },
          businessname: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          pass: {
            type: 'string'
          },
          issubscribe: {
            type: 'string'
          }
      },
      additionalProperties: false
    },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        required: [ 'message' ],
        properties: {
          message: { type: 'string' }
        },
        additionalProperties: false
      }
    }
  }
  

  export  { 
      registration
  }