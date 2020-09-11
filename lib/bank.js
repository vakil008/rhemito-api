const axios = require('axios');



 const B = axios.create({
    baseURL: process.env.BANK_URL,

  });
const version  = process.env.BANK_URL_VERSION

const authenticateUser = (email, pass) => {
  return B.post('/Account/AuthenticateUser');
}
const checkKycStatus = (user) => {

}
const checkCCAccount = (user, currency, amount) => {

}
  const getFundingAccount = (userId) => {

  }

  const findFundingAccount = (userId) =>{

  }

  const  createTransferRequest = (transactionId) => {

  }

  module.exports = {
      B,
      authenticateUser,
      getFundingAccount,
      checkCCAccount,
      checkKycStatus,
      findFundingAccount,
      createTransferRequest
  }