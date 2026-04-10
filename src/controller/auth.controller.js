import mysqlConnection from "../configs/db.js";
import bcrypt from "bcrypt";
import createJwtToken from "../configs/jwt.js";
import validator from 'validator';


const signup = (req,res,next)=> {
    const role = 'User';
    
    try {
        
        
        const {username,full_name,email,level,password} = req.body ;
        
        
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
        
        //password validator
        if (typeof(password)!=='string' ){
            return res.status(400).json({message:'password must be string '})
        }
        if (!validator.isStrongPassword(password)||password===null){
            return res.status(400).json({message:"Password must be strong , length more than 8 and contains at least 1 upper case char and 1 lower case char and 1 symbol "})
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
        
        // check if username or email used befor
        mysqlConnection.execute(`select username,email from users where email = ? OR username = ? ` ,[email,username],(error,data)=>{
            
            for (let row of data){
                if (row.email===email){
                        return res.status(400).json({message:"invalid email , try another email "});
                }
                if(row.username===username){
                    
                    return res.status(400).json({message:"invalid username , try another username "});
                }

            }
            
            //reset auto increment
            mysqlConnection.execute('ALTER TABLE users AUTO_INCREMENT = 1',(error)=>{
                if(error)console.log(error);
            })
            
            // hashing password and stor user info
            bcrypt.hash(password,10,(error,hash)=>{
                
                mysqlConnection.execute(`INSERT INTO users VALUES(NULL,?,?,?,?,?,NULL,?)`,[full_name,username,role,email,hash,level] , (error)=>{
                    if (error){
                        console.log(error);
                        
                        return res.status(500).json({status:"Error",message:"server error"})
                    }
                    
                    return res.status(201).json({status:'success', message:"account created successfuly go to login"})
                    
                })
            })
        })
    }
    catch(error){
        console.log(error);
        
        return res.status(400).json({Error:'invalid request'})
    }
}

const login = (req,res,next)=>{
    try {
        
        const {username,password} = req.body ;
        if (typeof(password)!=='string'||typeof(username)!=='string'){
            return res.status(400).json({message:'invalid request or missing prametar'})
        }
    
        let selectStatment = '';
        if (username.indexOf('@')!==-1){
            selectStatment = `SELECT username,password from users where email = ?`
        }
        else { 
            selectStatment = `SELECT username,password from users where username = ?`
        }

        mysqlConnection.execute(selectStatment,[username],(error,data)=>{
            
            if (error){
                console.log(error);
                
                return res.status(400).json({Error:'invalid request'});
            }
            if (data[0]!==undefined){
                
                // compare password
                bcrypt.compare(password,data[0].password,(err,result)=>{
                    if(err){
                        
                        console.log(err);
                        return res.status(400).json({message:'invalid request'})
                    }
                    if (result){
                        //create and send jwt on cookie
                        res.cookie('jwt',createJwtToken(data[0].username),{httpOnly:true,maxAge:1000*24*60*60*2})
                        
                        return res.status(200).json({status:'success',message:'logged in succesfully'});
                    }
                    else{
                        return res.status(404).json({status:'error',message:'invalid email or password , try singup or forget my password if you sure you have an account'})
                    }
                })
            }
            else{
                return res.status(404).json({message:'invalid email or password , try singup or forget my password if you sure you have an account'})
            }
    
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'invalid request'})
        
    }
}

const logout = (req,res,next)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
    
}



export default {login,signup,logout} ;