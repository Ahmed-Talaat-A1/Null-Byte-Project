import mysqlConnection from "../configs/db.js";

const createExams = (req,res,next)=>{
    try {
        const {exam_name,sub_id,time,q_num,exam_path} = req.body;

        let exam = {
            examName:exam_name,
            subjectId:sub_id,
            time:time,
            questionsNum:q_num,
            examPath : exam_path
        }
        
        for(let i in exam){
            
            if (typeof(exam[i])==='string'||typeof(exam[i])==='int'){
                
                for(let j=0;j<exam[i].length;j++){
                    let char = exam[i][j];
                    
                    if (char==='<'||char==='>'){
                        
                        return res.status(403).json({status:"Error",message:'don\'t try xss , please remove < >'})
                    }
                }
            }
            else{
                console.log('try xss');
                
                return res.status(400).json({status:'Error',message:'invalid data'})
            }
        }

        mysqlConnection.execute(`INSERT INTO exams VALUES(NULL,?,NULL,?,?,?)`,[examName,subjectId,time,questionsNum],(error,data)=>{
            if (error) {
                console.log(error);
                return res.status(500).json({status:"Error",message:"server error"})
            }
            return res.status(200).json({status:"success",message:"Exam added successfully ."})
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}
export default {createExams}