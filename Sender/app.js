const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(bodyParser.json());
const postsRoute = require('./routes/posts');
app.use('/post',postsRoute);



mongoose.connect( 'mongodb://localhost/bootcampdb',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('connected to db');
}).on('error',function(error){
    console.log('phiss',error);
});

app.listen(3);