const express = require('express');
const routes = express.Router();
const { register, all, singleUser, login, deleteById, update } = require('../controller/userController')
routes.get('/user', all)
routes.get('/user/:id', singleUser)
routes.post('/register', register)
routes.post('/login', login)
routes.put('/user/:id', update)
routes.delete('/user/:id', deleteById)
module.exports = { routes } 