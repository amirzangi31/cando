import {
    checkPhoneNumber,
    successAlert,
  } from "./Services.js";
import { Register } from "./api.js";
  
  
  let form = document.querySelector(".form-signup");
  let userName = document.querySelector("#name-signUp");
  let password = document.querySelector("#password-signUp");
  let confirmPassword = document.querySelector("#confirmPassword-signUP");
  let city = document.querySelector("#phone-number");
  
  userName.focus();
  
  // submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    checkInput(); 
 
    if (!checkInput()) {
      const signUpUser = {
        name: `${userName.value}`,
        phonenumber: `${localStorage.getItem("phoneNumber")}`,
        password: `${password.value}`,
        wallet : 1000
      };
      const result = await Register(signUpUser);
    
      successAlert( "success","عملیات با موفقیت انجام شد");
      
      setTimeout(() => {
        window.location.replace("./log-in.html");
      }, 2000);
    }
  });
  
  // validation inputs
  const checkInput = () => {
    const userNameValue = userName.value.trim();
    const passwordValue = password.value.trim();
    
    const confirmPasswordValue = confirmPassword.value.trim();
  
    
    let errors = {};
  
    if (userNameValue === "") {
      setError(userName, "لطفا نام و نام خانوادگی خود را وارد کنید");
      errors.name = "لطفا نام و نام خانوادگی خود را وارد کنید";
    } else {
      setSuccess(userName);
      delete errors.name;
    }
  
  
  
    if (passwordValue === "") {
      setError(password, "لطفا رمز عبور خود را وارد کنید");
      errors.password = "لطفا نام و نام خانوادگی خود را وارد کنید";
    } else if (passwordValue.length < 8) {
      setError(password, "رمز عبور نباید کمتر از هشت کاراکتر باشد");
      errors.password = "لطفا نام و نام خانوادگی خود را وارد کنید";
    } else {
      setSuccess(password);
      delete errors.password;
    }
  
    if (confirmPasswordValue === "") {
      setError(confirmPassword, "لطفا رمز عبور خود را وارد کنید");
      errors.confirmPassword = "لطفا نام و نام خانوادگی خود را وارد کنید";
    } else if (confirmPasswordValue != passwordValue) {
      setError(confirmPassword, "تکرار رمز عبور رااشتباه وارد کردید ");
      errors.confirmPassword = "لطفا نام و نام خانوادگی خود را وارد کنید";
    } else {
      setSuccess(confirmPassword);
      delete errors.confirmPassword;
    }
    
  
    return !!Object.keys(errors).length;
  };
  
  // set errors
  const setError = (input, message) => {
    const formGroup = input.parentElement;
    const contentFormGroup = formGroup.parentElement;
    const small = contentFormGroup.querySelector("small");
  
    formGroup.classList.add("error");
    small.innerText = message;
  };
  
  // set success
  const setSuccess = (input) => {
    const formGroup = input.parentElement;
    const contentFormGroup = formGroup.parentElement;
    const small = contentFormGroup.querySelector("small");
    formGroup.classList.add("success");
    small.innerText = "";
  };