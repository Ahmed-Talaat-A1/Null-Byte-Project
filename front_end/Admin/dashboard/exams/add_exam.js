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