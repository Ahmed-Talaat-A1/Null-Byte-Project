window.addEventListener('load',async(e)=>{

    try {
            const result = await fetch('/me',{
                method:'GET'
            })
            
    
            const user_data = await result.json();
            if (user_data.status==='success'){
                document.getElementById('reg_login').remove();
                document.getElementById('reg_signup').remove();
                
            }
            
            const navigator = document.getElementById('nav')
            navigator.insertAdjacentHTML('beforeend',`<h2 id="welcom" style="font-size:14px font-weight:100; font-family:monospace; width:fit-content; position:relative; left: 60px; bottom:30px;"> Wellcom ${user_data.user[0].full_name}</h2>`);
            if(user_data.user[0].role!=='User'){
                document.getElementById('div_account').insertAdjacentHTML('afterbegin',`<a href="/admin/dashboard/" > ${user_data.user[0].role}</a>`);

            }

            const docs = await fetch('/admin/dashboard/doctors',{
                method : 'GET'
            })
            const docs_data = await docs.json();
            
            const doc_list = document.getElementById('doc_id')

            for (let i of docs_data.data){
                
                const optionChild = document.createElement('option')
                optionChild.innerText = i.doc_name;
                optionChild.value = i.doc_id
                const option = doc_list.append(optionChild)
            }
            
        } catch (error) {
            const after_login_my_profile = document.getElementById('after_login_my_profile')
            const after_login_logout = document.getElementById('after_login_logout')
            after_login_my_profile.remove()
            after_login_logout.remove()
            console.log(error);
    
        }
})

const form = document.querySelector('form')


// edite subject and send it to server 
window.addEventListener('load',async(e)=>{
    
    const subject = await fetch(`/admin/dashboard/get_subject/${location.href.substring(location.href.lastIndexOf('/') + 1)}`,{
        method:'GET'
    })
    
    const subject_data = await subject.json()
    
    console.log(subject_data.subject);
    form.sub_name.setAttribute('value',subject_data.subject.sub_name)
    form.level.setAttribute('value',subject_data.subject.level_id)
    form.doc_id.setAttribute('value',subject_data.subject.doc_id)


})

    
let i = 0;
form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    i++;

    const sub_id = parseInt(location.href.substring(location.href.lastIndexOf('/') + 1));
    const sub_name = form.sub_name.value ;
    let level = form.level.value ;
    level = parseInt(level)
    let doc_id = form.doc_id.value ;
    doc_id = parseInt(doc_id)
       

    try {
        const result = await fetch('/admin/dashboard/subject',{
            method:'PUT',
            body : JSON.stringify({
                subjectId : sub_id ,
                subjectName : sub_name ,
                level : level ,
                docId : doc_id
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
