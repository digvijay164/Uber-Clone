const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDb = require('./db/db.js');
const userRoutes = require('./routes/user.route.js')
app.use(cors());

connectToDb();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.send("Server is running successfully");
});
app.use('/users', userRoutes);

module.exports = app;