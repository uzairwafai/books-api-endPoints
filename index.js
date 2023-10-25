// The flow goes like index.js-->routes folder-->controllers folder-->Repo folder(db)-->model folder

const express = require('express');
const homeRouter = require('./routes/homeRouter');
const booksRouter = require('./routes/booksRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const port = 441;

app.listen(port, () => console.log(`API listening on port: ${port}`));


mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(() => console.log('connected to Db'))
    .catch(err => console.log(err));


app.use(bodyParser.json());
app.use('/', homeRouter);
app.use('/api/books', booksRouter);

