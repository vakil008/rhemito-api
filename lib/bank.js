const axios = require('axios');
const url  = require('url')

const proxy =  url.parse(process.env.QUOTAGUARDSTATIC_URL);
const auth  = proxy.auth.split(':');
 const B = axios.create({
    baseURL: process.env.BANK_URL,
    proxy: {
      host: proxy.hostname,
      port: proxy.port,
      auth: {
        username: auth[0],
        password: auth[1]
      }
    }
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
const checkCCAccount = (userId, currency, amount, token) => {
  B.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return B.get(`/v${version}/CurrencyCloud/CheckCCAccount/${userId}?currency=${currency}&amount=${amount}`)
  .then(r => r.data)
}
  const getFundingAccount = (userId, token) => {
    B.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return B.get(`/v${version}/CurrencyCloud/GetFundingAccount/${userId}`)
    .then(r => r.data)
  }

  const findFundingAccount = (userId) =>{

  }

  const  createTransferRequest = (transactionId) => {

  }

  const  sendBankMail = (transactionId, token) => {
    B.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return B.post(`/v${version}/CurrencyCloud/SendMail/${transactionId}`)
    .then(r => r.data)
  }



  module.exports = {
      B,
      authenticateUser,
      getFundingAccount,
      checkCCAccount,
      checkKycStatus,
      findFundingAccount,
      createTransferRequest,
      sendBankMail
  }