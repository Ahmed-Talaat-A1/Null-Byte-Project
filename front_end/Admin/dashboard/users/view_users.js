
let d = document.createElement("div");
d.className = "proj";
document.body.appendChild(d);
let h3 = document.createElement("h3");
let h33 = document.createTextNode(` users :-`);
h3.appendChild(h33);
d.appendChild(h3);
h3.style.cssText = "  font-size: 24px; margin-left:0px; font-weight:bolder; font-family:monospace;";



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
        if(user_data.user[0].role!=='user'){
            document.getElementById('div_account').insertAdjacentHTML('afterbegin',`<a href="/admin/dashboard/" > ${user_data.user[0].role}</a>`);

        }

        // get users
        const users = await fetch('/admin/dashboard/users',{
            method:'GET'
        })
        const users_data = await users.json()
        
        
        for (let i of users_data.users){
            
            let pj = document.createElement("div");

            pj.className = `usr-${i.user_id}`;
            pj.id = `usr-${i.user_id}`;
            
            d.appendChild(pj);
            
            pj.style.cssText =" display: inline-block; margin:30px; border: rgb(90, 90, 90) 4px outset; width:400px; min-height: 300px; box-shadow:2px 4px 10px 4px rgb(113, 115, 115); border-radius: 10px; "
            
            let h = document.createElement("h2");
            h.style.cssText = `margin : 10px; margin-left:20px;  font-size: 20px; `;
            let hh = document.createTextNode(`User ${i.user_id}`);
            pj.appendChild(h);
            h.appendChild(hh);

            for (let [key,value] of Object.entries(i)){
                let p = document.createElement("p");
                p.style.cssText = "margin-left : 30px; font-size:17px"
                let content = document.createTextNode(`${key} : ${value}`);
                pj.appendChild(p);
                p.appendChild(content);
            }
            let btnDiv = document.createElement("div");
            btnDiv.style.cssText = 'display : flex; align-items:center;';

            let editeBtn = document.createElement('button')
            editeBtn.innerText = 'Edite'
            editeBtn.style.cssText = 'cursor: pointer;font-weight: bold;font-size: large;color: rgb(247, 247, 247);background-color: lightblue; margin-top: 60px; margin-left: 10px;width: 50px;height: 35px;border-width: 0px;border-style: outset;border-radius: 5px;box-shadow: 2px 2px 4px 2px rgba(155, 187, 184, 0.347);';
            btnDiv.appendChild(editeBtn)

            editeBtn.addEventListener('click',async () => {
                location.href = `http://test.host:3000/admin/dashboard/edite_users/${i.user_id}`
            })


            let h3Message = document.createElement('h3')
            h3Message.id = `h3Message-${i.user_id}`
            h3Message.style.cssText = 'width:230px; margin-left: 50px;'
            btnDiv.appendChild(h3Message)

            let delBtn = document.createElement('button')
            delBtn.innerText = 'Delete';
            delBtn.style.cssText = 'cursor: pointer;font-weight: bold;font-size: large;color: rgb(247, 247, 247);background-color: red; margin-top: 60px;width: 50px;height: 35px;border-width: 0px;border-style: outset;border-radius: 5px;box-shadow: 2px 2px 4px 2px rgba(155, 187, 184, 0.347);';
            btnDiv.appendChild(delBtn);
            
            delBtn.addEventListener('click',async () => {
                const result = await fetch('/admin/dashboard/users',{
                    method:'DELETE',
                    body : JSON.stringify({
                        
                        username : i.username 
                        
                    }),
                    headers : {'Content-type':'application/json'}
                })

                const message = await result.json();
                console.log(message);
                h3Message.innerText= `${message.message}`;
                const htmlMessage = document.getElementById(`h3Message-${i.user_id}`)
                setTimeout(()=>{
                    h3Message.innerText = '';
                },3000)
            })
            pj.appendChild(btnDiv)
        }

        d.style.cssText ="margin-left:70px; "
            
    } catch (error) {
        const after_login_my_profile = document.getElementById('after_login_my_profile')
        const after_login_logout = document.getElementById('after_login_logout')
        after_login_my_profile.remove()
        after_login_logout.remove()
        console.log(error);

    }
})

