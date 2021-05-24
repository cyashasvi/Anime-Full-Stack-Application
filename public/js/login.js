// document.addEventListener("DOMContentLoaded", function() {


<<<<<<< HEAD
const loginFormHandler = async(event) => {
    // event.preventDefault();
    // console.log(event)

    // const email = document.querySelector('#email-login').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
    // console.log(email)
    // console.log(password)
    // if (email && password) {
    //   const response = await fetch('/api/users/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });

    //   if (!response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert('Failed to log in.');
    //   }
    // }
};

const signupFormHandler = async(e) => {
=======
const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log(event)
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email)
    console.log(password)
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async (e) => {
>>>>>>> 9adae500904837b5f6daea22d458751b766484c9
    e.preventDefault();
    console.log(e)
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if (username && email && password) {

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
// });