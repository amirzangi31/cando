import {
  GetOrderWithUser,
  
  GetAllProductList,
  BASE_IAMGE,
  totalPriceOrder,
  
  userId,
  getUserWithId,
  validateLogin,
  GetProductWithId,
} from "./api.js";
await validateLogin();

// change content pakage active-orders and Previous-orders

let btns = document.querySelectorAll(".btn-orders");
let contents = document.querySelectorAll(".order");

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

/*------------------on and off desired-package in modal ------------------- */

function validate() {
  var checkbox = document.getElementById("check-input");
  if (checkbox.checked == true) {
    var a = document.getElementById("small-circle");
    var b = document.getElementById("circle-bironi");
    var text = document.getElementById("text-etebar");
    var text1 = document.getElementById("texts-etebar");

    a.style.right = "9%";
    b.style.backgroundColor = "#55BF63";
    text.style.color = "#55BF63";
    text1.style.color = "#55BF63";
  } else {
    var x = document.getElementById("small-circle");
    var y = document.getElementById("circle-bironi");
    var z = document.getElementById("text-etebar");
    var z1 = document.getElementById("texts-etebar");

    x.style.right = "54%";
    y.style.backgroundColor = "#9e9fb1";
    z.style.color = "black";
    z1.style.color = "black";
  }
}

// /*------------------on and off desired-package in modal ------------------- */
// /*------------------show and close modal Order details ------------------- */
// let btnsShowModal = document.querySelector("#order-content");
// let modals = document.querySelector("#modal-Order-details");
// let overalyModals = document.querySelector("#modal-Order-details .inner-modal");

//     btnsShowModal.addEventListener("click", () => {
//     modals.classList.add("active");
//   });

//   overalyModals.addEventListener("click", (e) => {
//     if (e.target.className === "inner-modal"){
//       modals.classList.remove("active");
//     }
//   });
// /*------------------show and close modal Order details------------------- */

// const Neworder = async ()=>{
//   const userinfo = await GetWithToken(localStorage.getItem("token"))

//   let newOrder= await GetOrderWithUser(userinfo)

//   newOrder = newOrder.reverse();
//   const product = await GetListProducts(newOrder)
//   let all =0
//   let discount = 0
//   product.forEach(item=>{
//     all += item.price
//     discount += item.discount
//   console.log(item);
// const note = `<div class="col-12 col-md-6 p-2 ">
// <div class="product-item">
//     <div class="col-1 text-right">
//         <span>ویترین روز</span>
//     </div>
//   <div class="col-4 col-md-4 height">
//     <div class="img-product">
//       <img src="${BASE_URL}file${item.image}"
//         alt="">
//       </div>
//       <div class="img-zarb">
//           <img src="./assets/images/zarb.png">

//       </div>
//   </div>
//   <div class="col-4 col-md-4 moshakhaseh">
//     <div class="name-sweet">${item.name}</div>

//   </div>
//   <div class="col-3 p-2 price">
//       <div class="price-value" >
//               <h4 class="mb-0" >${item.price}</h4>
//               <p class="text">هزارتومان</p>
//       </div>
//        <div class="price-item" >
//           <div class="plus">
//               <img src="./assets/images/icon/plus-b.png">
//           </div>
//           <div class="number">${item.count}</div>
//           <div class="minimize" >
//               <img src="./assets/images/icon/trash-b.png">
//           </div>
//       </div>

//   </div>

// </div>
// </div>`
// document.querySelector("#new").innerHTML+=note
// })
// // set information all

// document.querySelector("#price").innerHTML=all+" تومان"
// document.querySelector("#discount").innerHTML=discount+" تومان"
// document.querySelector("#result").innerHTML=all-discount+" تومان"
// document.querySelector("#result-2").innerHTML=all-discount+" تومان"

// }
// await Neworder()
// const plus = document.querySelectorAll(".plus")
// const count = document.querySelectorAll(".number")
// const minimize = document.querySelectorAll(".minimize")

// console.log(count);
// plus.forEach((item,index)=>{
//   item.addEventListener('click',()=>{
//    parseInt(count[index].innerHTML++) ;

//   })
// })
// minimize.forEach((item,index)=>{
//   item.addEventListener('click',()=>{
//     parseInt(count[index].innerHTML)==0?0:parseInt(count[index].innerHTML--);

//   })
// })


const userID = await userId();
const renderPage = async () => {
  
  const allOrders = await GetOrderWithUser(+userID);
  const noPayment = allOrders.filter(item => item.user_accept === "false")
  const contentTotalPrice = document.querySelector("#total-price");
  noPayment.forEach(async(item , index) => {
    const productList = await GetAllProductList(+item.id);
    console.log(productList)
    const product = await GetProductWithId(66)
    console.log(product)
    contentTotalPrice.innerHTML = totalPriceOrder(productList).totalS;
    document.querySelector("#result-2").innerHTML = `${totalPriceOrder(productList).totalS}  تومان`;
  })


  //SECTION PAYMENT
  

  // const totalPrice = productList.reduce((a, b) => +a + +b.count * b.price, 0);
  // const total = productList.reduce((a, b) => +a + +b.count , 0)

  const contentWallet = document.querySelectorAll(".text-etebar");
  
  const user = await getUserWithId(+userID)
  contentWallet.forEach((item) => {
    const wallet= +user[0].wallet;
    item.innerHTML = wallet.toLocaleString(); 
  });
  
  //SECTION PAYMENT

  //Previous orders
  const paidOrder = allOrders.filter((item) => item.user_accept === "true");
  const containerPaid = document.querySelector("#paid-container");

  if (!Boolean(paidOrder.length)) {
    console.log("first")
    const note = `<h1>هیچ سفارشی نداشته اید</h1>`;
    containerPaid.innerHTML = note;
  }
  // containerPaid.innerHTML = "";
  paidOrder.forEach(async (item, index) => {
    const products = await GetAllProductList(+item.id);
    const note = `<div class="col-12 col-md-6 p-2" >
    <a href="./Order-details.html?${item.id}" class="d-block content-orders bottomborder" >
        <div href="./order-details.html?${item.id}" class="col-12 Tracking-Code p-2 d-flex justify-content-end align-items-center">
            
            <div class="col-5 date">
                <span>${item.created}</span>
            </div>

        </div>
        <div class="col-12 images p-2">
            <div class="col-9 image-item p-2">
            ${Object.keys(products)
              .map((key) => {
                return `
                <div class="col-3 p-2">
                <img src="${BASE_IAMGE}${products[key].image}">
            </div>`;
              })
              .join("")}
               
                

            </div>
            <div class="col-3 left-item p-2">
                <div class="price-value" >
                    <h4 class="mb-0" >${totalPriceOrder(products).totalS}</h4>
                    <p class="text">هزارتومان</p>
            </div>

            </div>
        </div>
       

    </a>

</div>`;

    containerPaid.innerHTML += note;
  });
  //Previous orders
};

await renderPage();
