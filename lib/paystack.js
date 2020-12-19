const axios = require('axios');
const sha512 = require('js-sha512')



 const P = axios.create({
    baseURL: process.env.PAYSTACK_URL,


  });

  R.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });



   function hasher() {
    const args = Array.prototype.slice.call(arguments, 0);
    const hashString = args.join('')
    const  hash =  sha512(hashString) //.toString()
    return hash

    // return args.join(separator);
  }

module.exports = {
  P,
  hasher
}