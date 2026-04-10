import mysqlConnection from "../configs/db.js";

const createSubject = (req,res,next)=>{
    try {
        const {subjectName,level,docId} = req.body;
        
        if (subjectName.indexOf('>')!==-1||subjectName.indexOf('<')!==-1||typeof(level)!=='number'||typeof(docId)!=='number'){
            return res.status(403).json({status:'Error',message:'invalid input , Xss detected'});
        }

        

        mysqlConnection.execute('ALTER TABLE subjects AUTO_INCREMENT = 1',(error)=>{ 

            mysqlConnection.execute(`SELECT * from subjects WHERE sub_name = ?`,[subjectName],(error,data)=>{
                    if (error) {
                        console.log(error);
                        return res.status(500).json({status:"Error",message:"server error"})
                    }
        
                    if (!data[0]){

                        mysqlConnection.execute(`INSERT INTO subjects VALUES(NULL,?,?,?)`,[subjectName,level,docId],(error,data)=>{
                            if (error) {
                                console.log(error);
                                return res.status(500).json({status:"Error",message:"server error"})
                            }
                            return res.status(200).json({status:"success",message:"subject added successfully ."})
                        })
                    }
                    else {
                        return res.status(400).json({status:"Error",message:"subject already exist"})
                    }
                })

        })

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}

const getAllSubjects = (req,res,next)=>{
    
    mysqlConnection.execute('SELECT * FROM subjects',(error,data)=>{
        if (error){
            console.log(error);
            return res.status(400).json({message:'an error occured , go to logs to debug it'})
        }
   
        return res.status(200).json({subjects:data})
    })
}

const editeSubject = (req,res,next) =>{
    try {
        const {subjectId,subjectName,level,docId} = req.body;
            
            if (subjectName.indexOf('>')!==-1||subjectName.indexOf('<')!==-1||typeof(level)!=='number'||typeof(docId)!=='number'){
                return res.status(403).json({status:'Error',message:'invalid input , Xss detected'});
            }
    
        mysqlConnection.execute(`UPDATE subjects SET sub_name = ?,level_id = ?,doc_id = ? WHERE sub_id = ?`,[subjectName,level,docId,subjectId],(error,data)=>{
            if(error){
                console.log(error);
                return res.status(500).json({status:'Error',message:'server error please contact owner'})
            }
            
            return res.status(200).json({status:'success',message:'user data edited succesfully'})
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}

// get subject
const getSubject = (req,res,next)=>{
    try {
        const subId = req.params.id ;    
        mysqlConnection.execute('SELECT * FROM subjects where sub_id = ?',[subId],(error,data)=>{
            if (error){
                console.log(error);
                return res.status(500).json({status:"error",message:"server error"})
            }
            if (data[0]) {
                return res.status(200).json({subject:data[0]})
            }
    
            return res.status(404).json({status:'Error',message:'subject not found or something wrong'})
    
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}

const deleteSuject = (req,res,next)=>{
    try {
        const {subjectId} = req.body ;
    
        mysqlConnection.execute(`DELETE from subjects wHERE sub_id = ?`,[subjectId],(error,data)=>{
            if (error){console.log(error);
                    return res.status(500).json({status:"error",message:"server error"})
            }
    
            return res.status(200).json({status:'success',message:'subject deleted successfully '})
    
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}
export default {createSubject,getAllSubjects,editeSubject,getSubject,deleteSuject}