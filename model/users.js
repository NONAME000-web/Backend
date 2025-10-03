const db  = require("../config/config_db")

const createNewUser = async (req) => {

    const SQL_Query_Get_Username = `SELECT * FROM users
                           WHERE username = '${req.username}'`

    const [rows1] = await db.execute(SQL_Query_Get_Username)

    if(rows1.length > 0){
        return { error: "Username sudah terdaftar" }
    }

    const SQL_Query_Get_Email = `SELECT * FROM users
                           WHERE email = '${req.email}'`

    const [rows2] = await db.execute(SQL_Query_Get_Email)

    if(rows2.length > 0){
        return { error: "Email sudah terdaftar" }
    }

    const SQL_Query_Insert = `  INSERT INTO users (username, email, password) 
                                VALUES ('${req.username}', '${req.email}', '${req.password}')`

    db.execute(SQL_Query_Insert)
    
    return { success: "Berhasil Membuat Akun" }
}

const GetUserByEmail = async (email, otp) => {
    const SQL_Query_Update = `  UPDATE users
                                SET otp_code = '${otp}'
                                WHERE email = '${email}'`
    
    db.execute(SQL_Query_Update)

    const SQL_Query_Get = `  SELECT * FROM users
                             WHERE email = '${email}'`

    const [row] = await db.execute(SQL_Query_Get)

    if(row.length <= 0){
        return { error: "Akun belum terdaftar "}
    }else{
        return{
            success: "Login Berhasil",
            data: row[0]
        }
    }
}

const GetUserById = async (id_user) => {
    const SQL_Query_Get = `  SELECT * FROM users
                             WHERE id_user = ${id_user}`
    const [row] = await db.execute(SQL_Query_Get)
    
    if(row.length <= 0){
        return { error: "Akun tidak ada" }
    }else{
        return {
            success: "Berhasil",
            data: row[0]
        }
    }
}

const ResetOtpCode = (id_user) => {
    const SQL_Query_Update = `UPDATE users SET otp_code = ('') WHERE id_user = ('${id_user}')`

    db.execute(SQL_Query_Update)
}

module.exports = {
    createNewUser,
    GetUserByEmail,
    GetUserById,
    ResetOtpCode
}