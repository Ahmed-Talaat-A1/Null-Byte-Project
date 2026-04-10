//auth 
import mysqlConnection from "../configs/db.js";
import jwt from "jsonwebtoken"

const auth = (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.decode(token,{json:true});        
        if (!token) return res.redirect('/login')

        mysqlConnection.execute(`SELECT user_id from users where username = ?`,[decodedToken.username],(error,data)=>{
            if (error){
                console.log(error);
                return res.status(500).json({Error:"Error",message:"server error"});
            } 
            
            if (token && data[0]){
                jwt.verify(token,'no chill',(error,decodedToken)=>{
                    if (error){
                        console.log(error);
                        return res.redirect('/login')
                    }
                    else{  
                        next();
                    }
                })
            }
            else {                
                return res.redirect('/login')
            }
        })
    } catch (error) {
        console.log(error);

        return res.status(400).json({Error:"Error",message:"Bad request"})
    }
}




export  {auth} ;