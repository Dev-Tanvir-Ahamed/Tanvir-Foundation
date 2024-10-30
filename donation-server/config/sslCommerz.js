const SSLCommerzPayment = require('sslcommerz-lts');

const initPayment = (paymentData) => {
  const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWD, false);
  return sslcz.init(paymentData);
};

module.exports = initPayment;
