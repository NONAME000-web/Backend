const gameModels = require("../model/games")

const UploadGame = async (req, res) => {  
    try {
        const id_dev = req.params.id_dev
        const { title, publisher, description, category, price } = req.body   

       const result =  await gameModels.PostDataGame({
                                            id_dev,
                                            title, 
                                            publisher,
                                            description,
                                            category,
                                            price
                                        })

        res.json({
            message: result.success,
            status: 200
        })
    } catch (error) {
        console.log(error)
    }
}

const GetAllGames = (req, res) => {
    res.json({
        message: "Method get berhasil",
        status: 200
    })
}

module.exports = {
    UploadGame,
    GetAllGames
}