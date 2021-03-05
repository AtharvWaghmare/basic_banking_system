const express = require('express');
const route = express.Router();
const axios = require("axios");

const controller = require('../controller/controller');

route.get('/',(req, res)=>{
    res.render("index",{users:"Basic Banking System"});
});

route.get('/customer',(req,res)=>{
    axios.get("http://localhost:8080/api/users")
    .then(function(response){
        res.render("customer",{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
});

route.get('/profile',(req,res)=>{
    axios.get('http://localhost:8080/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("profile",{user:userdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
});

route.get('/transfer',(req, res)=>{
    axios.get('http://localhost:8080/api/users',{params:{id:req.query.id}})
    .then(function(userData){
        console.log(userData.data.name)
        res.render("transfer",{user:userData.data});
    })
    .catch(err=>{
        res.send(err);
    })
});

route.get('/record',(req,res)=>{
    res.render('record');
})


//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);

module.exports = route