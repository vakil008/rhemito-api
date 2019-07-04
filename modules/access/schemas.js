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
const register = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['fname','lname','countryiso3','mobileno','email','pass'],
      properties: {
      fname:{
        type:'string'
      },
      lname:{
        type:'string'
      },
      mname:{
        type:'string'
      },
      countryiso3: {
        type:'string'
      },
      mobileno:{
        type:'string'
      },
      regtype: {
        type:'string'
      },
      businessname: {
        type:'string'
      },
      email:{
        type:'string'
      },
      pass:{
        type:'string'
      },
      issubscribe:{
        type:'boolean'
      }
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
          message: { type: 'string' }
        },
        additionalProperties: false
      }
    }
  }

  const activate = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required:['accesstoken'],
      properties: {
      accesstoken:{
        type:'string'
      }
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
          message: { type: 'string' }
        },
        additionalProperties: false
      }
    }
  }

  const login  = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['email','pass'],
      properties: {
        email: {
          type:'string'
        },
        pass:{
          type:'string'
        }
      } ,
      additionalProperties: false
    },
    response: {
      // The 200 body response is described
      // by the following schema
      200: {
        type: 'object',
        required: [ 'message','uid','sessiontoken','sessionexpiry' ],
        properties: {
          message: { type: 'string' },
          uid: { type: 'string' },
          sessiontoken: { type: 'string' },
          sessionexpiry: { type: 'string' },
        },
        additionalProperties: false
      }
    }
  }
  

  module.exports =  { 
      register,
      activate,
      login
  }