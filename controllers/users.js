const userModels = require('../model/users');
const bcryptjs = require('bcryptjs');

const CreateNewUser = async (req, res) => {
    try{
        const { username, email, password } = req.body; 

        const result = await userModels.createNewUser({
            username,
            email,
            password: await bcryptjs.hash(password, 10)
        })

        if(result.error){
           return res.json({
                        message: result.error,
                        status: 400
                    })
        }  
        
        res.json({
            message: result.success,
            status: 201
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Gagal membuat akun",
            status: 500,
            error: error.message
        });
    }
}

const LoginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000);

        const hashedOTP = await bcryptjs.hash(otp.toString(), 10);

        const result = await userModels.GetUserByEmail(email, hashedOTP);

        if(result.error){
            return res.status(404).json({
                message: result.error,
                status: 404
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, result.data.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Password salah",
                status: 401
            });
        }

        res.json({
            message: result.success,
            status: 200,
            data: result.data,
            otp: otp
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Gagal login",
            status: 500,
            error: error.message
        });
    }
}

const VerifyOTP = async (req, res) => {
    try{
        const id_user = req.params.id_user;
        const { otp } = req.body;

        const result = await userModels.GetUserById(id_user);

        if(result.error){
            return res.status(404).json({
                message: result.error,
                status: 404
            });
        }

        const isOTPValid = await bcryptjs.compare(otp.toString(), result.data.otp_code);

        if(!isOTPValid){
            return res.status(401).json({
                message: "OTP salah",
                status: 401
            });
        }

        res.json({
            message: result.success,
            status: 200
        })

        await userModels.ResetOtpCode(id_user)
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Gagal verifikasi OTP",
            status: 500,
            error: error.message
        });
    }
}

module.exports = {
    CreateNewUser,
    LoginUser,
    VerifyOTP
}