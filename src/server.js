import express from "express";


const app = express();

const port = 3000 ;

app.listen(port,'test.host',511,()=>{
    console.log(`server is run on port : ${port}`);
})

export default app ;
