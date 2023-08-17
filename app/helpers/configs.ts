import { Application } from "express";
const bodyParser = require('body-parser')
const cors = require('cors');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

export default class ConfigHelpers {
    app: Application
    constructor(app) {
        this.app = app;
    }
    bodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    cors() {
        this.app.use(cors());
    }
    winston(){
        winston.add(new winston.transports.File({ filename: 'error-log.log' }));
        winston.add(
          new winston.transports.MongoDB({
            db:`mongodb://localhost:27017/${process.env.DATABASE_NAME}`,
            level: 'error',
          }),
        );
    }
    uncaughtException() {
        process.on('uncaughtException', (err: any) => {
            console.log(err);
            winston.error(err.message);
        });

    }
    unhandledRejection() {

        process.on('unhandledRejection', (err: any) => {
            console.log(err);
            winston.error(err.message);
        });
    }
}