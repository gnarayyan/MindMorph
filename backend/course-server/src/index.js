const express = require('express');
const bodyParser = require('body-parser');
//import 3rd party dependencies
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

// Helper Modules
const socketConnection = require('./utils/socketConnection');

// Establish DB connection
require('./db/connection/client');

//Import API Routers
const homeRouter = require('./routers/home.router');
const courseRouter = require('./routers/course/upload.router');
const coursesRouter = require('./routers/course.router');
const sectionRouter = require('./routers/section.router');
const lectureRouter = require('./routers/lecture.router');

// Error Handler ControllersMiddleware
const pageNotFoundMiddleware = require('./middlewares/pageNotFound.middleware');
const serverErrorMiddleware = require('./middlewares/serverError.middleware');

// Start Express App
const app = express();

//Socket Server
const server = require('http').Server(app);
const io = require('socket.io')(server);
// Handle Socket Connection
socketConnection(io);
app.set('socket_io_object', io);

//Middlewares
app.use(morgan('dev')); // common
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/media', express.static('media'));

// Use API Routers
app.use('/', homeRouter);
app.use('/course', courseRouter);
app.use('/courses', coursesRouter);
app.use('/section', sectionRouter);
app.use('/lecture', lectureRouter);

//The 404 Route
app.use('*', pageNotFoundMiddleware);
// Internal Server Error
app.use(serverErrorMiddleware);

// Start Server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
