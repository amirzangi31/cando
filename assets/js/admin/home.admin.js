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
let slider = document.querySelectorAll(".test2");
let modal_vitrin = document.querySelector(" #modal-edit-showcase");
let overalys = document.querySelector("#modal-edit-showcase .inner-modal");

slider.forEach((item, index) => {
  item.addEventListener("click", () => {
    modal_vitrin.classList.add("active");
  });
});
overalys.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal") {
    modal_vitrin.classList.remove("active");
  }
});

/*-------------------add new product------------------*/

const btnAddNewProduct = document.querySelector("#add-product");
console.log(btnAddNewProduct);

const getInfoNewProduct = () => {
  const image = document.getElementById("upload").value;
  const name = document.getElementById("package-name").value;
  const information = document.getElementById("information").value;
  const time = document.getElementById("Equipment").value;
  const date = document.getElementById("date").value;
  const mojodi = document.getElementById("mojodi").value;
  return { name, image, information, time, date, mojodi };
};

btnAddNewProduct.addEventListener("click", () => {
  console.log(getInfoNewProduct());
});

/*-------------------add new product------------------*/
