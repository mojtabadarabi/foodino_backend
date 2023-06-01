const mongoose = require('mongoose');

export const connectToDb = () => {
    mongoose
        .connect('mongodb://localhost:27017/food', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('db connected');
        })
        .catch((err: any) => {
            console.error('db not connected', err);
        });
}