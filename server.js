const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3001

//express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use(require('./routes'))

//Mongo connect
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbSocialData',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

  

  app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));