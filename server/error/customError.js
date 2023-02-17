//CustomError constructor
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

//customError function
const createCustomErrorAPI = (statusCode, message) => {
  return new CustomError(statusCode, message);
};

module.exports = {
  CustomError,
  createCustomErrorAPI,
};
