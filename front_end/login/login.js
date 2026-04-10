const form = document.querySelector('form');

let i = 0;
form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    i++ ;
    const email = form.email.value ;
    const password = form.password.value ;

    try {
        const result = await fetch('/login',{
            method:'POST',
            body : JSON.stringify({
                username : email ,
                password : password
            }),
            headers : {'Content-type':'application/json'}
        })
        
        const message = await result.json();
        console.log(message);
        if (message.status==='success'){
            location.assign('/')
        }
        form.insertAdjacentHTML('beforeend',`<h2 id="message${i}" style="font-size:14px">${message.message}</h2>`);
        const htmlMessage = document.getElementById(`message${i}`)
        setTimeout(()=>{
            htmlMessage.remove()
        },4000)
    } 
    catch (error) {
        console.log(error);
        
    }
    
})