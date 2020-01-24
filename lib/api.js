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
     console.log('arguements', arguments);
    const args = Array.prototype.slice.call(arguments, 0);
    console.log('hasher args', args);
    const hashString = args.join('')
    const  hash =  sha512(hashString) //.toString()
    return hash

    // return args.join(separator);
  }

module.exports = {
  R,
  hasher
}