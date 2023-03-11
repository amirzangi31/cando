import { successAlert } from "./Services.js";
import {
  GetAllProductList,
  GetOrderWithUser,
  GetProductWithId,
  InsertOrder,
  getAllComment,
  getAllDeposit,
  getPath,
  getUserWithId,
  insertProductToOrder,
  updateCount,
  userId,
  validateLogin,
} from "./api.js";
await validateLogin();

/*------------------------render Page-------------------------------*/
const path = await getPath();
const getProduct = await GetProductWithId(+path);
const product = getProduct[0];
const { title, description, price } = product;
const allDeposit = await getAllDeposit();
const { cake } = allDeposit[0];

const allComments = await getAllComment();
const commentsProduct = allComments.filter(
  (item) => item.product_id === `${path}` && item.accepted === "1"
);

const renderPage = async () => {
  const headerContainer = document.querySelector("#header");
  const header = `
  <header class="header-section-top">
                    <span class="back"><img src="./assets/images/icon/Group 1900.png"
                        alt="icon"
                        /></span>
    
                </header>
                <div class="content-top">
                    <div class="col-6 section-right">
                        <h1>${title}</h1>
                        <span>
                            ${description}
                        </span>
                    </div>
                    <div class="col-6 section-left">
                        <div class="col-5 content-left-top">
                            <div class="item p-2" >
                                <h6 >${price}</h6>
                                <span>هزارتومان</span>
                                <span class="col-12 bb">برای خرید های بالای 10عدد</span>
                            </div>
                            <div class="price p-2">
                                <h6>${price}</h6>
                                <span>هزارتومان</span>

                            </div>

                        </div>
                        <div class="col-5 content-left-down">
                            <div class="col-12 image-point">
                                    <span class="p-1" >4.1</span>
                                    <img class="p-1" src="./assets/images/icon/star.png">
                                    <img class="p-1" src="./assets/images/icon/star.png">
                                    <img class="p-1" src="./assets/images/icon/star.png">
                                    <img class="p-1" src="./assets/images/icon/star.png">
                               
                            </div>
                            <span class="col-12">(25نظر)</span>

                        </div>
                    </div>
    
  </div>`;
  headerContainer.innerHTML = header;

  const bayane = document.querySelector("#price");
  bayane.innerHTML = `${cake} تومان`;

  const commentContainer = document.querySelector("#comment");

  commentsProduct.forEach(async (item, index) => {
    const user = await getUserWithId(item.id);
    const { name } = user[0];
    const note = `  <div class="col-12 comments-cotent p-2 py-3">
    <div class="col-1 img">
        <img src="./assets/images/yyyyyy.png">
        <span>${name}</span>
    </div>
    <div class="col-6 text-des">
        <h4>عنوان دیدگاه</h4>
        <span>${item.description}</span>

    </div>
    <div class="col-5 tarikh">
        <div class="col-12 tarikh-item">
            <span>3اردیبهشت1400</span>
        </div>
        <div class="col-12 like-item">
            <div class="col-4 col-md-3 mx-1 like p-1">
                <img src="./assets/images/icon/like.png">
                <span>3</span>
            </div>
            <div class="col-4 col-md-3 like p-1">
                <img src="./assets/images/icon/dislike.png">
                <span>3</span>
            </div>

        </div>

    </div>

</div>`;

    commentContainer.innerHTML += note;
  });
};

await renderPage();
/*-----------------------render Page--------------------------------*/

//swiper filing
const swiper_filing = new Swiper("#myswiper", {
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
      slidesPerView: 3,
    },
    // when window width is >= 480px
    500: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//swiper filing

//swiper filing
// const swiper_esfanje = new Swiper('#myswiper-esfanje', {
//     // Default parameters
//     slidesPerView: 4,
//     spaceBetween: 10,
//     // Responsive breakpoints

//     autoplay: {
//         delay: 4000
//     },

//     breakpoints: {
//         // when window width is >= 320px
//         200: {
//             slidesPerView: 3,
//         },
//         // when window width is >= 480px
//         500: {
//             slidesPerView: 3,
//         },
//         // when window width is >= 640px
//         768: {
//             slidesPerView: 3,
//         },
//         992: {
//             slidesPerView: 3,
//         }
//     },

//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

// })
//swiper filing

//swiper filing
// const swiper_cream = new Swiper('#myswiper-cream', {
//     // Default parameters
//     slidesPerView: 4,
//     spaceBetween: 10,
//     // Responsive breakpoints

//     autoplay: {
//         delay: 4000
//     },

//     breakpoints: {
//         // when window width is >= 320px
//         200: {
//             slidesPerView: 3,
//         },
//         // when window width is >= 480px
//         500: {
//             slidesPerView: 3,
//         },
//         // when window width is >= 640px
//         768: {
//             slidesPerView: 3,
//         },
//         992: {
//             slidesPerView: 3,
//         }
//     },

//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

// })
//swiper filing

let btns = document.querySelectorAll(".top-arrows");
let contents = document.querySelectorAll("#myswiper");

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

/*-----------------add to order-------------------*/
const btn_add_order = document.querySelector("#add-to-order");
const userID = await userId();

btn_add_order.addEventListener("click", async () => {
  const isOrder = await GetOrderWithUser(userID);
  const findOrderFalse = isOrder.find(
    (item) => item.user_accept === "false" && item.isDelete === "false"
  );

  let orderId = null;
  if (!findOrderFalse) {
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
      product_id: path,
      count: 1,
      type: "false",
      package_id: null,
    };
    await insertProductToOrder(product);
    successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = JSON.parse(window.localStorage.getItem("orderId"));
    const productList = await GetAllProductList(orderId);
    const isProduct = productList.findIndex(
      (item) => item.product_id === `${path}`
    );
    if (isProduct !== -1) {
      const id = productList[isProduct].id;

      const data = {
        id: path,
      };

      const rr = await updateCount(id, data);
      successAlert("success", "یکی به تعداد این محصول در سبد خرید اضافه شد");
    } else {
      const product = {
        order_id: orderId,
        discount: 0,
        product_id: path,
        count: 1,
        type: "false",
        package_id: null,
      };
      await insertProductToOrder(product);
      successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    }
  }
});

/*-----------------add to order-------------------*/
