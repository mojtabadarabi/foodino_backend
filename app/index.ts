import { appListen, connectToDb } from "./helpers/database";
import express from 'express';
import morgan from 'morgan';
import ErrorMiddleware from './middlewares/Error';
const app = express();
require('dotenv').config()
import routes from '@/routes';
import ConfigHelpers from './helpers/configs';
import authMiddleWare from './middlewares/auth'

class Application {
  configHelpers: any
  constructor() {
    this.configHelpers = new ConfigHelpers(app)
    appListen(app)
    connectToDb()
    this.setupConfigs()
    this.setupRoutesAndMiddleware();
    this.configHelpers.winston()
    this.exceptionsHandlers();
  }

  setupConfigs() {
    this.configHelpers.bodyParser()
    this.configHelpers.cors()
  }

  setupRoutesAndMiddleware() {
    if (app.get('env') === 'production') app.use(morgan('tiny'));

    app.use('/api',authMiddleWare.addUserToReq, routes)
    app.use('/public', express.static('./public'));
    app.use(ErrorMiddleware);
  }

  exceptionsHandlers() {
    this.configHelpers.uncaughtException()
    this.configHelpers.unhandledRejection()
  }

}
export { };
export default Application;
