import { addOprator, validateLoginAdmin } from "../api.js";
await validateLoginAdmin()

/*----------------------add oprator frosh-------------------------*/
const btn_add_frosh = document.querySelector("#btn-add-frosh");
const nameF = document.querySelector("#name-f");
const codeF = document.querySelector("#code-f");
const addressF = document.querySelector("#address-f");
const passwordF = document.querySelector("#password-f");
const cityF = document.querySelector("#city-f");
const phoneF = document.querySelector("#phone-f");
btn_add_frosh.addEventListener("click", async () => {
  const pass = passwordF.value;
  const result = pass.toString();

  const data = {
    name: nameF.value,
    nationalcode: codeF.value,
    phonenumber: phoneF.value,
    type: "frosh",
    password: result,
    address: addressF.value,
    city: cityF.value,
  };

  await addOprator(data);
  window.location.reload();
});
/*----------------------add oprator frosh-------------------------*/

/*----------------------add oprator cake-------------------------*/
const btn_add_cake = document.querySelector("#btn-add-cake");
const nameC = document.querySelector("#name-c");
const codeC = document.querySelector("#code-c");
const addressC = document.querySelector("#address-c");
const passwordC = document.querySelector("#password-c");
const cityC = document.querySelector("#city-c");
const phoneC = document.querySelector("#phone-c");
btn_add_cake.addEventListener("click", async () => {
  const pass = passwordC.value;
  const result = pass.toString();
  const data = {
    name: nameC.value,
    nationalcode: codeC.value,
    phonenumber: phoneC.value,
    type: "cake",
    password: result,
    address: addressC.value,
    city: cityC.value,
  };

  await addOprator(data);
  window.location.reload();
});
/*----------------------add oprator cake-------------------------*/
