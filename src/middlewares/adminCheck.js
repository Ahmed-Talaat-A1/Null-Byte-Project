import mysqlConnection from "../configs/db.js";
import jwt from "jsonwebtoken"

//check roles
const adminCheck = (req,res,next)=>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,'no chill',(error,decodedToken)=>{
            if (error){
                console.log(error);
                return res.redirect('/login')
            }
            else{
                mysqlConnection.execute(`SELECT role from users where username = ?`,[decodedToken.username],(error,data)=>{
                    if(error){
                        console.log(error);
                        return res.status(401).json({status:'error',message:'you are not authorized to do this request'})
                    }
                    if (data.length>=1){
                        if(data[0].role==='Admin'||data[0].role==='Owner'){
                            next();
                        }
                        else {
                            return res.status(401).json({status:'error',message:'you are not authorized to do this request'})
                        }
                    }
                    else {
                        return res.status(400).json({status:'error',message:'invalid request'})
                    }
                })
                
            }
        })
    }
    else {
        return res.redirect('/login')
    }
}
export default adminCheck;