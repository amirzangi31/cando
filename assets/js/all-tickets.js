import { GetAllTicket, GetTicketReply, userId, validateLogin } from "./api.js";
await validateLogin();

/*----------------------render  page----------------------*/

const renderPage = async () => {
  const userID = await userId();

  console.log(userID);

  const container = document.querySelector("#container");
  const tickets = await GetAllTicket();
  const ticket_user = tickets.filter((item) => item.user_id === userID);


  ticket_user.forEach(async(item, index) => {
    const reply = await GetTicketReply(+item.id)
    console.log(item)
    const note = `
<div class="item-all-ticket col-12 col-md-6 p-1 ">
                        <div class="item-ticket">
                          <div class="title d-flex justify-content-between align-items-center my-2">
                            <span>${item.title}</span>
                          </div> 
                          <div class="des ">
                            <div class="col-12 p-2 des-content">
                                <div class="col-12">
                                    <h6>${item.title}</h6>
                                </div>
                                <div class="col-12">
                                ${item.message}
                                </div>
                            </div>
                            <div class="col-12 des-item p-2">
                                ${reply.length ? `${reply[0].message}` : "<span class='text-warning'>درحال بررسی</span>"}
                            </div>
                           
                          </div>
                        </div>
                      </div>`;

    container.innerHTML += note
  });
};

await renderPage();

/*----------------------render  page----------------------*/
