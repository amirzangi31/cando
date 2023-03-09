import { successAlert } from "../Services.js";
import { LoginAdmin, adminWithToken } from "../api.js";

/*------------------Login admin and oprator-----------------------*/

const btn_login = document.querySelector("#btn-login");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");

btn_login.addEventListener("click", async (e) => {
  btn_login.setAttribute("disabled", true);
  btn_login.style.opacity = "0.3";
  e.preventDefault();
  const data = {
    phonenumber: `${phone.value}`,
    password: `${password.value}`,
  };

  const result = await LoginAdmin(data);
  const admin = await adminWithToken(result.token);

  if (!admin.length) {
    successAlert("error", "ادمین یافت نشد");
    btn_login.removeAttribute("disabled");
    btn_login.style.opacity = "1";
  }
  window.localStorage.setItem("token-admin" , result.token)
  if (admin[0].type === "admin") {

    console.log("admin");
    window.location.replace("./home.admin.html")
  } else {

    console.log("oprator");
    window.location.replace("./home.admin.html")
  }
});

/*------------------Login admin and oprator-----------------------*/
