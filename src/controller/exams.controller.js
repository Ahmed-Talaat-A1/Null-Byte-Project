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
            
            if (typeof(exam[i])==='string'||typeof(exam[i])==='int'||typeof(exam[i])==='number'){
                
                for(let j=0;j<exam[i].length;j++){
                    let char = exam[i][j];
                    
                    if (char==='<'||char==='>'){
                        
                        return res.status(403).json({status:"Error",message:'don\'t try xss , please remove < >'})
                    }
                }
            }
            else{
                console.log(typeof(exam[i]));
                                
                return res.status(400).json({status:'Error',message:'invalid data'})
            }
        }
        mysqlConnection.execute('SELECT * from subjects WHERE sub_id = ?',[exam.subjectId],(error,data)=>{            
            if (error||!data[0])  return res.status(400).json({status:'Error',message:'invalid subject id'})


            mysqlConnection.execute('ALTER TABLE doctors AUTO_INCREMENT = 1',(error)=>{

                mysqlConnection.execute(`SELECT * from exams WHERE exam_name = ?`,[exam.examName],(error,data)=>{

                    if (error) {
                        console.log(error);
                        return res.status(500).json({status:"Error",message:"Server error"})
                    }
        
                    if (!data[0]){
        
                
                        mysqlConnection.execute(`INSERT INTO exams VALUES(NULL,?,NULL,?,?,?,?)`,[exam.examName,exam.subjectId,exam.time,exam.questionsNum,exam.examPath],(error,data)=>{
                        if (error) {
                            console.log(error);
                            return res.status(500).json({status:"Error",message:"Server Error"})
                        }
                        return res.status(201).json({status:"success",message:"Exam added successfully ."})

                        })
                    }
                    else {
                        return res.status(400).json({status:"Error",message:"Exam already exist"})
                    }

                })

            })
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:'Error',message:'invalid request'});
    }
}
export default {createExams}