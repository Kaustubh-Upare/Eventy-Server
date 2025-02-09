const express=require('express');
const { isAuth } = require('../Middleware/auth.js');
const { createEvent, updateMyEvent, deleteEvent } = require('../Controller/Event.js');
const route=express.Router();


route.use(isAuth);

route.post('/newEvent',createEvent);
route.get('/myEvents',getMyEvent);

route.route('/events/:id')
    .put(updateMyEvent)
    .delete(deleteEvent)


module.exports=route;