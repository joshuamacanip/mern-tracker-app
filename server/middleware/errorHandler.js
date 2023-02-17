const { CustomError } = require("../error/customError");

const errorHandler = (err, req, res, next) => {
  //Check if err object is instance of CustomError constructor
  if (err instanceof CustomError) {
    return res.status(err.statusCode).msg(err.message);
  }

  res
    .status(500)
    .json({ msg: "Something went wrong, Please try again later!" });
};

module.exports = errorHandler;
