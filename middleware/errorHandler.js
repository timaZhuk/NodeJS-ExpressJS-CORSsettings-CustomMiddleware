//custom error class
//extends Error class and add status code
class APIError extends Error {
  constructor(message, statusCode) {
    super(message); //parent constructor call
    this.statusCode = statusCode;
    this.name = "APIError"; //set the error type to API error
  }
}

// --- async handler
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ----- globalErrorHandler ----
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log the error stack
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
    //handle mongoose validation ->
  } else if (err.name === "validationError") {
    return res.status(400).json({
      status: "error",
      message: "validationError",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occured",
    });
  }
};

//--module
module.exports = { APIError, asyncHandler, globalErrorHandler };
