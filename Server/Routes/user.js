const express=require('express')
const {isAuth}=require('../Middleware/auth.js');
const { registerUser, loginUser } = require('../Controller/User.js');

const route=express.Router();

route.post("/register",registerUser);
route.post('/login',loginUser)

route.use(isAuth);

route.post('/logout',logout);

module.exports=route;