import { back, getAllUsers } from "../api.js";




document.querySelector("#back").addEventListener("click", () => {

  back();
});


/*------------------render page-------------------*/

const renderPage = async() => {
  const users = await getAllUsers()

  const container = document.querySelector("#container")

  users.forEach((item , index) => {
    
    const note = `
    <div class="col-12 items ${index === 0 ? "" : "border_top"}">
    <a  href="./User-information.html?${item.id}" class="col-3 p-1">${item.name}</a>
    <span class="col-3 p-1">${item.phone}</span>
    <span class="col-3 p-1">کرمان</span>
    <div class="col-3 left">
      <img class="border-right" src="../assets/images/icon/whatsapp.png">
      <img class="border-right" src="../assets/images/icon/alarm.png">
    </div>
    
  </div>
    `


    container.innerHTML += note
  });


}


await renderPage()

/*------------------render page-------------------*/