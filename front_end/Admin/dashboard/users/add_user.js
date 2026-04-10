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
            
        } catch (error) {
            const after_login_my_profile = document.getElementById('after_login_my_profile')
            const after_login_logout = document.getElementById('after_login_logout')
            after_login_my_profile.remove()
            after_login_logout.remove()
            console.log(error);
    
        }
})

const form = document.querySelector('form')

let password = document.getElementById("password")

let passcheck = document.createElement("h5");
let check = document.createTextNode(`strong password`);


let checkbox =  document.createElement("input");
// checkbox.setAttribute("style","accent-color:rgb(17, 224, 124); border: black 4px outset; border-radiuc:10px; ");
// هتلاقي ف صفحة css 
checkbox.setAttribute("type","checkbox");
checkbox.setAttribute("id","pcheckbox");

checkbox.setAttribute("onclick","return false;");
passcheck.appendChild(check)


document.getElementById("passcheck").appendChild(passcheck)
document.getElementById("passcheck").appendChild(checkbox)

password.onkeyup = function (){
    let passv = password.value;
    let char = 0 ;
    let intg = 0;
    let specialChar = 0;
    let capitalChar = 0

    
    
    for (let i =0;i<passv.length;i++){
        if ((passv[i]>= 'a' && passv[i]<= 'z') ){
            char++;
        }
        else if ((passv[i]>= 'A' && passv[i]<= 'Z')){
            capitalChar ++ ;
        }
        else if ((passv[i]>= '0' && passv[i]<= '9')  ){
            intg++;
        }
        else {
            specialChar++;
        }
        
    }

    if(passv.length!==0){
        
        checkbox.setAttribute("required","");
    }
    if (passv.length===0) {
        checkbox.removeAttribute("required")        
    }

    if (char && specialChar && intg && capitalChar && (specialChar+char+intg+capitalChar>=8)){
        
        checkbox.setAttribute("checked","");
    }
    else {
        checkbox.removeAttribute("checked","");
    }
    
}


// edite user and send it to server 

let i = 0;

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    i++;

    const full_name = form.full_name.value ;
    const username = form.username.value ;
    const email = form.email.value ;
    let level = form.level.value ;
    level = parseInt(level)
    const role = form.role.value ;
    
    const password = form.password.value ;    

    try {
        const result = await fetch('/admin/dashboard/users',{
            method:'Post',
            body : JSON.stringify({
                full_name : full_name ,
                username : username ,
                password : password ,
                email : email ,
                level : level ,
                role : role
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
