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
const calculate = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['uid','sessiontoken',
      'fromcountry',
      'fromcurrency',
      'tocountry',
      'tocurrency',
    'amount','direction','service'],
      properties: {
        uid: {
          type:'string'
        },
        sessiontoken: {
          type:'string'
        },
        fromcountry: {
          type:'string'
        },
        tocountry: {
          type:'string'
        },
        fromcurrency: {
          type:'string'
        },
        tocurrency: {
          type:'string'
        },
        amount:{
          type:'number'
        },
        direction: {
          type:'string'
        },
        service:{
          type:'string'
        },
        discountcode: {
          type:'string'
        },
        isvalidate: {
          type:'number',
          default:0
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
          message: { type: 'string' },
          rate: { type: 'number' },
          sendamount: { type: 'number' },
          receiveamount: { type: 'number' },
          fromcountry: {type:'string'},
          tocountry: {type:'string'},
          fromcurrency: {type:'string'},
          tocurrency: {type:'string'}, 
          discountamount: { type: 'number' },
          docregtype: {type:'string'},
          docid: { type: 'string' },
          docaddress: { type: 'string' },
          docfund: { type: 'string' },
          dococcupation: { type: 'string' },
          databankaccno: { type: 'string' },
          databankbic: { type: 'string' },
          databankrouting: { type: 'string' },
          databankiban: { type: 'string' },
          databendob: { type: 'string' },
          databencity: { type: 'string' },
          databenaddress: { type: 'string' },
          isdiscountavailable: { type: 'boolean' },
          isnamecheckavailable: { type: 'boolean' },
          validateid: {type:['string', 'null']},
          servicecode:{type:['string', 'null']},
          paymentmethods: {type:['array', 'null'],
        items: {
            type:'object',
            properties : {
      fee:{ type: 'number' },
      code:{ type: 'string' },
         }
        } }
        },
        additionalProperties: false
      }
    }
  }
  
  const nameCheck = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['uid','sessiontoken',
      'providerid',
      'accountno'],
      properties: {
        uid: {
          type:'string'
        },
        sessiontoken: {
          type:'string'
        },
        providerid: {
          type:'string'
        },
        accountno: {
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
  



  const submit = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['uid','sessiontoken',
      'fromcountry',
      'fromcurrency',
      'tocountry',
      'tocurrency',"benfirstname","benlastname",
    'sendamount','direction','service',"provider"],
      properties: {
        uid: {
          type:'string'
        },
        sessiontoken: {
          type:'string'
        },
        fromcountry: {
          type:'string'
        },
        tocountry: {
          type:'string'
        },
        fromcurrency: {
          type:'string'
        },
        tocurrency: {
          type:'string'
        },
        direction: {
          type:'string'
        },
        service:{
          type:'string'
        },
        paymentmethod:{
          type:'string'
        },
        discountcode: {
          type:'string'
        },
        validateid: {
          type:'string'
        },
        sendamount: {
          type:'number'
        },
        receiveamount: {
          type:'number'
        },
        provider: {
          type:'string'
        },
        benfirstname: {
          type:'string'
        },
        benlastname: {
          type:'string'
        },
        benmobileno: {
          type:'string'
        },
        benaccountno: {
          type:'string'
        },
        benbankname: {
          type:'string'
        },
       
       
        benaddress: {
          type:'string'
        },
        relationshipid: {
          type:'string'
        },
        reasonid: {
          type:'string'
        },
        bencity: {
          type:'string',
          default:""
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
          rate: { type: 'number' },
          sendamount: { type: 'number' },
          receiveamount: { type: 'number' },
          fromcountry: {type:'string'},
          tocountry: {type:'string'},
          fromcurrency: {type:'string'},
          tocurrency: {type:'string'}, 
          reference:  {type:'string'},
          fee: {type:'number'},
          total: {type:'number'},
          value: {type:'number'},
          paymenturl: {type:'string'},
          
        },
        additionalProperties: false
      }
    }
  }
  const transactions = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['uid','sessiontoken',
      "startdate","enddate"],
      properties: {
        uid: {
          type:'string'
        },
        sessiontoken: {
          type:'string'
        },
        startdate: {
          type:'string'
        },
        enddate: {
          type:'string'
        },
      
        servicecode:{
          type:'string'
        },
        reference: {
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
          message: { type: 'string' },
          count: { type: 'number' },
          transactions: {
            type:"array",
            items: {
              type:'object',
              properties : {
         reference: { type: 'string' },
         date:{ type: 'string' },
         service:{ type: 'string' },
         value:{ type: 'number' },
         currency:{ type: 'string' },
         summary:{ type: 'string' },
         status:{ type: 'string' },
             }
          }
          }
      
        },
        additionalProperties: false
      }
    }
  }
  module.exports =  { 
      calculate,
      nameCheck,
      submit,
      transactions
  }