//Not found resource middleware
const notFound = (req, res) =>
  res.status(404).json({ msg: "Resource does not exist!" });

module.exports = notFound;
