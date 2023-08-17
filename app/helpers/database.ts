const mongoose = require('mongoose');
const winston = require('winston');

export const connectToDb = () => {
    mongoose
        .connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            winston.info('db connected')
            console.log('db connected');
        })
        .catch((err: any) => {
            winston.error('db connected failed ' + err)
            console.error('db not connected', err);
        });
}

export const appListen = (app) => {
    const port = process.env.PORT || 8000;
    app.listen(port, (err: any) => {
        if (err) console.log(err);
        else console.log(`app listen to port ${port}`);
    });
}