import { packageHandler, payHandler, successAlert } from "./Services.js";
import {
  BASE_IAMGE,
  GetAllProductList,
  GetOrderWithUser,
  InsertOrder,
  getAllPackage,
  insertProductToOrder,
  totalPriceOrder,
  userId,
  validateLogin,
} from "./api.js";
await validateLogin();

/*----------------------renderpage------------------------*/
const userID = await userId();
const allOrders = await GetOrderWithUser(+userID);
const orderN = allOrders.filter((item) => item.user_accept === "false");
const orderA = allOrders.filter(
  (item) => item.user_accept === "true" && item.admin_accept === "true"
);
const renderPage = async () => {
  //قسمت خرید خود را تکمیل کنید
  const containerOne = document.querySelector("#container-one");
  orderN.forEach(async (item, index) => {
    const products = await GetAllProductList(item.id);

    const filterproducts = products.slice(0, 3);

    const note = `
    <div class="col-12 col-md-6 p-2" id="order">
    <a href="./basket-shoping.html" class="content-orders d-block bottomborder">
      <div class="col-12 Tracking-Code p-2">
        <div class="col-7 tracking">
          <span>خرید خود را تکمیل کنید. (قیمت نهایی محصولات)</span>
        </div>
      </div>
      <div class="col-12 images p-2">
        <div class="col-9 image-item p-2">
        ${Object.keys(filterproducts)
          .map((item) => {
            return `
            <div class="col-3 p-2">
              <img src="${BASE_IAMGE}${filterproducts[item].image}" />
            </div>
            `;
          })
          .join("")}
          
        </div>
        <div class="col-3 left-item p-2">
          <div class="price-value">
            <h4 class="mb-0">${totalPriceOrder(products).totalS}</h4>
            <p class="text">هزارتومان</p>
          </div>
        </div>
      </div>
    </a>
  </div>
    `;
    containerOne.innerHTML += note;
  });
  const allPackage = await getAllPackage()
  const packages = allPackage.filter(item => item.accept === "true")
  const cakes = packages.filter(item => item.type === "cake")
  const jabeha = packages.filter(item => item.type === "pakage")

//قسمت جعبه دلخواه خود را تکمیل کنید
  const containerTwo = document.querySelector("#container-two");
  if(jabeha.length === 1) document.querySelector("#btn-all-pay-1").style.display = "none"
  if(cakes.length === 1) document.querySelector("#btn-all-pay-2").style.display = "none"
  jabeha.forEach(async(item, index) => {
    const products = await packageHandler(item.product)
    const price = +item.Deposit
    

    const note = `
    
    <div class="col-12 p-2">
    <div class="content-orders ${jabeha.length === 1 ? null : "bottomborder "}">
      <div class="col-12 Tracking-Code p-2">
        <div class="col-7 tracking d-flex align-items-center">
          <span>قیمت نهایی جعبه شیرینی دلخواه. (جعبه3کیلویی)</span>
          <span class="btn btn-sm text-white mx-2" style="background : #cd9b38" onclick="payHandler(${item.id})">پرداخت</span>
        </div>
      </div>
      <div class="col-12 txt-images p-2">
        <div class="col-9 item-three p-2">

        ${
          Object.keys(products).map((pro , index) => {
            const {name}= products[pro]
            return `
            <div class="col-12 content-img-txt">
            <div class="col-3 p-2">
              <img src="./assets/images/pic5.png" />
            </div>
            <div class="col-9 p-2 text-gram">
              <div class="col-9 p-2">
                <span>${name}</span>
              </div>
              <div class="col-3 p-2"><span>ردیف ${PersianTools.numberToWords(index + 1)}</span></div>
            </div>
          </div>
            
            `
          }).join("")

        }

          

          
        </div>
        <div class="col-3 left-item p-2">
          <div class="price-value">
            <h4 class="mb-0">${price.toLocaleString()}</h4>
            <p class="text">هزارتومان</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    containerTwo.innerHTML += note;
  })

  //قسمت کیک دلخواه خود را تکمیل کنید
  const containerThree = document.querySelector("#container-three");

  cakes.forEach((item, index) => {
    const price = +item.Deposit

    const note = `
    <div class="col-12 p-2">
    <div class="content-orders">
      <div class="col-12 Tracking-Code p-2">
        <div class="col-7 tracking d-flex align-items-center" >
          <span>قیمت نهایی کیک دلخواه شما آماده شد.</span>
          <span class="btn btn-sm text-white mx-2" style="background : #cd9b38">پرداخت</span>
        </div>
      </div>
      <div class="col-12 images p-2">
        <div class="col-9 item-three p-2">
          <div class="col-12 content-txt">
            <div class="col-12 p-2">
              <span>وزن :${item.Weight}کیلوگرم</span>
            </div>
          </div>
          <div class="col-12 content-txt">
            <div class="col-12 p-2">
              <span>فیلینگ : ${item.filling}</span>
            </div>
          </div>
          <div class="col-12 content-txt">
            <div class="col-12 p-2">
              <span>اسفنج کیک : ${item.taste_cake}</span>
            </div>
          </div>
          <div class="col-12 content-txt">
            <div class="col-12 p-2">
              <span>طعم خامه : ${item.taste_cream}</span>
            </div>
          </div>
        </div>
        <div class="col-3 left-item p-2">
          <div class="price-value">
            <h4 class="mb-0">${price.toLocaleString()}</h4>
            <p class="text">هزارتومان</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `
    containerThree.innerHTML += note;
  })


  // قسمت سفارشات قبلی
  const contaienrFour = document.querySelector("#container-four");

  orderA.forEach(async(item , index) => {
    const products = await GetAllProductList(item.id);

    const filterproducts = products.slice(0, 4);
    const note = ` <div class="col-12 col-md-6 p-2">
    <div class="content-orders bottomborder">
      <div class="col-12 Tracking-Code p-2">
        <div class="col-7 tracking">
          <span>به خرید خود امتیاز دهید.</span>
        </div>
      </div>
      <div class="col-12 images p-2">
        <div class="col-9 image-item p-2">
        ${Object.keys(filterproducts)
          .map((item) => {
            return `
            <div class="col-3 p-2">
              <img src="${BASE_IAMGE}${filterproducts[item].image}" />
            </div>
            `;
          })
          .join("")}
          
        </div>
        <div class="col-3 left-item p-2">
          <div class="price-value">
            <a href="Notifications.html?${item.id}"
              ><img src="./assets/images/icon/Group 1900.png"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>`
  contaienrFour.innerHTML += note
  })


};

await renderPage();
/*----------------------renderpage------------------------*/

// change content pakage active-orders and Previous-orders

let btns = document.querySelectorAll(".btn-notices");
let contents = document.querySelectorAll(".content");

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
// change content pakage active-orders and Previous-orders





/*---------------------pay handler------------------------*/
let orderId;
window.payHandler = async(id) =>{
  const orders = await GetOrderWithUser(userID)
  const isOrder = orders.findIndex(item => item.user_accept === "false")
  if(isOrder !== -1){
    await payHandler();
  }
  const data = {
    user_id: userID,
    discount_id: 0,
    user_accept: false,
    admin_accept: false,
  };
  orderId = await InsertOrder(data);
  window.localStorage.setItem("orderId", JSON.stringify(orderId));
  const product = {
    order_id: orderId,
    discount: 0,
    product_id: id,
    count: 1,
    type: "true",
  };
  await insertProductToOrder(product);
  successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
}


/*---------------------pay handler------------------------*/