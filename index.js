// The flow goes like index.js-->routes folder-->controllers folder-->Repo folder(db talk happens here)-->imports collection model from models folder

const express = require('express');
const homeRouter = require('./routes/homeRouter');
const booksRouter = require('./routes/booksRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//const authMiddleware=require('./middlewares/auth');
//another way of doinf this is object de structuring viz below
const {basicAuth}=require('./middlewares/auth');
const app = express();
const port = 441;

app.listen(port, () => console.log(`API listening on port: ${port}`));


mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(() => console.log('connected to Db'))
    .catch(err => console.log(err));


app.use(bodyParser.json());
app.use('/', homeRouter);      // these two line are public as authenticate middleware is below them


//app.use(authMiddleware.basicAuth);   // if line 8 was in use
app.use(basicAuth);                    // since line 10 is in use
app.use('/api/books', booksRouter);             // this route is private as auth middleware is above it

