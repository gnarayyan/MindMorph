const express = require('express');

//import 3rd party dependencies
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

//Import API Routers
const homeRouter = require('./routers/home.router');

// Start Express App
const app = express();

//Middlewares
app.use(morgan('dev')); // common
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use API Routers
app.use('/', homeRouter);

//The 404 Route
app.use('*', function (req, res, next) {
  res.status(404).send({ message: "Requested resource doesn't exist" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong in Server' });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
