const express = require("express")

const gameRoutes = express.Router()

const gameControllers = require("../controllers/games")

gameRoutes
    .post('/upload/:id_dev', gameControllers.UploadGame)
    .get('/', gameControllers.GetAllGames)

module.exports = gameRoutes
