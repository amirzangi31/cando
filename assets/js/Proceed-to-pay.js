// import {} from "./api.js"

import {
  BASE_IAMGE,
  GetAllProductList,
  GetOrderWithUser,
  getAddressWithId,
  getAllDeposit,
  totalPriceOrder,
  userId,
  validateLogin,
} from "./api.js";
await validateLogin();

/*-----------------render page-------------------*/
const renderPage = async () => {
  const userID = await userId();
  const allOrders = await GetOrderWithUser(+userID);
  const noPayment = allOrders.filter((item) => item.user_accept === "false");
  const containerProducts = document.querySelector("#products");

  const contentTotalPrice = document.querySelector("#all-price");

  const containerUserInfo = document.querySelector("#container-user-info");

  const allDeposit = await getAllDeposit();
  const ersalPrice = +allDeposit[0].send_free;

  noPayment.forEach(async (item, index) => {
    const productList = await GetAllProductList(+item.id);
    productList.forEach((item) => {
      const note = `
         <div class="col-12 col-md-6 p-1">
         <div class=" py-1 px-2 content-up-page-item border rounded-1">
         
         <img src="${BASE_IAMGE}${item.image}" style="width : 100px ; height : 100px" /> 
        <div class="d-flex justify-content-between align-items-center flex-column">
          <span>${item.name}</span>
          <span>${item.price}تومان</span>
        </div> 
        <div class="d-flex align-items-center">
        <span>تعداد : ${item.count} </span>
        
        </div>
         </div>
   </div>`;

      containerProducts.innerHTML += note;
    });

    contentTotalPrice.innerHTML = `
     <div class="col-12 col-md-6 py-1 px-2 content-up-page-item">
                    <span class="d-flex align-items-center">قیمت کل</span>
                    <span class="d-flex align-items-center" id="price">${
                      totalPriceOrder(productList).totalS
                    }  تومان</span>
    
                </div>
                <div class="col-12 col-md-6 py-1 px-2 content-up-page-item">
                  <span class="d-flex align-items-center"> هزینه ارسال:</span>
                  <span class="d-flex align-items-center text-success font-weight-bold" id="send">${ersalPrice.toLocaleString()}  تومان</span>
  
              </div>
                <div class="col-12 col-md-6 py-1 px-2 content-up-page-item">
                    <span>مجموع</span>
                    <span id="allPrice">${(
                      totalPriceOrder(productList).total + ersalPrice
                    ).toLocaleString()}  تومان</span>
    
                </div> `;
  });

  const addressUser = await getAddressWithId(userID);
  const address = addressUser[addressUser.length - 1];

  if (addressUser.length) {
    const note = `
    <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">نام و نام خانوادگی</label>
                  <input  type="text" name="Fname-value" id="fname" value="${address.name}">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">استان</label>
                  <select  name="state" id="states">
                      <option value="کرمان">کرمان</option>
                      <option value="تهران">تهران</option>
                      <option value="یزد">یزد</option>
                      <option value="اصفهان">اصفهان</option>
                    </select>
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">شهر</label>
                  <select  name="state" id="states">
                      <option value="کرمان">کرمان</option>
                      <option value="تهران">تهران</option>
                      <option value="یزد">یزد</option>
                      <option value="اصفهان">اصفهان</option>
                    </select>
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">آدرس کامل</label>
                  <input class="arz" type="text" name="Fname-value" id="fname" value="${address.address}">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">کدپستی</label>
                  <input  type="text" name="Fname-value" id="fname" value=${address.postalcode}>
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item ">
                  <label class="p-1">نوع ارسال</label>
                  <select class="timesend" name="state" id="noe-ersal">
                      <option value="tahvil-imterneti">تحویل اینترنتی</option>
                      <option value="tahvil-hozori">تحویل حضوری</option>
                    </select>
              </div>
          
  
              <div class="col-12 col-md-6 py-1 px-1 page-item internet-delivery active">
                  <label  for="persianDatapicker" class="p-1">تاریخ ارسال</label>
                  <input  type="text" name="persianDatapicker" id="persianDatapicker">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item active" onclick="showModal()">
                  <label  for="persianDatapicker" class="p-1">زمان ارسال</label>
                  <input  type="text" name="persianDatapicker" id="persianDatapicker">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">شماره موبایل</label>
                  <input  type="text" name="Fname-value" id="fname" value="${address.phone}">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">آدرس ایمیل(اختیاری)</label>
                  <input  type="text" name="Fname-value" id="fname">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">یاداشت(اختیاری)</label>
                  <input class="arz" type="text" name="Fname-value" id="fname">
              </div>
      
    `;
    containerUserInfo.innerHTML = note;
  } else {
    const noteOne = `
    <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">نام و نام خانوادگی</label>
                  <input  type="text" name="Fname-value" id="fname" >
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">استان</label>
                  <select  name="state" id="states">
                      <option value="کرمان">کرمان</option>
                      <option value="تهران">تهران</option>
                      <option value="یزد">یزد</option>
                      <option value="اصفهان">اصفهان</option>
                    </select>
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">شهر</label>
                  <select  name="state" id="states">
                      <option value="کرمان">کرمان</option>
                      <option value="تهران">تهران</option>
                      <option value="یزد">یزد</option>
                      <option value="اصفهان">اصفهان</option>
                    </select>
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">آدرس کامل</label>
                  <input class="arz" type="text" name="Fname-value" id="fname" >
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">کدپستی</label>
                  <input  type="text" name="Fname-value" id="fname">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item ">
                  <label class="p-1">نوع ارسال</label>
                  <select class="timesend" name="state" id="noe-ersal">
                      <option value="tahvil-imterneti">تحویل اینترنتی</option>
                      <option value="tahvil-hozori">تحویل حضوری</option>
                    </select>
              </div>
          
  
              <div class="col-12 col-md-6 py-1 px-1 page-item internet-delivery active">
                  <label  for="persianDatapicker" class="p-1">تاریخ ارسال</label>
                  <input  type="text" name="persianDatapicker" id="persianDatapicker">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item active" onclick="showModal()">
                  <label  for="persianDatapicker" class="p-1">زمان ارسال</label>
                  <input  type="text" name="persianDatapicker" id="persianDatapicker">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">شماره موبایل</label>
                  <input  type="text" name="Fname-value" id="fname" >
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">آدرس ایمیل(اختیاری)</label>
                  <input  type="text" name="Fname-value" id="fname">
              </div>
              <div class="col-12 col-md-6 py-1 px-1 page-item">
                  <label class="p-1">یاداشت(اختیاری)</label>
                  <input class="arz" type="text" name="Fname-value" id="fname">
              </div>`;
    containerUserInfo.innerHTML = noteOne;
  }
};

await renderPage();
/*-----------------render page-------------------*/

/*------------------show and close modal-submit time ------------------- */
// let btnsShowModal = document.querySelector("#submit-time") ;
let modals = document.querySelector("#modal-submit-time");
let overalyModals = document.querySelector("#modal-submit-time .inner-modal");

window.showModal = () => {
  modals.classList.add("active");
};

overalyModals.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal") {
    modals.classList.remove("active");
  }
});
/*------------------show and close modal-submit time ------------------- */
