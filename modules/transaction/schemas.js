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
        banktoken: {
          type:['string', 'null']
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
          isdiscountavailable: { type: 'boolean' },
          isnamecheckavailable: { type: 'boolean' },
          validateid: {type:['string', 'null']},
          servicecode:{type:['string', 'null']},
          fees:{type:'number'},
          bank: { type: 'object',
            properties: {
              id: {type:'string'},
              accountId: {type:'string'},
              accountNumber: {type:'string'},
              accountNumberType:{type:'string'},
              accountHolderName:{type:'string'},
              bankName: {type:'string'},
              bankAddress:{type:'string'},
              bankCountry: {type:'string'},
              currency: {type:'string'},
              paymentType: {type:'string'},
              routingCode: {type:'string'},
              routingCodeType: {type:'string'},
              createdAt: {type:'string'},
              updatedAt:{type:'string'},
              amount:{type:'number'},
            }},
          paymentmethods: {type:['array', 'null'],
        items: {
            type:'object',
            properties : {
      fee:{ type: 'number' },
      code:{ type: 'string' },
         }
        } },
        datarequirements: {type:"array",
        items:{
            type:"object",
            properties:{
              key: {type:"string"},
              value: {type:'string', maxLength:1}
            }
        }},
        docrequirements: {type:"array",
        items:{
            type:"object",
            properties:{
              key: {type:"string"},
              value: {type:'string', maxLength:1}
            }
        }},
        senderrequirements: {type:"array",
        items:{
            type:"object",
            properties:{
              key: {type:"string"},
              value: {type:'string', maxLength:1}
            }
        }},
        kycrequirements: {type:"array",
        items:{
            type:"object",
            properties:{
              key: {type:"string"},
              value: {type:'string', maxLength:1}
            }
        }},
        bankrequirements: {type:"array",
        items:{
            type:"object",
            properties:{
              key: {type:"string"},
              value: {type:'string', maxLength:1}
            }
        }}
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
        banktoken: {
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
        provideritem: {
          type:'string'
        },
        benfirstname: {
          type:'string'
        },
        benlastname: {
          type:'string'
        },
        bendob:{
            type:'string'
        },
        benbillref: {
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
        benbic:{
          type:'string'
        },
        beniban: {
          type:'string'
        },
        benaddress: {
          type:'string'
        },
        benidtype: {
          type:'string'
        },
        benidnumber: {
          type:'string'
        },
        benidcountry: {
          type:'string'
        },
        benrouting: {
          type:'string'
        },
        benidissueddate: {
          type:'string'
        },
        benidexpirydate: {
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
          default:"XXX"
        },

        senderaddress1: {
          type:'string'
        },
        senderaddress2: {
          type:'string'
        },
        sendercity: {
          type:'string'
        },
        senderpostcode: {
          type:'string'
        },
        sendergender: {
          type:'string'
        },
        senderdob: {
          type:'string'
        },
        sendernationality: {
          type:'string'
        },
        senderoccupation: {
          type:'string'
        },
        senderbirthcountry: {
          type:'string'
        },
        senderidcountry: {
          type:'string'
        },
        senderidissuedate: {
          type:'string'
        },
        senderidexpirydate: {
          type:'string'
        },
        senderidnumber: {
          type:'string'
        },
        senderidtype: {
          type:'string'
        },
        documents: {
          type: 'array',
          properties: {
            doctypeid: {
              type: 'string'
            },
            doctitle: {
              type: 'string'
            },
            docformat: {
              type: 'string'
            },
            docbase64string: {
              type: 'string'
            }
          }
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
          reference:  {type:'string'},
          accountreference:  {type:'string'},
          fee: {type:'number'},
          total: {type:'number'},
          value: {type:'number'},
          paymenturl: {type:'string'},
          bank: { type: 'object',
          properties: {
            id: {type:'string'},
            accountId: {type:'string'},
            accountNumber: {type:'string'},
            accountNumberType:{type:'string'},
            accountHolderName:{type:'string'},
            bankName: {type:'string'},
            bankAddress:{type:'string'},
            bankCountry: {type:'string'},
            currency: {type:'string'},
            paymentType: {type:'string'},
            routingCode: {type:'string'},
            routingCodeType: {type:'string'},
            createdAt: {type:'string'},
            updatedAt:{type:'string'},
            amount:{type:'number'},
          }},

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
         servicecode:{ type: 'string' },
         value:{ type: 'number' },
         currency:{ type: 'string' },
         summary:{ type: 'string' },
         status:{ type: 'string' },
         fee:{ type: 'string' },
         firstname:{ type: 'string' },
         lastname:{ type: 'string' },
         mobile:{ type: 'string' },
         paymentmethod:{ type: 'string' },
         provider:{ type: 'string' },
         provideritem:{ type: 'string' },
         rate:{ type: 'string' },
         reason:{ type: 'string' },
         relationship:{ type: 'string' },
         bank:{ type: 'string' },
         tocurrency :{ type: 'string' },
         fromcurrency:{ type: 'string' },
         fromcountry:{ type: 'string' },
         tocountry:{ type: 'string' },
         benbillref:{ type: 'string' },
         benaccountno:{ type: 'string' },
         beniban: { type: 'string' },
         bencity:{ type: 'string' },
         dob:{ type: 'string' },
         documents:{
          type:"array",
          items: {
            type:"object",
            doctitle:{ type: 'string' },
            doctype:{ type: 'string' },
            docformat:{ type: 'string' },
            dateuploaded:{ type: 'string' },
            active:{ type: 'boolean' }
          }
         }


             }
          }
          }

        },
        additionalProperties: false
      }
    }
  }
  const transaction = {
    // This jsonschema will be used for data validation
    body: {
      type: 'object',
      required: ['uid','sessiontoken',
      "transactionreference"],
      properties: {
        uid: {
          type:'string'
        },
        sessiontoken: {
          type:'string'
        },
        reference: {
          type:'string'
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
          transaction: {
            type:"object",
            properties : {
              reference: { type: 'string' },
              date:{ type: 'string' },
              service:{ type: 'string' },
              servicecode:{ type: 'string' },
              value:{ type: 'number' },
              currency:{ type: 'string' },
              summary:{ type: 'string' },
              status:{ type: 'string' },
              fee:{ type: 'string' },
              firstname:{ type: 'string' },
              lastname:{ type: 'string' },
              mobile:{ type: 'string' },
              paymentmethod:{ type: 'string' },
              provider:{ type: 'string' },
              provideritem:{ type: 'string' },
              rate:{ type: 'string' },
              reason:{ type: 'string' },
              relationship:{ type: 'string' },
              bank:{ type: 'string' },
              tocurrency :{ type: 'string' },
              fromcurrency:{ type: 'string' },
              fromcountry:{ type: 'string' },
              tocountry:{ type: 'string' },
              benbillref:{ type: 'string' },
              benaccountno:{ type: 'string' },
              beniban: { type: 'string' },
              bencity:{ type: 'string' },
              dob:{ type: 'string' },
              documents:{
                type:"array",
                items: {
                  type:"object",
                  doctitle:{ type: 'string' },
                  doctype:{ type: 'string' },
                  docformat:{ type: 'string' },
                  dateuploaded:{ type: 'string' },
                  active:{ type: 'boolean' }
                }
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
      transaction,
      transactions
  }