

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

            const docs = await fetch('/admin/dashboard/doctors',{
                method : 'GET'
            })
            const docs_data = await docs.json();
            
            const doc_list = document.getElementById('doctors')
            
            for (let i of docs_data.doctors){
                
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


const form = document.querySelector('form');
let i = 0;
form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    i++;
    try {
        const sub_name = form.sub_name.value ;
        let level = form.level.value ;
        let doc_id = form.doc_id.value ;
        level = parseInt(level)
        doc_id = parseInt(doc_id)
        const result = await fetch('/admin/dashboard/subject',{
            method:'Post',
            body : JSON.stringify({
                subjectName : sub_name ,
                docId : doc_id ,
                level : level 
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

