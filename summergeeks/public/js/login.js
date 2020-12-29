let signinForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signinForm.addEventListener('submit', function(e){

    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let name = document.querySelector('#sign-in-name').value;
    let phone = document.querySelector('#sign-in-phone').value;




    fetch('http://localhost:3000/users/login',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({email , name , phone})
    }).then((resp)=>
    {
        if(resp.status === 400)
        throw new Error();
        return resp.json();
    })
    .then((data)=>
     { window.location.href = data.redirectURL })
     .catch(()=>alert('Wrong Email or Password !'));



})
registerForm.addEventListener('submit', function(e){

    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let name= document.querySelector('#register-name').value;
    let phone = document.querySelector('#register-phone').value;

    fetch('http://localhost:3000/users/register',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({email , name ,phone})
    }).then((resp)=>resp.text()).then((data)=>alert(data));



})
