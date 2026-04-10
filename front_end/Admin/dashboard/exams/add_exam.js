window.addEventListener('load',async(e)=>{

    try {
            const result = await fetch('/me',{
                method:'GET'
            })
            
    
            const user_data = await result.json();
            console.log(user_data);
            if (user_data.status==='success'){
                document.getElementById('reg_login').remove();
                document.getElementById('reg_signup').remove();
                
            }
            
            const navigator = document.getElementById('nav')
            navigator.insertAdjacentHTML('beforeend',`<h2 id="welcom" style="font-size:14px font-weight:100; font-family:monospace; width:fit-content; position:relative; left: 60px; bottom:30px;"> Wellcom ${user_data.user[0].full_name}</h2>`);
            if(user_data.user[0].role!=='User'){
                document.getElementById('div_account').insertAdjacentHTML('afterbegin',`<a href="/admin/dashboard/" > ${user_data.user[0].role}</a>`);

            }
            
        } catch (error) {
            const after_login_my_profile = document.getElementById('after_login_my_profile')
            const after_login_logout = document.getElementById('after_login_logout')
            after_login_my_profile.remove()
            after_login_logout.remove()
            console.log(error);
    
        }
})

// add exam and send it to server 
const form = document.querySelector('form')
let i = 0;

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    i++;

    const exam_name = form.exam_name.value ;
    const sub_id = form.sub_id.value ;
    const q_num = form.q_num.value ;
    const exam_path = form.exam_path.value ; /* check path travirsal */
    var time = form.time.value ; 
    time = parseInt(time);
    q_num = parseInt(q_num);
    
    try {
        const result = await fetch('/admin/dashboard/exams',{
            method:'Post',
            body : JSON.stringify({
                docName : exam_name ,
                sub_id : sub_id,
                q_num : q_num ,
                exam_path : exam_path ,
                time : time 

            }),
            headers : {'Content-type':'application/json'}
        })

        const message = await result.json();
        form.insertAdjacentHTML('beforeend',`<h2 id="message${i}" style="font-size:14px font-weight:100;">${message.message}</h2>`);
        const htmlMessage = document.getElementById(`message${i}`)
        setTimeout(()=>{
            htmlMessage.remove()
        },3000)
        
    } catch (error) {

        console.log(error);

    }

})