import mysqlConnection from "../configs/db.js";

const addDoc = (req,res,next)=>{
    try {
        const {docName} = req.body;

        if(docName.indexOf('>')!==-1||docName.indexOf('<')!==-1||typeof(docName)!=='string'){
            return res.status(400).json({status:'Error',message:'invalid doctor name '})
        }

        mysqlConnection.execute('ALTER TABLE doctors AUTO_INCREMENT = 1',(error)=>{
                if(error)console.log(error);
                mysqlConnection.execute(`SELECT * from doctors WHERE doc_name = ?`,[docName],(error,data)=>{
                    if (error) {
                        console.log(error);
                        return res.status(500).json({status:"Error",message:"server error"})
                    }
        
                    if (!data[0]){
        
                
                        mysqlConnection.execute(`INSERT INTO doctors VALUES(NULL,?)`,[docName],(error,data)=>{
                            if (error) {
                                console.log(error);
                                return res.status(500).json({status:"Error",message:"server error"})
                            }
                            return res.status(201).json({status:"success",message:"Doctor added successfully ."})
                        })
                    }
                    else {
                        return res.status(400).json({status:"Error",message:"doctor already exist"})
                    }
                })
        })
        
        
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}

const getAllDocs = (req,res,next)=>{
    try {
        
        mysqlConnection.execute(`SELECT * from doctors`,(error,data)=>{
            if (error) {
                console.log(error);
                return res.status(500).json({status:"Error",message:"server error"})
            }
            return res.status(200).json({doctors:data})
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}

const deleteDoc = (req,res,next)=>{
    try {
        
        const {doc_id} = req.body ;
    
        mysqlConnection.execute(`DELETE FROM doctors WHERE doc_id = ?`,[doc_id],(error,data)=>{
            if (error){console.log(error);
                    return res.status(500).json({status:"error",message:"server error"})
            }

            console.log(data.affectedRows);
            if (data.affectedRows <1){

                return res.status(200).json({status:'Error',message:'Doctor Not Found'})

            }
            return res.status(200).json({status:'success',message:'Doctor deleted successfully '})
        })

    } catch (error) {
        console.log(error);;
    }
}

export default {addDoc,getAllDocs,deleteDoc}