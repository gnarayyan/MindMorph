const pageNotFoundMiddleware = (req, res, next) => {
  res.status(404).send({ message: "Requested resource doesn't exist" });
};

module.exports = pageNotFoundMiddleware;
