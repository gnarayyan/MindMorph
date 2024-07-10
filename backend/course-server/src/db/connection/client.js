const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_CONNECTION_STERING) //DB name = 'course'
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Could not connect to MongoDB....', err));
