const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express()

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const todoRoutes = require('../routes/todoRoutes.js');


app.use('/api/todos', todoRoutes);






module.exports = app

