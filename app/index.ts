const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const ErrorMiddleware = require('./middlewares/Error');
const app = express();
require('dotenv').config()
const routes = require('./routes');
const bodyParser = require('body-parser')

class Application {
  constructor() {
    this.setupExpressServer();
    this.setupMongoose();
    this.setupRoutesAndMiddlewares();
    this.setupConfigs();
  }

  setupRoutesAndMiddlewares() {
    // built-in middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    if (app.get('env') === 'production') app.use(morgan('tiny'));

    // third-party middleware
    app.use(cors());
    //routes
    app.use('/api', routes)
    // app.use((err, req, res, next) => {
    //   console.error(err.stack)
    //   res.status(500).send('Something broke!')
    // })
    app.use('/public', express.static('./public'));
    app.use(ErrorMiddleware);
  }

  setupConfigs() {
    winston.add(new winston.transports.File({ filename: 'error-log.log' }));
    winston.add(
      new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/toplearn',
        level: 'error',
      }),
    );

    process.on('uncaughtException', (err: any) => {
      console.log(err);
      winston.error(err.message);
    });
    process.on('unhandledRejection', (err: any) => {
      console.log(err);
      winston.error(err.message);
    });

    // app.set('view engine', 'pug');
    // app.set('views', '../views'); // default
  }

  setupMongoose() {
    mongoose
      .connect('mongodb://localhost:27017/foodino', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('db connected');
        winston.info('db connected');
      })
      .catch((err: any) => {
        console.error('db not connected', err);
      });
  }
  setupExpressServer() {
    const port = process.env.myPort || 8000;
    app.listen(port, (err: any) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}
export {}
module.exports = Application;
