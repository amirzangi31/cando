import { packageHandler } from "../Services.js";
import {
  GetAllProductList,
  GetOrderWithUser,
  InsertOrder,
  acceptAdminOrder,
  confirmPackage,
  createProduct,
  getAddressWithId,
  getAllDeposit,
  getAllOrders,
  getAllPackage,
  getUserWithId,
  insertProductToOrder,
  totalPriceOrder,
} from "../api.js";

/*-------------------------render Page----------------------------*/
const allOrders = await getAllOrders();
const sliderOne = allOrders.filter(
  (item) =>
    item.user_accept === "true" &&
    item.admin_accept === "true" &&
    item.isDelete === "false"
);

const sliderTwo = allOrders.filter(
  (item) =>
    item.user_accept === "true" &&
    item.isDelete === "false" &&
    item.admin_accept === "false"
);

const allPackage = await getAllPackage();
const sliderThree = allPackage.filter(
  (item) => item.pay === "true" && item.accept === "false"
);
const renderPage = async () => {
  /**slider one */
  const containerOne = document.querySelector("#container-one");
  sliderOne.forEach(async (item, index) => {
    const products = await GetAllProductList(+item.id);
    const filterProducts = products.slice(0, 3);

    const note = `
    <div class="swiper-slide">
                    <div class="item-darkhast-moshavereh item-list-1 item-list-gh p-0">
                      <div class="content-item-o-p p-2">
                        <div class="right col-12">
                        ${Object.keys(filterProducts)
                          .map((pro, index) => {
                            const { name, price } = filterProducts[pro];
                            return `
                              <div class="col-12 right-item p-1 ${
                                index === filterProducts.length - 1
                                  ? "border-bottom"
                                  : ""
                              }">
                            <span>${name}</span>
                            <span>${price}تومان</span>

                          </div>
                              
                              `;
                          })
                          .join("")}
                          <!-- start -->
                          
                          
                          <div class="col-12 right-item p-1">
                            <span>مبلغ کل</span>
                            <span>${
                              totalPriceOrder(products).totalS
                            }تومان</span>

                          </div>
                          
                        </div>
                      </div>
                      <div class="up p-2">
                      </div>
                      <div class="information">در حال آماده سازی</div>
                      </div>
    </div>`;

    containerOne.innerHTML += note;
  });
  /**slider one */

  /**slider two */
  const containerTwo = document.querySelector("#container-two");
  const containerModalsTwo = document.querySelector("#modals-req");

  sliderTwo.forEach(async (item, index) => {
    const user = await getUserWithId(+item.user_id);
    const addressaa = await getAddressWithId(+item.user_id);
    const { address, postalcode, name, phone, id } = addressaa[0];
    const products = await GetAllProductList(+item.id);
    const filterProducts = products.slice(0, 3);
    const modal = `
    <div class="content-modals modal-req">
    <div class="inner-modals"  style="z-index : -1">

         <div class="contents">
         <div class="px-2">
            <span class="text-white" style="font-size : 40px ; cursor : pointer" onclick="closeModalReq(${index})">×</span>
         </div>
            <div class="col-12  py-1">
        <div class="price-item ">
            <div class="p-3 col-12">
            <div class="col-12 detail">
            <div class="col-12 detail-item p-2">
                        <label class=" col-4">کد رهگیری:</label>
                        <input class="col-8" type="text" name="code" id="Tracking-Code" placeholder="${id}">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">تاریخ و زمان سفارش:</label>
                        <input class="col-8" type="text" name="ِDate" id="date-item" placeholder=" ">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                        <input class="col-8" type="text" name="Delivery" id="Delivery-information" placeholder="${name} ${phone}">
                    </div>
            <div class="col-12 detail-item p-2">
                <input class="col-12 address" type="text" name="value-address" id="address" placeholder="${address}">
            </div>
       
  </div>
  <div class="col-12 my-2">
          
  <div class="col-12">
  <sapn class="btn text-white btn-sm w-100" style="background : #cd9b38" onclick="confirmRequest(${item.id} , ${user[0].id})">ثبت سفارش</sapn>
</div>
  </div>
  `
    const note = `
    <div class="swiper-slide">
                    <div class="item-darkhast-moshavereh item-list-1 item-list-gh p-0">
                      <div class="content-item-o-p p-2">
                        <div class="right col-12">
                          <!-- start title -->
                          <div class="col-12 right-title p-1">
                                <span>تحویل حضوری</span>
                          </div>
                          <!-- start -->
                          ${Object.keys(filterProducts)
                            .map((pro, index) => {
                              const { name, price } = filterProducts[pro];
                              return `
                                <div class="col-12 right-item p-1 ${
                                  index === filterProducts.length - 1
                                    ? "border-bottom"
                                    : ""
                                }">
                              <span>${name}</span>
                              <span>${price}تومان</span>
  
                            </div>
                                
                                `;
                            })
                            .join("")}
                          <div class="col-12 right-item p-1">
                            <span>مبلغ کل</span>
                            <span>${
                              totalPriceOrder(products).totalS
                            }تومان</span>

                          </div>
                          
                        </div>
                      </div>
                      <div class="up p-2">
                      </div>
                      <div class="information bg-color" style="cursor : pointer" onclick="showModalReq(${index})">ثبت برای آماده سازی</div>
                      </div>
                  </div>`;
    containerTwo.innerHTML += note;
    containerModalsTwo.innerHTML += modal
  });
  /**slider two */
  const allDeposit = await getAllDeposit();
  /**slider three */
  const containerThree = document.querySelector("#container-three");
  const containerModalsThree = document.querySelector("#modals-packages");
  sliderThree.forEach(async (item, index) => {
    const user = await getUserWithId(+item.user_id);
    const addressaa = await getAddressWithId(+item.user_id);
    const { address, postalcode, name, phone, id } = addressaa[0];
    const data = item.type === "pakage" && (await packageHandler(item.product));
    // const date =item.type === "cake" ? item.created : null;
    // const resultDate = moment(date, "YYYY/MM/DD")
    //   .locale("fa")
    //   .format("YYYY/MM/DD");
    const cake = `
    <div class="col-12 right-item flex-column p-1">
          <div class="d-flex justify-content-between align-items-center py-1">
              <span>وزن</span>
              <span>${item.Weight} کیلو گرم</span>
          </div>
          <div class="d-flex justify-content-between align-items-center py-1">
              <span>فیلینگ</span>
              <span>${item.filling} </span>
          </div>
          <div class="d-flex justify-content-between align-items-center py-1">
              <span>اسفنج کیک</span>
              <span>${item.taste_cake} </span>
          </div>
          <div class="d-flex justify-content-between align-items-center py-1 border-bottom">
              <span>ظعم خامه</span>
              <span>${item.taste_cream} </span>
          </div>
      
    </div>
    `;

    const pack = `
    <div class="col-12 right-item flex-column p-1">
         ${Object.keys(data)
           .map((pro, index) => {
             const name = data[pro].name.split("_");
             const result = name.join(" ");
             return `
              <div class="d-flex justify-content-between align-items-center ${
                index === data.length - 1 && "border-bottom"
              }">
                  <span>ردیف ${index + 1}</span>
                  <span>${result}</span>
              </div>
            `;
           })
           .join("")}          

    </div>
    `;
    const modal = ` <div class="content-modals modal-takhmin">
    <div class="inner-modals"  style="z-index : -1">

         <div class="contents">
         <div class="px-2">
            <span class="text-white" style="font-size : 40px ; cursor : pointer" onclick="closeModalHandler(${index})">×</span>
         </div>
            <div class="col-12  py-1">
        <div class="price-item ">
            <div class="p-3 col-12">
            <div class="col-12 detail">
            <div class="col-12 detail-item p-2">
                        <label class=" col-4">کد رهگیری:</label>
                        <input class="col-8" type="text" name="code" id="Tracking-Code" placeholder="${id}">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">تاریخ و زمان سفارش:</label>
                        <input class="col-8" type="text" name="ِDate" id="date-item" placeholder=" ">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                        <input class="col-8" type="text" name="Delivery" id="Delivery-information" placeholder="${name} ${phone}">
                    </div>
            <div class="col-12 detail-item p-2">
                <input class="col-12 address" type="text" name="value-address" id="address" placeholder="${address}">
            </div>
      

  </div>
          <div class="col-12">
              <div class="moshakhasat py-1">
                      <div class="col-12 txt-main p-2">
                    <input type="number"  class="w-100 py-2 px-2 rounded-3 text-white" placeholder="تخمین قیمت" style="outline : 1px solid white   "  />
                      </div>
                      <div class="col-12 Total-price pt-1">
                          <div class="col-12 item-list p-1 text-white">
                              <span>بیعانه</span>
                              <span>تومان</span>
                          </div>
                      </div>
                      <div class="col-12">
                        <sapn class="btn text-white btn-sm w-100" style="background : #cd9b38" onclick="${
                          item.type === "cake"
                            ? `priceHandler(${item.id}, ${user[0].id})`
                            : `priceHandlerOne(${item.id}, ${user[0].id})`
                        }">آماد سازی و ثبت قیمت</sapn>
                      </div>
                  </div>
              </div>

          </div>
      </div>

  </div>
</div>
<div class="birthday-package  mt-2">
<p>تخمین قیمت</p>
</div>
</div>
</div>

</div>`;

    const note = `

    <div class="swiper-slide">

                    <div class="item-darkhast-moshavereh item-list-1 item-list-gh p-0">
                    <div class="content-item-o-p p-2">
                        <div class="right col-12">
                              <!-- start title -->
                        <div class="col-12 right-title p-1">
                                <span>${
                                  item.type === "cake"
                                    ? "کیک تولد سفارشی"
                                    : "جعبه شیرینی دلخواه"
                                }</span>
                        </div>
                        ${item.type === "cake" ? `${cake}` : `${pack}`}

                            <!-- start item -->
                        
                        
                       
                        <div class="col-12 right-item p-1">
                            <span>مبلغ بیعانه</span>
                            <span>${
                              item.type === "cake"
                                ? `${allDeposit[0].cake}`
                                : `${allDeposit[0].package}`
                            }تومان</span>

                        </div>
                        
                        </div>
                    </div>
                    <div class="up p-2">
                    </div>
                    <div class="information bg-color" style="cursor : pointer" onclick="showModalHandler(${index})">تخمین قیمت وآماده سازی</div>
                    </div>
                </div>
    `;

    containerThree.innerHTML += note;
    containerModalsThree.innerHTML += modal;
  });

  /**slider three */
};

await renderPage();
/*-------------------------render Page----------------------------*/

/*------------------show and close modal-hamberger ------------------- */

let btnHamburger = document.querySelector("#hamburger");
let menuMobile = document.querySelector(".menu-admin");
let closeMenu = document.querySelector(".overlay-menu-mobile");

btnHamburger.addEventListener("click", () => {
  menuMobile.classList.add("active");
});
closeMenu.addEventListener("click", () => {
  menuMobile.classList.remove("active");
});

/*------------------show and close modal-hamberger ------------------- */

/*------------------exit menu-admin ------------------- */
let exit = document.getElementById("exit");
let menu = document.querySelector(".menu-admin");
exit.addEventListener("click", (e) => {
  menu.classList.remove("active");
});
/*------------------exit menu-admin ------------------- */

//swiper
var swiper = new Swiper("#test", {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 10,
  // Responsive breakpoints

  autoplay: {
    delay: 4000,
  },

  breakpoints: {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    650: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*-------------START SLIDER FOR KARBARAN    --------------*/

const swiperKarbar = new Swiper("#karbar", {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 10,
  // Responsive breakpoints

  autoplay: {
    delay: 4000,
  },

  breakpoints: {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    650: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*-------------END SLIDER FOR KARBARAN  --------------*/

/*-------------START SLIDER FOR GAHTEH    --------------*/

const swipergh = new Swiper("#ghateh", {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 10,
  // Responsive breakpoints

  autoplay: {
    delay: 4000,
  },

  breakpoints: {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    650: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*-------------END SLIDER FOR GAHTEH  --------------*/

/*-------------START SLIDER FOR GAHTEH    --------------*/

const swiperTicket = new Swiper("#swiper-ticket", {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 10,
  // Responsive breakpoints

  autoplay: {
    delay: 4000,
  },

  breakpoints: {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    650: {
      slidesPerView: 2,
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*-------------END SLIDER FOR GAHTEH  --------------*/

//کلیک کردن روی عکس های اسلایدر و پاپ اپ باز شدن
// let slider = document.querySelectorAll(".test2");
// let modal_vitrin = document.querySelector(" #modal-edit-showcase");
// let overalys = document.querySelector("#modal-edit-showcase .inner-modal");

// slider.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     modal_vitrin.classList.add("active");
//   });
// });
// overalys.addEventListener("click", (e) => {
//   if (e.target.className === "inner-modal") {
//     modal_vitrin.classList.remove("active");
//   }
// });

/*-------------------show and close modal handler------------------*/

window.showModalHandler = (index) => {
  const modals = document.querySelectorAll(".modal-takhmin");

  modals[index].classList.add("active");
};

window.closeModalHandler = (index) => {
  const modals = [...document.querySelectorAll(".modal-takhmin")];

  modals[index].classList.remove("active");
};
/*-------------------show and close modal handler------------------*/


/*-------------------show and close modal-req------------------*/
window.showModalReq = (index) => {
  const modals = document.querySelectorAll(".modal-req")
  modals[index].classList.add("active")
}
window.closeModalReq = (index) => {
  const modals = document.querySelectorAll(".modal-req")
  modals[index].classList.remove("active")
}
/*-------------------show and close modal-req------------------*/


/*-------------------price handler------------------*/
window.priceHandler = async (id, user) => {
  await confirmPackage(id);

  const all = await getAllPackage();
  const pa = all.filter((item) => item.id == id);
  const { image, description, Deposit } = pa[0];

  /****--------------add to products----------------****/
  const dataOne = {
    title: "کیک تولد",
    image: image,
    count: 1,
    price: Deposit,
    description: description,
    category_id: 0,
    discount: 0,
    wallet: 100,
    type: "bayane",
  };

  const rrr = await createProduct(dataOne);
  /*****--------------add to products----------------*****/

  const isOrder = await GetOrderWithUser(user);
  const findOrderFalse = isOrder.find(
    (item) => item.user_accept === "false" && item.isDelete === "false"
  );

  let orderId = null;
  if (!findOrderFalse) {
    const data = {
      user_id: user,
      discount_id: 0,
      user_accept: false,
      admin_accept: false,
    };
    orderId = await InsertOrder(data);
    window.localStorage.setItem("orderId", JSON.stringify(orderId));
    const product = {
      order_id: orderId,
      discount: 0,
      product_id: rrr,
      count: 1,
      type: "true",
    };
    await insertProductToOrder(product);
    // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = findOrderFalse.id;

    const product = {
      order_id: orderId,
      discount: 0,
      product_id: rrr,
      count: 1,
      type: "true",
    };
    await insertProductToOrder(product);
    // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  }
};
window.priceHandlerOne = async (id, user) => {
  await confirmPackage(id);

  const all = await getAllPackage();
  const pa = all.filter((item) => item.id == id);
  const { Deposit } = pa[0];

  /****--------------add to products----------------****/
  const dataOne = {
    title: "جعبه دلخواه",
    image: "",
    count: 1,
    price: Deposit,
    description: "",
    category_id: 0,
    discount: 0,
    wallet: 100,
    type: "bayane",
  };

  const rrr = await createProduct(dataOne);
  /*****--------------add to products----------------*****/

  const isOrder = await GetOrderWithUser(user);
  const findOrderFalse = isOrder.find(
    (item) => item.user_accept === "false" && item.isDelete === "false"
  );

  let orderId = null;
  if (!findOrderFalse) {
    const data = {
      user_id: user,
      discount_id: 0,
      user_accept: false,
      admin_accept: false,
    };
    orderId = await InsertOrder(data);
    window.localStorage.setItem("orderId", JSON.stringify(orderId));
    const product = {
      order_id: orderId,
      discount: 0,
      product_id: rrr,
      count: 1,
      type: "true",
    };
    await insertProductToOrder(product);
    // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = findOrderFalse.id;

    const product = {
      order_id: orderId,
      discount: 0,
      product_id: rrr,
      count: 1,
      type: "true",
    };
    await insertProductToOrder(product);
    // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  }
};
/*-------------------price handler------------------*/


/*-----------------confirmReq handler--------------------*/

window.confirmRequest = async(id , user) =>{
    await acceptAdminOrder(id)
    window.location.reload()
}

/*-----------------confirmReq handler--------------------*/
