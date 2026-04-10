import Router from "express";
import { auth } from "../middlewares/auth.js";
import adminCheck from "../middlewares/adminCheck.js";
import fs from "node:fs"

const router = Router ();

// home page
router.get("/",(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/index.html')
    return res.send(page)
    
})
router.get('/index.js',(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/index.js')
    return res.send(page)
})


//favicon
router.get('/favicon.ico',(req,res,next)=>{
    const page = fs.readFileSync('./front_end/HackerOne.png')
    return res.send(page)
})

router.get('/main.css',(req,res,next)=>{
    res.setHeader('content-type','text/css')
    const page = fs.readFileSync('./front_end/main.css',{encoding:'utf-8',flag:'r'})
    return res.send(page)
})

// signup
router.get("/signup", (req,res,next)=>{
    const page = fs.readFileSync('./front_end/signup/signup.html',{encoding:'utf-8',flag:'r'})
    return res.send(page)
})
router.get('/signup.js',(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/signup/signup.js')
    return res.send(page)
})

// login
router.get("/login",(req,res,next)=>{
    const page = fs.readFileSync('./front_end/login/login.html',{encoding:'utf-8',flag:'r'})
    return res.send(page)

})
router.get('/login.js',(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/login/login.js')
    return res.send(page)
})

//my acc
router.get("/profile",auth,(req,res,next)=>{
    
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/my_profile/profile.html')
    return res.send(page)
})
router.get('/profile.js',auth,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/my_profile/profile.js')
    return res.send(page)
})

// edite my acc
router.get("/profile/edite",auth,(req,res,next)=>{
    
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/my_profile/Edite/Edite.html')
    return res.send(page)
})
router.get('/profile/edite.js',auth,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/my_profile/Edite/Edite.js')
    return res.send(page)
})

// admin 

// dashboard
router.get("/Admin/dashboard",auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/Admin/dashboard/dashboard.html')
    return res.send(page)
    
})
router.get('/Admin/dashboard.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/Admin/dashboard/dashboard.js')
    return res.send(page)
})


// users 
//   veiw users
router.get('/admin/dashboard/view_users',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/users/view_users.html')
    return res.send(page)

})
router.get('/admin/dashboard/view_users.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/users/view_users.js')
    return res.send(page)

})

// admin add user 
router.get('/admin/dashboard/add_user/',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/users/add_user.html')
    return res.send(page)

})
router.get('/admin/dashboard/add_user.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/users/add_user.js')
    return res.send(page)

})

// admin edite user 
router.get('/admin/dashboard/edite_users/:id',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/users/edite_users.html')
    return res.send(page)

})
router.get('/admin/dashboard/edite_users.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/users/edite_users.js')
    return res.send(page)

})


// doctors

// add doctor
router.get('/admin/dashboard/add_doc',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/doctors/add_doc.html')
    return res.send(page)

})
router.get('/admin/dashboard/add_doc.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/doctors/add_doc.js')
    return res.send(page)

})

//   veiw doctors
router.get('/admin/dashboard/view_docs',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/doctors/view_docs.html')
    return res.send(page)

})
router.get('/admin/dashboard/view_docs.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/doctors/view_docs.js')
    return res.send(page)

})


// exams

// add exam
router.get('/admin/dashboard/add_exam',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/exams/add_exam.html')
    return res.send(page)

})
router.get('/admin/dashboard/add_exam.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/exams/add_exam.js')
    return res.send(page)

})

//   veiw exams
router.get('/admin/dashboard/view_exams',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/exams/view_exams.html')
    return res.send(page)

})
router.get('/admin/dashboard/view_exams.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/exams/view_exams.js')
    return res.send(page)

})

// subjectss

// add subject
router.get('/admin/dashboard/add_subject',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/subjects/add_subject.html')
    return res.send(page)

})
router.get('/admin/dashboard/add_subject.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/subjects/add_subject.js')
    return res.send(page)

})

// view subjects
router.get('/admin/dashboard/view_subjects',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/subjects/view_subjects.html')
    return res.send(page)

})
router.get('/admin/dashboard/view_subjects.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/subjects/view_subjects.js')
    return res.send(page)

})

// edite subject
router.get('/admin/dashboard/edite_subject/:id',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/html')
    const page = fs.readFileSync('./front_end/admin/dashboard/subjects/edite_subject.html')
    return res.send(page)

})
router.get('/admin/dashboard/edite_subject.js',auth,adminCheck,(req,res,next)=>{
    res.setHeader('content-type','text/javascript')
    const page = fs.readFileSync('./front_end/admin/dashboard/subjects/edite_subject.js')
    return res.send(page)

})


export default router;
