// LOGIN FORM VALIDATION

//store email and password in local storage
// localStorage.setItem('email', 'bosco@email.com');
// localStorage.setItem('password', 'Admin@123!');

function validateLoginForm() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let emailValid = true;
  let passwordValid = true;
  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  let isValid = false;

  let isEmailValid = false;
  let isPasswordValid = false;

  // Check if email is in the correct format

  if (!email) {
    emailValid = false;
    emailError.innerHTML = 'Email is required';
  } else if (email.length < 6) {
    emailError.innerHTML = 'Email is too short';
    isValid = false;
  } else if (email.length > 125) {
    emailError.innerHTML = 'Email is too long';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailError.innerHTML = 'Please enter a valid email address';
    isValid = false;
  } else {
    emailError.innerHTML = '';
    isEmailValid = true;
  }

  // Check if password meets certain requirements
  if (!password) {
    passwordValid = false;
    passwordError.innerHTML = 'Password is required';
  } else if (password.length < 6) {
    passwordError.innerHTML = 'Password is too small';
    isValid = false;
  } else if (password.length > 125) {
    passwordError.innerHTML = 'Password is too long';
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    passwordError.innerHTML = 'Password is invalid';
    isValid = false;
  } else {
    passwordError.innerHTML = '';
    isPasswordValid = true;
  }

  if (isPasswordValid && isEmailValid) {
    preload.style.display = 'flex';
    axios
      .post('https://brand-q646.onrender.com/api/v1/users/login', {
        email: email,
        password: password,
      })
      .then((reponse) => {
        loginErrorMessage.innerHTML = 'Valid Login Credentials';
        isValid = true;
        localStorage.setItem('token', reponse.data.token);
        window.location.href = '/dashboard.html';
      })
      .catch((error) => {
        loginErrorMessage.innerHTML = error.response.data.message;
        isValid = false;
        preload.style.display = 'none';
      });
  }
  return isValid;
}

function showHidePassword() {
  let password = document.getElementById('password');
  let checkbox = document.getElementById('showPassword');
  if (checkbox.checked) {
    password.setAttribute('type', 'text');
  } else {
    password.setAttribute('type', 'password');
  }
}
