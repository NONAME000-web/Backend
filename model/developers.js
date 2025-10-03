const db = require('../config/config_db')

const CreateNewUser = async (data) => {
    const SQL_Query_Get_Username = `SELECT * FROM developers WHERE username = ('${data.username}')`

    const [result1] = await db.execute(SQL_Query_Get_Username)

    if(result1.length > 0){
        return { error: "Gunakan Username Lain" }
    }

    const SQL_Query_Get_Email = `SELECT * FROM developers WHERE email = ('${data.email}')`

    const [result2] = await db.execute(SQL_Query_Get_Email)

    if(result2.length > 0){
        return { error: "Gunakan Email Lain" }
    }

    const SQL_QUERY_INSERT = `INSERT INTO developers (username, email, password) 
                        VALUES ('${data.username}', '${data.email}', '${data.password}')`

    db.execute(SQL_QUERY_INSERT)

    return { success: "Berhasil Membuat Akun" }
}

const GetUserByEmail = async (email, otp) => {
    const SQL_Query_Get = `SELECT * FROM developers WHERE email = ('${email}')`

    const [result] = await db.execute(SQL_Query_Get)

    const SQL_QUERY_INSERT_OTP_Code = `UPDATE developers  SET otp_code = ('${otp}') WHERE email = ('${email}')`

    db.execute(SQL_QUERY_INSERT_OTP_Code)

    if(result.length <= 0){
        return { error: "Akun belum terdaftar" }
    }else{
        return { 
            success: "Akun tersedia", 
            data: result[0]
        }
    }
}

const GetUserById = async (id) => {
    const SQL_Query_Get_Id = `SELECT * FROM developers WHERE id_devs = ('${id}')`

    const [result] = await db.execute(SQL_Query_Get_Id)

    if(result.length <= 0){
        return { error: "User tidak ada"}
    }else{
        return {
            success: "Berhasil",
            data: result[0]
        }
    }
}

const ResetOtpCodeById = (id) => {
    const SQL_Query_Get_Id = `UPDATE developers SET otp_code = ('') WHERE id_devs = ('${id}')`

    db.execute(SQL_Query_Get_Id)
}

module.exports = {
    CreateNewUser,
    GetUserByEmail,
    GetUserById,
    ResetOtpCodeById
}