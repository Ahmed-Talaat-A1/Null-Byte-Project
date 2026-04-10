import mysql2 from "mysql2"
import 'dotenv/config';

const mysqlConnection = mysql2.createConnection({
    database : process.env.db_name,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_password
});

mysqlConnection.connect((error)=>{
    if (error){
        console.log("fail to connect DB");
        
    }else{
        console.log('DB success');
        
    }
    
})

export default mysqlConnection ;