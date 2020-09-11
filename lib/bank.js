const axios = require('axios');



 const B = axios.create({
    baseURL: process.env.BANK_URL,

  });
const version  = process.env.BANK_URL_VERSION

const authenticateUser = (email, password) => {
  return B.post('/Account/AuthenticateUser', {
    email,
    password
  });
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