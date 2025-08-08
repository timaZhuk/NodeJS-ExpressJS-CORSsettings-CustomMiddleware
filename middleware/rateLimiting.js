const rateLimit = require("express-rate-limit");

const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    max: maxRequests, //Limit each IP to 100 requests per 'window'
    winddowMs: time, //(15*60*1000)ms==15 min
    message: "Too many requests, please try again",
    standardHeaders: true,
    legacyHeaders: false, // Disable the 'X-RateLimit' headers
    //store: .....//Redis, Memcache etc...
  });
};

//module
module.exports = { createBasicRateLimiter };
