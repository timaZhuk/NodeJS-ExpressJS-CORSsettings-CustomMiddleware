//to read env files
require("dotenv").config();

//import custom middleware
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware.js");
//import global error handler
const { globalErrorHandler } = require("./middleware/errorHandler.js");

const express = require("express");
const { configureCors } = require("./config/corsConfig.js");
const { urlVersioning } = require("./middleware/apiVersioning.js");
const { createBasicRateLimiter } = require("./middleware/rateLimiting.js");
const itemRoutes = require("./routes/item-routes.js");

//---------main app-----------------------------------
//creating express app
const app = express();

const PORT = process.env.PORT || 4055;

//--use custom middleware, triggered every time we make request
app.use(requestLogger);
app.use(addTimeStamp);

//-- use of cors
app.use(configureCors());

//rateLimiter (maxRate=200, time=15 min in mili sec )
app.use(createBasicRateLimiter(100, 15 * 60 * 1000));

//--json middleware
app.use(express.json());

//api version check
app.use(urlVersioning("v1"));

// --- routes
app.use("/api/v1", itemRoutes);

//use global error handler
app.use(globalErrorHandler);

//creating server
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
