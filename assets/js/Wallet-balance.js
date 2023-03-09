import {
  GetAllProductList,
  getAllOrders,
  getUserWithId,
  totalPriceOrder,
  userId,
  validateLogin,
} from "./api.js";

await validateLogin();
/*-----------------------render Page-------------------------------*/

const userID = await userId();
console.log(userID);
const allOrders = await getAllOrders();
const ordersUser = allOrders.filter(
  (item) =>
    item.user_id === userID &&
    item.user_accept === "true" &&
    item.admin_accept === "true"
);

const rednerPage = async () => {
  const container = document.querySelector("#container");

  ordersUser.forEach(async(item , index) => {
    const products = await GetAllProductList(+item.id)
    const date = item.created.split(" ")[0]
    
    const resultDate = moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

      const note = `    <div class="col-12 col-md-4 p-3">
      <div class="transaction-item">
        <div class="picked-up">
          مبلغ ${totalPriceOrder(products).totalS}هزار تومان اضافه شد
        </div>
        <div class="follow-up">
          <span>شماره پیگیری :</span>
          <span>${item.id}</span>
        </div>
        <div class="date d-flex">
          <div>تاریخ و ساعت:</div>
          <div style="display: flex;width:150px;justify-content: space-between;">
            <span>14:56</span>
            <span>${resultDate}</span>
          </div>
        </div>

      </div>
    </div>`

      container.innerHTML += note
  });
};

await rednerPage();

/*-----------------------render Page-------------------------------*/

/*------------------------------Render Page--------------------------------- */

let btnHamburger = document.querySelector(".menu-admins");

btnHamburger.addEventListener("click", () => {
  btnHamburger.classList.toggle("active");
});
const token = localStorage.getItem("token");
if (token != undefined) {
  const wallet = await getUserWithId(userID);
  document.querySelector("#price").innerHTML = `${wallet[0].wallet} تومان`;
}

/*------------------show and close modal-adamtaeid ------------------- */
