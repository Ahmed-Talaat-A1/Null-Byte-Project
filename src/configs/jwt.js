import jwt from "jsonwebtoken"
import 'dotenv/config';

const createJwtToken = (username)=>{
    return jwt.sign({username} , process.env.jwt_secret,{
        expiresIn : 172800000,
    });

}

export default createJwtToken ;