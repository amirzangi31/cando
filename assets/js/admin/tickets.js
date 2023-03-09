import {
  BASE_URL,
  GetAllTicket,
  GetTicketReplyWithId,
  InsertTicketReply,
  getUserWithId,
} from "../api.js";

const renderPage = async () => {
  const tickets = await GetAllTicket();
  
  const answreds =  tickets.filter((item) => item.messageReply !== null);
  const waiting =  tickets.filter((item) => item.messageReply === null);


  const contnetAnswerd = document.querySelector("#content-answerd");
  const contnetWaiting = document.querySelector("#content-waiting");

  answreds.forEach(async (item) => {
    const user = await getUserWithId(+item.user_id);
    const ticket = await GetTicketReplyWithId(item.id);
    const { message } = ticket[ticket.length - 1];
    const { name, phone } = user[0];
    const wait = `<div class="item-all-ticket col-12 col-md-6 p-1 ">
    <div class="item-ticket">
      <div class="title d-flex justify-content-between align-items-center my-2">
        <span>${name}</span>
        <span>${phone}</span>
      </div>
      <div class="des ">
        <div class="col-12 p-2 des-content">
            <div class="col-12">
                <h6>موضوع : ${item.title}</h6>
            </div>
            <div class="col-12">
                ${item.message}
            </div>
        </div>
        <div class="col-12 des-item p-2">
          ${message}
        </div>
       
      </div>
    </div>
  </div>`;
    contnetWaiting.innerHTML += wait;
  });

  waiting.forEach(async (item, index) => {
    const user = await getUserWithId(+item.user_id);

    const answer = `
    <div class="content-modal " >
  <div class="inner-modal" >
    <div class="content">
      <form class="px-4 pt-2">
        <div class="py-2">
          <div class="name">${user[0].name}</div>
          <div class="title">
            ${item.title}
          </div>
          <textarea name="modal" class="input-modal des" cols="30" rows="7" placeholder="${item.message}"></textarea>
        </div>
        <div class="btns-modal">
          <div class="btn-modal after col-6" onclick="replyTicket(${item.id} , ${index})">
            <span class="btn-send-modal" >ارسال</span>
          </div>
          <div class="btn-modal close-modal-adamtaeid col-6"  >
            <span class="close" onclick="closeModal(${index})">لغو</span>
          </div>
        </div>
      </form>
    </div>
  </div>

</div>
    
    
    <div class="item-all-ticket col-12 col-md-6 p-1 ">
    <div class="item-ticket">
      <div class="title d-flex justify-content-between align-items-center my-2">
        <span>${user[0].name}</span>
        <span>${user[0].phone}</span>
      </div>
      <div class="des-2"  >
        <div class="des-item p-3">
          <div class="col-12">
            <h6>موضوع : ${item.title}</h6>
          </div>
          <div class="col-12">
              ${item.message}
          </div>
        </div>
        
        <div class="col-12 Response-tickets p-1" onclick="showModal(${index})">
          پاسخ تیکت
        </div>
      </div>
    </div>
  </div>`;

    contnetAnswerd.innerHTML += answer;
  });
};

renderPage();

// change content  new tickets  and  all tickets
let btns = document.querySelectorAll(".btn-change");
let contents = document.querySelectorAll(".content-tickets");

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
// change content new tickets  and  all tickets

/*-----------------show modal`-----------------*/

window.showModal = (index) => {
  const modal = document.querySelectorAll(".content-modal");
  modal[index].classList.add("active");
};
window.closeModal = (index) => {
  const modal = document.querySelectorAll(".content-modal");
  console.log(index);
  modal[index].classList.remove("active");
};

/*-----------------show modal`-----------------*/

/*-----------------reply Modal-----------------*/

window.replyTicket = async (id, index) => {
  var raw = "";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/cando/cando/ticket/UpdateStatus.php?id=19", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  const modals = document.querySelectorAll(".des")[index];
  const message = modals.value;

  const dataOne = {
    ticket_id: `${id}`,
    msg: message,
    oprator_id: 1,
  };

  const rr = await InsertTicketReply(dataOne);
  
  window.location.reload()



};

/*-----------------reply Modal-----------------*/
