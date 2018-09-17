const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');
const app = express();

const connectClient = MongoClient.connect("mongodb://ted:ted123@ds257851.mlab.com:57851/ted", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var api = '';

app.use((request, response, next) => {
	Promise.resolve(connectClient).then((connection, err)=>{
    if(connection !== 'undefined'){
       let db = connection.db('ted');
       require('./server/api/')(app, db);
       next();
    }else{
      next(new Error('MongoError'))
    }
  }
	)
})

app.set('view engine', 'hbs');
app.set('views', './client/views');

require('./server/routes/userRoute')(app, api);

app.listen(5000, (err)=>{
     if(err)
       throw err;
     console.log("server is running on port 5000");
})
