import { successAlert } from "./Services.js";
import {
  GetAllStory,
  BASE_URL,
  GetAllProduct,
  InsertOrder,
  GetOrderWithUser,
  GetAllProductList,
  getAllCategories,
  insertProductToOrder,
  getUserWithToken,
  validateLogin,
  userId,
  exit,
  updateCount,
  getAllFavorite,
  addFavorite,
  getAllProductsFavoriteWithId,
} from "./api.js";

await validateLogin();

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
/*-------------------redner page---------------------*/
const renderPage = async () => {
  const userID = await userId();
  //render story
  const story = await GetAllStory();
  story.forEach((item) => {
    const modal = `  <div class="content-modal" id="modal-edit-showcase">
    <div class="inner-modal">
      <div class="content" style="width: 430px;border-radius: 20px;border: 0;">
        <div class="col-12" >
          <img style="width: 100%;height: 250px;" src="${BASE_URL}file${item.file}">
        </div>
        <form class="px-4 pt-2">
        <div class="col-12 px-4 py-2 ">
         
          <h2>نام محصول روز</h2>
        </div>
        <div class="col-12 col-md-8 px-4 py-2" style="font-size: 15px;">
          <span>${item.description}</span>
        </div>
        <div class="col-12 p-2 d-flex align-items-end">
            <div class="add-to-cart col-7 col-md-5">
                <div style="font-size: 0.8em;">افزودن به سبد خرید</div>
                <div class="img-cart p-1">
                    <img src="./assets/images/kharid.png">
                </div>
            </div>
            <div class="col-5 col-md-7 d-flex flex-column align-items-end" >
                <span>تاریخ پخت:</span>
                <span>صبح</span>
                <span>${item.created}</span>
            </div>
        </div>
          
      </form>
      </div>
    </div>
</div>`;
    const note = `
     <div class="swiper-slide test2">
                            <div class="story-box">
                                <img
                                    src="${BASE_URL}file${item.file}"
                                    class="img-story">  
                                <div class="content-story">
                                    
                                    <!-- <p class="des-sweet">${item.description}</p> -->
                                </div>

                            </div>
                        </div>
    `;

    document.querySelector("#modal").innerHTML += modal;
    document.querySelector("#story").innerHTML += note;
  });
  // render products
  const products = await GetAllProduct();
  const filterProducts = products.filter((item) => item.type === "sefareshi");
  filterProducts.forEach(async (item, index) => {
    const note2 = `<div class="new-products-content ${
      index == 0 ? "active" : ""
    }" id="new-product">
    <div class="col-12 new-product-item ">
        <div class="col-8 content-right p-2">
            <h1>${item.title}</h1>
            <div class="product-des">
                <p>${item.description}</p>
            </div>
        </div>
        <div class="col-4 content-left p-2">
            <div class="prices ">
                <div>${item.price}</div>
                <div>هزارتومان</div>

            </div>
            <div class="add-to-cart col-12 col-md-8 col-lg-6" data-dis=${
              item.discount
            } data-order="${item.id}" onclick="addToCart(${item.id} , ${
      item.discount
    })">
                <div class="img-cart p-1">
                    <img src="./assets/images/kharid.png">

                </div>
                <div>افزودن به سبد خرید</div>
            </div>
        </div>

    </div>
</div>`;
    const note = `<div class="products-item col-4 col-md-2 m-2 " id="image-product">
<div class="image-products-item  ">
    <div class="up p-1">
        <div class="up-image p-1">
            <img src="./assets/images/pakage.png">
        </div>
        <div class="text">${item.category}</div>
    </div>
<div class="image-cake">
    <img src="${BASE_URL}file${item.image}">
</div>
    <div class="img-title">
        <div class="cake-name">
           ${item.title}
        </div>
        <div class="heart " onclick="favoriteHandler(${item.id} , ${index})">
            <img src="./assets/images/heart.png">
        </div>

    </div>

</div>
</div>`;
    document.querySelector("#description").innerHTML += note2;
    document.querySelector("#product").innerHTML += note;
  });

  // rednder categories
  const allCategories = await getAllCategories();

  allCategories.forEach((item) => {
    const note = `
    <div class="col-2 group-item mx-1 p-1" data-id=${item.id}><span>${item.name}</span></div>
    `;
    document.getElementById("all-categories").innerHTML += note;
  });
  const btns = document.querySelectorAll(".group-item");

  btns.forEach((item, index) => {
    item.addEventListener("click", () => {
      btns.forEach((item) => {
        item.classList.remove("active");
      });
      // contents.forEach((item) => {
      //   item.classList.remove("active");
      // });
      btns[index].classList.add("active");
      // contents[index].classList.add("active");
    });
  });

  btns[0].classList.add("active");
};

await renderPage();

/*-------------------redner page---------------------*/

//swiper
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  breakpoints: {
    360: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 3,
    },
    700: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 2000,
  },
});

//swiper
const products = new Swiper("#slider-offer", {
  // Optional parameters
  direction: "horizontal",

  spaceBetween: 10,
  slidesPerView: 1,

  // If we need pagination
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 3,
    },
    // when window width is >= 480px
    500: {
      slidesPerView: 4,
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 6,
    },
  },
  autoplay: {
    delay: 2000,
  },
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

///کلیک کردن روی عکس ها و محتوای ها عکس رو نمایش دادن
let btns = document.querySelectorAll("#image-product");
let contents = document.querySelectorAll(" #new-product");

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

//کلیک کردن روی عکس های اسلایدر و پاپ اپ باز شدن
let slider = document.querySelectorAll(".test2");
let modal_vitrin = document.querySelectorAll(" #modal-edit-showcase");
let overalyModals = document.querySelectorAll(
  "#modal-edit-showcase .inner-modal"
);

slider.forEach((item, index) => {
  item.addEventListener("click", () => {
    modal_vitrin[index].classList.add("active");
  });
});
overalyModals.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (e.target.className === "inner-modal") {
      modal_vitrin[index].classList.remove("active");
    }
  });
});

/*------------------exit menu-admin ------------------- */
// let exit = document.getElementById("exit");
// let menu = document.querySelector(".menu-admin");
// exit.addEventListener("click", (e) => {
//   menu.classList.remove("active");
// });
/*------------------exit menu-admin ------------------- */

const userID = await userId();
window.addToCart = async (id, discount) => {
  const isOrder = await GetOrderWithUser(userID);
  const findOrderFalse = isOrder.find((item) => item.user_accept === "false" && item.isDelete === "false");
  console.log(findOrderFalse)
  let orderId = null;
  if (!findOrderFalse) {
    const data = {
      user_id: userID,
      discount_id: 0,
      status : 0,
      user_accept: false,
      admin_accept: false,
    };
    orderId = await InsertOrder(data);
    window.localStorage.setItem("orderId", JSON.stringify(orderId));
    const product = {
      order_id: orderId,
      discount: discount,
      product_id: id,
      count: 1,
      type: "false",
    };
    await insertProductToOrder(product);
    successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = JSON.parse(window.localStorage.getItem("orderId"));
    const productList = await GetAllProductList(orderId);
    const isProduct = productList.findIndex(
      (item) => item.product_id === `${id}`
    );
    if (isProduct !== -1) {
      const id = productList[isProduct].id;

      const data = {
        id,
      };

      const rr = await updateCount(id, data);
      successAlert("success", "یکی به تعداد این محصول در سبد خرید اضافه شد");
    } else {
      const product = {
        order_id: orderId,
        discount: discount,
        product_id: id,
        count: 1,
        type: "false",
      };
      await insertProductToOrder(product);
      successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    }
  }
  // setTimeout(() => {
  //   window.location.reload()
  // }, 2000);
};

//افزودن به سبد خرید

const heart = document.querySelectorAll("#heart");
heart.forEach((item) => {
  item.addEventListener("click", () => {});
});

const btnsCategory = document.querySelectorAll(".group-item");

const data = await GetAllProduct();

const productRender = (products) => {
  document.querySelector("#description").innerHTML = "";
  document.querySelector("#product").innerHTML = "";
  products.forEach((item, index) => {
    const note2 = `<div class="new-products-content ${
      index == 0 ? "active" : ""
    }" id="new-product">
    <div class="col-12 new-product-item ">
        <div class="col-8 content-right p-2">
            <h1>${item.title}</h1>
            <div class="product-des">
                <p>${item.description}</p>
            </div>
        </div>
        <div class="col-4 content-left p-2">
            <div class="prices ">
                <div>${item.price}</div>
                <div>هزارتومان</div>

            </div>
            <div class="add-to-cart col-12 col-md-8 col-lg-6" data-dis=${
              item.discount
            } data-order="${item.id}" onclick="addToCart(${item.id} , ${
      item.discount
    })">
                <div class="img-cart p-1">
                    <img src="./assets/images/kharid.png">

                </div>
                <div>افزودن به سبد خرید</div>
            </div>
        </div>

    </div>
</div>`;
    const note = `<div class="products-item col-4 col-md-2 m-2 " id="image-product">
<div class="image-products-item  ">
    <div class="up p-1">
        <div class="up-image p-1">
            <img src="./assets/images/pakage.png">
        </div>
        <div class="text">${item.category}</div>
    </div>
<div class="image-cake">
    <img src="${BASE_URL}file${item.image}">
</div>
    <div class="img-title">
        <div class="cake-name">
           ${item.title}
        </div>
        <div class="heart">
            <img src="./assets/images/heart.png">
        </div>

    </div>

</div>
</div>`;
    document.querySelector("#description").innerHTML += note2;
    document.querySelector("#product").innerHTML += note;
  });
};

btnsCategory.forEach((item, index) => {
  item.addEventListener("click", async () => {
    const id = item.getAttribute("data-id");
    const filterData = data.filter((item) => item.category_id === id);
    const newData = filterData.slice(0, 10);
    if (id === "all") {
      productRender(data);
    } else {
      productRender(newData);
    }
  });
});

/*-------------------exit account--------------------*/
const btnExit = document.querySelector("#exit");

btnExit.addEventListener("click", async () => {
  await exit();
  window.location.reload();
});

/*-------------------exit account--------------------*/

/*----------------------favorite add product--------------------*/
window.favoriteHandler = async (id) => {
  const allFavorite = await getAllProductsFavoriteWithId(userID);
  const isFavorite = allFavorite.findIndex((item) => item.product === `${id}`);
  if (isFavorite === -1) {
    const data = {
      user_id: userID,
      product: id,
    };
    const tt = await addFavorite(id, data);
    successAlert("success", "محصول با موفقیت به علاقه مندی ها  اضافه شد");
  } else {
    successAlert("error", "محصول قبلا به علاقه مندی ها اضافه شده است");
    return;
  }
};
/*----------------------favorite add product--------------------*/
