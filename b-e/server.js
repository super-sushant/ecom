const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');

const authRoutes = require('./routes/auth') 
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const itemRoutes = require('./routes/item');

const app = express();
app.use(express.json);

app.use('/api',authRoutes)
app.use('/api',cartRoutes)
app.use('/api',orderRoutes)
app.use('/api',itemRoutes)

// used in production to serve client files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

// connecting to mongoDB and then running server on port 4000
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
route = express.Router()
console.log("ej")
app._router.stack.forEach(element => {
  if(element.route && element.route.path) console.log(element.route.path)
});