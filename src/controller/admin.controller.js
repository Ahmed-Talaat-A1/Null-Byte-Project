import mysqlConnection from "../configs/db.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken"


// get all users
const getAllUsers = (req,res,next)=>{
    
    mysqlConnection.execute('SELECT user_id,full_name,username,email,role,level_id,signup_date FROM users',(error,data)=>{
        if (error){
            console.log(error);
            return res.status(400).json({message:'an error occured , go to logs to debug it'})
        }
   
        return res.status(200).json({users:data})
    })
}

// add user
const createNewUser = (role,req,res,next)=> {    
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
                        
                        return res.status(500).json({Error:"Error",message:"server error"})
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
const addUser = (req,res,next)=>{
    try {
        const {role} = req.body ;
        if (typeof(role)==='undefined'){
            return res.status(400).json({message:'invalid request'})
        }
        
        
        if (role!=='User'&&role!=='Admin'){
            return res.status(401).json({message:'you are not authorized to create user with this role'})
        }
        createNewUser(role,req,res,next)

    }catch(error){
        console.log(error);
        return res.status(400).json({Error:'invalid request'})
    }
    
}

// get user 
const getUser = (req,res,next)=>{
    const user_id = req.params.id ;    
    mysqlConnection.execute('SELECT user_id,full_name,username,email,role,level_id,signup_date FROM users where user_id = ?',[user_id],(error,data)=>{
        if (error){
            console.log(error);
            return res.status(500).json({status:"error",message:"server error"})
        }
        if (data[0]) {
            return res.status(200).json({user:data[0]})
        }

        return res.status(404).json({status:'Error',message:'user not found or something wrong'})

    })
}


// edite User
const editeUser = (req,res,next)=>{

    try{
        const token = req.cookies.jwt ;
        const decodedToken = jwt.decode(token,{json:true});
        
        mysqlConnection.execute(`SELECT role from users where username = ?`,[decodedToken.username],(error,data)=>{
            if (error){
                console.log(error);
                return res.status(500).json({status:"error",message:"server error"})
                
            }
            const editorRole = data[0].role ;
            const {user_id} = req.body ;

            editeUserLogic(user_id,editorRole,req,res,next);
    
        })
        
    }catch(error){
        console.log(error);
        
        return res.status(400).json({Error:"invalid request"})
    }
    
}
const editeUserLogic = async (user_id,editorRole,req,res,next)=>{
    try {

        const {password,full_name,username,email,role,level} = req.body ;

        if (typeof(username)==='undefined' || typeof(full_name)==='undefined' || typeof(email)==='undefined' || typeof(level)==='undefined'){
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
        
        //check role 
        if (role!=='User' && role!=='Admin') {
            
            return res.status(400).json({status:'Error',message:'invalid role , role must be User or Admin'})
        }

        // check level
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
        
        mysqlConnection.execute(`SELECT role,email,username from users WHERE user_id = ?`,[user_id],(error,data)=>{
            if (error) {
                console.log(error);
                return res.status(500).json({status:'Error',message:'server error please contact owner'})
            }
            
            if (data[0]) {
                const affected_email = data[0].email;
                const affected_username = data[0].username;

                if ( (data[0].role==='Admin' && editorRole!=='Owner') || data[0].role ==='Owner' ) {

                    return res.status(403).json({status:'Error',message:'you are not authorized to edite user with this role'});
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
                    
                    
                    if (password !== null && password !== undefined && password!=="") {
                        //password validator
                        if (typeof(password)!=='string' ){
                            return res.status(400).json({message:'password must be string '})
                        }
                        if (!validator.isStrongPassword(password)||password===null){
                            return res.status(400).json({message:"Password must be strong , length more than 8 and contains at least 1 upper case char and 1 lower case char and 1 symbol "})
                        }
                        // update
                        bcrypt.hash(password,10,(error,hash)=>{

                            mysqlConnection.execute(`UPDATE users SET password = ?,full_name = ?,username = ?,email = ?,role = ?,level_id = ? WHERE user_id = ?`,[hash,full_name,username,email,role,level,user_id],(error,data)=>{
                                if(error){
                                    console.log(error);
                                    return res.status(500).json({status:'Error',message:'server error please contact owner'})
                                }
                                
                                return res.status(200).json({status:'success',message:'user data edited succesfully'})
                            })
                        })
                    }
                    else{

                        mysqlConnection.execute(`UPDATE users SET full_name = ?,username = ?,email = ?,role = ?,level_id = ? WHERE user_id = ?`,[full_name,username,email,role,level,user_id],(error,data)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({status:'Error',message:'server error please contact owner'})
                            }
                            
                            return res.status(200).json({status:'success',message:'user data edited succesfully'})
                        })
                    }
                })
                
            }
            else{
                return res.status(404).json({status:'Error',message:'user not found'});
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'Invalid request or missing parametar'})

    }
}


// delete user 
const deleteUser = (req,res,next)=>{
    try {
        const {username} = req.body ;

        const token = req.cookies.jwt ;
        const decodedToken = jwt.decode(token,{json:true});

        mysqlConnection.execute(`SELECT role from users where username = ?`,[decodedToken.username],(error,data)=>{
            if (error){
                console.log(error);
                return res.status(500).json({status:"error",message:"server error"})
                
            }
            const editorRole = data[0].role ;
            
            mysqlConnection.execute(`SELECT role from users WHERE username = ?`,[username],(error,data)=>{
                if (error) {
                    console.log(error);
                    return res.status(500).json({status:"error",message:"server error"})
                }
                
                if(data[0]){
                    if (data[0].role ==='User'|| (data[0].role ==='Admin'&& editorRole === 'Owner')){
    
                        mysqlConnection.execute(`DELETE from users wHERE username = ?`,[username],(error,data)=>{
                            if (error){console.log(error);
                                    return res.status(500).json({status:"error",message:"server error"})
                            }
    
                            return res.status(200).json({status:'success',message:'User deleted successfully '})
    
                        }) 
                    }
                    else{
                        
                        return res.status(403).json({status:'Error',message:'you are not authorized to delete this user'})
                    }
                }
                else{
    
                    return res.status(404).json({status:'Error',message:'user not found or something wrong'})
                }
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'Invalid request'})
    }
    
}
// user count

export default {editeUser,getUser,addUser,getAllUsers,deleteUser}