const express = require('express');

const userRoutes = express.Router();

const userControllers = require('../controllers/users');

userRoutes
    .post("/regist", userControllers.CreateNewUser)
    .post("/login", userControllers.LoginUser)
    .post("/verify-otp/:id_user", userControllers.VerifyOTP)

module.exports = userRoutes;