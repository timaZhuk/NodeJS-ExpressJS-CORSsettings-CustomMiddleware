//log the request info
const requestLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString(); //long string of numbers
  const method = req.method; //POST, GET ...
  const url = req.url; //url where sends request
  const userAgent = req.get("User-Agent");
  console.log(`[${timeStamp}] ${method} ${url} - ${userAgent}`);
  next();
};

//--addTimeStamp add this prop to request body
const addTimeStamp = (req, res, next) => {
  req.timeStamp = new Date().toISOString();
  next();
};
//----
module.exports = { requestLogger, addTimeStamp };
