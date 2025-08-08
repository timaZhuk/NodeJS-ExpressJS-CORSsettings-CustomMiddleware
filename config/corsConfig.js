const cors = require("cors");

const configureCors = () => {
  return cors({
    //origin -> which origin is allowed access the API
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", //local dev
        "https://yourcustomdomain.com", //production domain
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); //giving permission so that req can be allow
      } else {
        callback(new Error("Not allowed by cors"));
      }
    }, //origin config end
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, //enable support for cookies and pass the headers
    preflightContinue: false,
    //maxAge avoid send options request multiple times
    maxAge: 600, //chache pre flight responses for 10 mins (600 sec)
    optionsSuccessStatus: 204,
  });
};

//---export module
module.exports = { configureCors };
