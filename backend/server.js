require('dotenv').config()

const express = require('express')
const cors = require('cors');
const problemRoutes = require('./routes/problems')
const userRoutes = require('./routes/user')

const mongoose = require('mongoose')

// express app
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/problems', problemRoutes)
app.use('/api/user', userRoutes)

app.get('/',(req,res) => {
  res.send("<h1>Hello from AWS</h1>")
})
//mongoose connect to database
mongoose.connect(process.env.MONG_URI)
.then(() => {
  console.log('connected to database')
  // listen to port
  app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
  })
})
.catch((err) => {
  console.log(err)
}) 

/*app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
  })*/