const bcrypt = require("bcryptjs")
const DevModels = require("../model/developers")

const CreateNewDevs = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await DevModels.CreateNewUser({
            username,
            email,
            password: hashedPassword
        })

        if(result.error){
            return res.json({
                message: result.error,
                status: 401
            })
        }

        res.json({
            message: result.success,
            status: 200
        })
    } catch (error) {
        console.log(error)
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const otp_code = Math.floor(100000 + Math.random() * 900000);

        const hashedOtpCode = await bcrypt.hash(otp_code.toString(), 10)

        const result = await DevModels.GetUserByEmail(email, hashedOtpCode)

        if(result.error){
            return res.json({
                message: result.error,
                status: 401
            })
        }

        const isPasswordValid = await bcrypt.compare(password, result.data.password)

        if(!isPasswordValid){
            return res.json({
                message: "Password tidak valid",
                status: 401
            })
        }

        res.json({
            message: result.success,
            status: 200,
            code: otp_code,
            data: result.data
        })
    } catch (error) {
        console.log(error)
    }
}

const VerifyOTP = async (req, res) => {
    try {
        const id_dev = req.params.id_dev
        const { otp } = req.body

        const result = await DevModels.GetUserById(id_dev)

        if(result.error){
            return res.json({
                message: result.error,
                status: 401
            })
        }

        const isValidOtpCode = await bcrypt.compare(otp.toString(), result.data.otp_code)
        if(!isValidOtpCode){
            return res.json({
                message: "Kode tidak valid",
                status: 401
            })
        }
        
        res.json({
            message: result.success,
            status: 200
        })

        await DevModels.ResetOtpCodeById(id_dev)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    CreateNewDevs,
    LoginUser,
    VerifyOTP
}