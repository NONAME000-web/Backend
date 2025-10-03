const express = require("express")

const devRoutes = express.Router()

const DevControllers = require("../controllers/developers")

devRoutes
    .post("/regist", DevControllers.CreateNewDevs)
    .post("/login", DevControllers.LoginUser)
    .post("/verify-otp/:id_dev", DevControllers.VerifyOTP)

module.exports = devRoutes

