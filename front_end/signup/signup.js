
let password = document.getElementById("password")

let passcheck = document.createElement("h5");
let check = document.createTextNode(`strong password`);


let checkbox =  document.createElement("input");
// checkbox.setAttribute("style","accent-color:rgb(17, 224, 124); border: black 4px outset; border-radiuc:10px; ");
// هتلاقي ف صفحة css 
checkbox.setAttribute("type","checkbox");
checkbox.setAttribute("id","pcheckbox");
checkbox.setAttribute("required","");
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
    console.log(char);
    console.log(intg);
    console.log(specialChar);
    if (char && specialChar && intg && capitalChar && (specialChar+char+intg+capitalChar>=8)){
        
        checkbox.setAttribute("checked","");
    }
    else {
        checkbox.removeAttribute("checked","");
    }
}

// create new user and send it to server 
const form = document.querySelector('form')
let i = 0;
form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    i++;
    const full_name = form.full_name.value ;
    const username = form.username.value ;
    const email = form.email.value ;
    const password = form.password.value ;
    let level = form.level.value ;
    level = parseInt(level)

    try {
        const result = await fetch('/signup',{
            method:'POST',
            body : JSON.stringify({
                full_name : full_name ,
                username : username ,
                email : email ,
                password : password,
                level : level
            }),
            headers : {'Content-type':'application/json'}
        })

        const message = await result.json();
        console.log(message);
        form.insertAdjacentHTML('beforeend',`<h2 id="message${i}" style="font-size:14px font-weight:100;">${message.message}</h2>`);
        const htmlMessage = document.getElementById(`message${i}`)
        setTimeout(()=>{
            htmlMessage.remove()
        },5000)
        
    } catch (error) {

        console.log(error);

    }

})




