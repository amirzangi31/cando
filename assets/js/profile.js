import { exit, validateLogin } from "./api.js";
await validateLogin();

/*---------------------render page------------------------*/

const renderPage = async () => {};

await renderPage();

/*---------------------render page------------------------*/

/*-------------------exit account--------------------*/
const btnExit = document.querySelector("#exit-btn");

btnExit.addEventListener("click", async () => {
  await exit();
  window.location.reload()
});

/*-------------------exit account--------------------*/
