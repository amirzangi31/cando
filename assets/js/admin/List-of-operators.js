import { getAllOprator } from "../api.js";

/*---------------rendre page--------------------*/
const allOprator = await getAllOprator()
const frosh = allOprator.filter(item => item.type === "frosh")
const cake = allOprator.filter(item => item.type === "cake")



const renderPage = async() => {
  const froshContainer = document.querySelector("#frosh")
  const cakeContainer = document.querySelector("#cake")
  console.log(cakeContainer)
  frosh.forEach((item, index) => {
    const note = `
    <div class="col-12 items ">
    <span class="col-3 p-1">${item.name}</span>
    <span class="col-3 p-1">${item.phonenumber}</span>
    <span class="col-3 p-1">${item.city}</span>
    <div class="col-3 left">
    <img class="border-right" src="../assets/images/icon/whatsapp.png">
    <img class="border-right" id="notification" src="../assets/images/icon/alarm.png">
    </div>
    
</div>
`
    froshContainer.innerHTML += note
  })

  cake.forEach((item, index) => {
    const note = `
    <div class="col-12 items ">
    <span class="col-3 p-1">${item.name}</span>
    <span class="col-3 p-1">${item.phonenumber}</span>
    <span class="col-3 p-1">${item.city}</span>
    <div class="col-3 left">
    <img class="border-right" src="../assets/images/icon/whatsapp.png">
    <img class="border-right" id="notification" src="../assets/images/icon/alarm.png">
    </div>
    
</div>`
    cakeContainer.innerHTML += note
  })

}


await renderPage()


/*---------------rendre page--------------------*/









// change content Sales operator  and cake operator

let btns = document.querySelectorAll(".btn-change");
let contents = document.querySelectorAll(".Sales-operator");

btns.forEach((item, index) => {
  item.addEventListener("click", () => {
    btns.forEach((item) => {
      item.classList.remove("active");

    });
    contents.forEach((item) => {
      item.classList.remove("active");
    });
    btns[index].classList.add("active");
    contents[index].classList.add("active");
  });
});
// change content Sales operator  and cake operator

/*------------------show and close Sales operator ------------------- */
let btnsShowModal = document.querySelectorAll("#notification");
let modals = document.querySelector("#modal-send-notification");
let overalyModals = document.querySelector("#modal-send-notification .inner-modal");

btnsShowModal.forEach((item, index) => {
  item.addEventListener("click", () => {
    modals.classList.add("active");
  });
  
});
overalyModals.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal"){
    modals.classList.remove("active");
  }
});




/*------------------show and close modal cake operator------------------- */
let btnShowModal = document.querySelectorAll("#general-notification");
let modal = document.querySelector("#modal-General-notification");
let overalyModal = document.querySelector("#modal-General-notification .inner-modal");

btnShowModal.forEach((item, index) => {
  item.addEventListener("click", () => {
    modal.classList.add("active");
  });
  
});
  overalyModal.addEventListener("click", (e) => {
    if (e.target.className === "inner-modal"){
      modal.classList.remove("active");
    }
  });
/*------------------show and close modal cake operator------------------- */