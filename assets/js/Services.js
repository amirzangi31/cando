/* ----------------check login---------------------- */
const checkLogin = async (val) => {
  const result = window.localStorage.getItem(`${val}`);
  if (result === null || result === undefined || result === " ") {
    window.location.replace("./log-in.html");
  }
};
/* ----------------check login---------------------- */

/*------------------------check login admin-------------------------- */
const checkLoginAdmin = async (val) => {
  const result = window.localStorage.getItem(`${val}`);
  const res = JSON.parse(window.localStorage.getItem(`${val}`));
  if (
    result === null ||
    result === undefined ||
    result === " " ||
    res.type !== "admin"
  ) {
    window.location.replace("./loginAdmin.html");
  }
};
/*------------------------check login admin-------------------------- */

/*------------------------check login frosh-------------------------- */
const checkLoginFrosh = async (val) => {
  const result = window.localStorage.getItem(`${val}`);
  const res = JSON.parse(window.localStorage.getItem(`${val}`));
  if (
    result === null ||
    result === undefined ||
    result === " " ||
    res.type !== "sales_operator"
  ) {
    window.location.replace("../loginAdmin.html");
  }
};
/*------------------------check login frosh-------------------------- */

/*------------------------check login frosh-admin -------------------------- */
const checkLoginFroshAndAdmin = async (val, type) => {
  const result = window.localStorage.getItem(`${val}`);
  const res = JSON.parse(window.localStorage.getItem(`${val}`));

  if (result === null || result === undefined || result === " ") {
    window.location.replace("./loginAdmin.html");
  }

  if (type === "courier_operator") {
    window.location.replace("./loginAdmin.html");
  }
};
/*------------------------check login frosh-admin -------------------------- */

/*------------------------check login paik-------------------------- */
const checkLoginPaik = async (val) => {
  const result = window.localStorage.getItem(`${val}`);
  const res = JSON.parse(window.localStorage.getItem(`${val}`));

  if (
    result === null ||
    result === undefined ||
    result === " " ||
    res.type !== "courier_operator"
  ) {
    window.location.replace("../loginAdmin.html");
  }
};
/*------------------------check login paik-------------------------- */

/* ----------------exit account---------------------- */
const exitAccount = async () => {
  window.localStorage.removeItem("user");
  window.location.replace("./login.html");
};
/* ----------------exit account---------------------- */

/* ----------------show and close modal---------------------- */
const showModal = (modal) => {
  let contentModal = document.querySelector(`#${modal.id}`);
  contentModal.classList.add("active");
};
const closeModal = (modal) => {
  let contentModal = document.querySelector(`#${modal.id}`);
  contentModal.classList.remove("active");
};
/* ----------------show and close modal---------------------- */

/* ----------------sweet alert---------------------- */

const successAlert = (type, text) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: type,
    title: text,
  });
};
/* ----------------sweet alert---------------------- */

/* ----------------دکمه بازگشت---------------------- */
const backPage = () => {
  history.back();
};
/* ----------------دکمه بازگشت---------------------- */

/* ----------------چک کردن شماره همراه----------------------- */

const checkPhoneNumber = (phone) => {
  const result = PersianTools.phoneNumberValidator(phone);
  return result;
};
/* ----------------چک کردن شماره همراه----------------------- */

/* ----------------چک کردن کد ملی----------------------- */
const checkNotiondalCode = (code) => {
  const result = PersianTools.verifyIranianNationalId(code);
  return result;
};
/* ----------------چک کردن کد ملی----------------------- */

/*-------------clear localstorage---------------*/
const clearLocalStorage = (val) => {
  window.localStorage.removeItem(`${val}`);
};
/*-------------clear localstorage---------------*/

/*-----------------convert hardship-----------------*/

const convertHardship = async (data) => {
  console.log(data);
  switch (data) {
    case "easy": {
      return "آسان";
      break;
    }
    case "hard": {
      return "سخت";
      break;
    }

    default:
      break;
  }
};

/*-----------------convert hardship-----------------*/

/*-----------------convert date-----------------*/

const convertDate = async (date) => {
  const result = moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");

  return result;
};

/*-----------------convert date-----------------*/

/*-----------------package handler-----------------*/
const packageHandler = async (data) => {
  const slice = data.slice(1, data.length - 1);
  const convertToArray = slice.split(",");
  const parseData = convertToArray.map((item) => JSON.parse(item));

  return parseData;
};

/*-----------------package handler-----------------*/


/*-----------------pay handler-----------------*/
// const payHandler = async () =>{
//   successAlert("error" , "لطفا ابتدا سبد خرید قبلی خود را تکمیل  یا حدف کنید")
//   window.scrollTo(0,0)
//   document.querySelector("#order").classList.add("active")
//   setTimeout(() => {
//     document.querySelector("#order").classList.remove("active")
//   }, 3000);
// }
/*-----------------pay handler-----------------*/


/*-----------------short text-----------------*/

const shortText = (data , count)=>{
  console.log(data)
  const text = data.slice(0 , count)
  console.log(text)
  return text
}


/*-----------------short text-----------------*/


export {
  // payHandler,
  shortText,

  // payHandler,
  packageHandler,
  convertDate,
  showModal,
  convertHardship,
  closeModal,
  successAlert,
  backPage,
  checkPhoneNumber,
  checkNotiondalCode,
  clearLocalStorage,
  checkLogin,
  exitAccount,
  checkLoginAdmin,
  checkLoginPaik,
  checkLoginFrosh,
  checkLoginFroshAndAdmin,
};
