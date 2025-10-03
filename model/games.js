const db = require('../config/config_db')

const PostDataGame = (datas) => {
    const SQL_QUERY_INSERT = `INSERT INTO games (id_dev, title, publisher, description, category, price) VALUES 
                        ('${datas.id_dev}', '${datas.title}', '${datas.publisher}', 
                        '${datas.description}', '${datas.category}', '${datas.price}')`
    
    db.execute(SQL_QUERY_INSERT)

    return { success: "Sudah Input"}
}

module.exports = {
    PostDataGame
}