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
      required: ['firstname','lastname','middlename','country','mobileno','email','pass'],
      properties: {
      firstname:{
        type:'string'
      },
      lastname:{
        type:'string'
      },
      middlename:{
        type:'string',
        default: "XXX"
      },
      country: {
        type:'string'
      },
      mobileno:{
        type:'string'
      },
      regtype: {
        type:'string',
        default:"I"
      },
      businessname: {
        type:'string',
        default:"XXX"
      },
      email:{
        type:'string'
      },
      pass:{
        type:'string'
      },
      issubscribe:{
        type:'boolean',
        default:false
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