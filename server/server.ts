import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';

import { routerChat } from './routes/chat';
import { routerMessages } from './routes/message';

mongoose.connect('mongodb://localhost:27017/local')
const app = express();
const logger = winston.createLogger({
    format:winston.format.simple(),
    transports:[
        new winston.transports.File({
            level:'info',
            filename:'logs/requests.log'
        })
    ]
})

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use((req,res,next) => {
    logger.log('info',`${req.method} ${req.url}`)
})

app.use('/chats',routerChat)
app.use('/messages', routerMessages);


app.listen(3030, () => {
  console.log("Application listen http://localhost:3030/");
});