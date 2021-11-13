require('dotenv').config();
const ip = require("ip");
console.dir (ip.address());
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      cors = require('cors'),
      path = require('path'),
      helmet = require('helmet'),
      auth = require('./routers/Auth'),
      useredit = require('./routers/UserEdit'),
      connectIdMessages = require('./routers/ConnectID'),
      sendMessages = require('./routers/MessagesUsers');

// Connect With MongoDB
const part = process.env.PART || 8000;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(result=> app.listen(part, ()=>{
        console.log(`http://localhost:${part}`);
    })).catch(err=>console.log(err));

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.static('public/js'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routers
app.use(auth);
app.use(useredit);
app.use(connectIdMessages);
app.use(sendMessages);

