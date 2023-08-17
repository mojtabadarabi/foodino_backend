const winston = require('winston');
const helpers = require('../helpers/helpers');

export default (error:any, req:any, res:any,next:any) => {
  console.log(error)
  winston.error(error.message, error);
  helpers.sendResponse(res, null, 500, 'some thing went wrong ')
};

export {}