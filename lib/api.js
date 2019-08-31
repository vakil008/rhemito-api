const axios = require('axios');
// const sha512 =  require('crypto-js/sha512');
const sha512 = require('js-sha512')



 const R = axios.create({
    baseURL: `https://apifurp.phasestreamtest.com/BusinessApi.svc/json/`,
    
  });
  
  R.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });



   function hasher() {
    const args = Array.prototype.slice.call(arguments, 1);
    const hashString = args.join('').toLowerCase()
    const  hash =  sha512(hashString) //.toString()
    return hash
   
    // return args.join(separator);
  }

module.exports = {
  R,
  hasher
}