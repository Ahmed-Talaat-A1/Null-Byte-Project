

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
            
            document.getElementById('name').innerText = user_data.user[0].full_name;
            document.getElementById('username').innerText = user_data.user[0].username;
            document.getElementById('user_email').innerText = user_data.user[0].email;
            document.getElementById('level').innerText = user_data.user[0].level_id;
            document.getElementById('role').innerText = user_data.user[0].role;
            document.getElementById('signup_date').innerText = user_data.user[0].signup_date;
            
        } catch (error) {
            const after_login_my_profile = document.getElementById('after_login_my_profile')
            const after_login_logout = document.getElementById('after_login_logout')
            after_login_my_profile.remove()
            after_login_logout.remove()
            console.log(error);
    
        }
})

const delete_btn = document.getElementById('delete_btn')
let i =0;
delete_btn.addEventListener('click',async ()=>{
    i++;
    alert('are you sure you want to delete you account in our project ?? \n please tel admins or owner why you delete your account')
    const result = await fetch('/me',{
        method:'DELETE'
    })
    const message = await result.json();
    const dev = document.getElementById('user_info');
    dev.insertAdjacentHTML('beforeend',`<h2 id="message${i}" style="font-size:14px font-weight:100;">${message.message}</h2>`);
    const htmlMessage = document.getElementById(`message${i}`)
    setTimeout(()=>{
        htmlMessage.remove()
    },3000)
    
    if (message.status==='success'){
        location.href = '/logout';
    }
    
})
