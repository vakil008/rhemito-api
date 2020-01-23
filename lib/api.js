const axios = require('axios');
const sha512 = require('js-sha512')



 const R = axios.create({
    baseURL: process.env.RHEMITO_URL,

  });

  R.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });



   function hasher() {
    const args = Array.prototype.slice.call(arguments, 0);
    const hashString = args.join('')
    console.log('hashstring', hashString);
    const  hash =  sha512(hashString) //.toString()
    return hash

    // return args.join(separator);
  }

module.exports = {
  R,
  hasher
}