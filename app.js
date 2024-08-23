const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}))
const Router = require('./router/parking')
// const session = require(express-session);
const mongoose = require('mongoose');
const session = require('express-session');
mongoose.connect('mongodb://127.0.0.1:27017/parkingmanagement').then(()=>{
console.log('connected to parkingmanagement')
})

// app.use(session({
//     secret:'vijay1',
//     resave:false,
//     saveUninitialized:false
// }))


app.use(Router)
app.use(express.static('public'))
app.set('view engine','ejs');

app.listen(5000,()=>{
    console.log("server is running")
})