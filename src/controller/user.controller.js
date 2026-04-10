import mysqlConnection from "../configs/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import validator from 'validator';
import cookieParser from "cookie-parser";

const getMe = (req,res,next)=>{
    try{
        const token = req.cookies.jwt ;
        const decodedToken = jwt.decode(token,{json:true});
        
        mysqlConnection.execute(`SELECT full_name,user_id,username,email,signup_date,level_id,role from users where username = ?`,[decodedToken.username],(error,data)=>{
            if (error){
                console.log(error);
                return res.status(500).json({status:"error",message:"server error"})
                
            }
            return res.status(200).json({status:"success",user:data})
        })
        
    }catch(error){
        console.log(error);
        
        return res.status(400).json({status:"error",message:"Bad Request"})
    }
}

const putMe = (req,res,next)=>{
    try {
        const token = req.cookies.jwt ;
        const decodedToken = jwt.decode(token,{json:true});
        const {full_name,username,email,password,level} = req.body ;
        if (typeof(username)==='undefined' || typeof(full_name)==='undefined' || typeof(email)==='undefined' || typeof(level)==='undefined'||typeof(password)==='undefined'){
            return res.status(400).json({status:'invalid request or missing parametares'})
        }
        
        if (typeof(username)!=='string' || (username.length > 20 || username.length <3)){
            return res.status(400).json({message:'username must be string between 3 : 20 char '})
        }
        if (typeof(full_name)!=='string' || (full_name.length > 20 || full_name.length <3)){
            return res.status(400).json({message:'full name must be string between 3 : 20 char '})
        }
        
        // email validator
        if (typeof(email)!=='string' ){
            return res.status(400).json({message:'Email must be string '})
        }
        if (!validator.isEmail(email)|| email.indexOf('+')!==-1||email.indexOf("'")!==-1){
            return res.status(400).json({message:'Please enter valid email'})
        }
        
        
        if (typeof(level)!=='number' || (level>4 || level<1) ){
            return res.status(400).json({message:'level must be num between 1 : 4 '})
        }
        
        let user = {
            full_name:full_name,
            username:username,
            email:email,
            level:level
        }
        
        for(let i in user){
            
            if (typeof(user[i])==='string'){
                
                for(let j=0;j<user[i].length;j++){
                    let char = user[i][j];
                    
                    if (char==='<'||char==='>'){
                        
                        return res.status(403).json({message:'don\'t try xss , please remove < >'})
                    }
                }
            }
        }
        
        mysqlConnection.execute(`select email from users where username = ? `,[decodedToken.username],(error,data)=>{
            if (error){
                console.log();
                return res.status(500).json({status:'Error',message:'server error please contact owner'})
            }
            let affected_username = '' ;
            let affected_email = '';
            if (data[0]){

                affected_username = decodedToken.username ;
                affected_email = data[0].email;
                
            }
            
            mysqlConnection.execute(`select username,email from users where email = ? OR username = ? ` ,[email,username],(error,data)=>{
                        
                //check is username exist befor or email exist befor
                for (let row of data){
                    if (row.email === email && row.email !== affected_email){
                            return res.status(400).json({message:"invalid email , try another email "});
                    }
                    if(row.username === username && row.username !== affected_username){
                        
                        return res.status(400).json({message:"invalid username , try another username "});
                    }

                }
                if (password!==null && password!==undefined &&password!=="") {
                    //password validator
                    if (typeof(password)!=='string' ){
                        return res.status(400).json({message:'password must be string '})
                    }
                    if (!validator.isStrongPassword(password)||password===null){
                        return res.status(400).json({message:"Password must be strong , length more than 8 and contains at least 1 upper case char and 1 lower case char and 1 symbol "})
                    }
                    bcrypt.hash(password,10,(error,hash)=>{

                        mysqlConnection.execute(`UPDATE users SET password = ?,full_name = ?,username = ?,email = ?,level_id = ? WHERE username = ?`,[hash,full_name,username,email,level,decodedToken.username],(error,data)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({status:'Error',message:'server error please contact owner'})
                            }
                            
                            return res.status(200).json({status:'success',message:'your data and password updated succesfully'})
                        })
                    })
                }
                else{
                    mysqlConnection.execute(`UPDATE users SET full_name = ?,username = ?,email = ?,level_id = ? WHERE username = ?`,[full_name,username,email,level,decodedToken.username],(error,data)=>{
                        if(error){
                            console.log(error);
                            return res.status(500).json({status:'Error',message:'server error please contact owner'})
                        }
                        
                        return res.status(200).json({status:'success',message:'your data updated succesfully'})
                    })

                }
            })
        })

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({status:'Error',message:'Invalid request or missing prametar'})
    }

}

const deleteMe = (req,res,next)=>{

    const token = req.cookies.jwt;
    const decodedToken = jwt.decode(token,{json:true})    
    mysqlConnection.execute(`DELETE from users wHERE username = ?`,[decodedToken.username],(error,data)=>{
        if (error){
            console.log(error);
            return res.status(500).json({status:"error",message:"server error"})
        }

        return res.status(200).json({status:'success',message:'user deleted successfully '})

    })
}

export default {getMe,putMe,deleteMe};