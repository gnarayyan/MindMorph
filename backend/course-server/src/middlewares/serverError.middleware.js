const serverErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong in Server' });
};

module.exports = serverErrorMiddleware;
