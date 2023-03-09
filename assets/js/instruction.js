import { convertHardship } from "./Services.js";
import { getAllArticle, validateLogin } from "./api.js";
await validateLogin();

/*------------------render page--------------------*/


const renderPage = async () => {
  const articles = await getAllArticle();
  const amozesh = articles.filter((item) => item.type === "learn");
  const article = articles.filter((item) => item.type === "article");



  const containerA = document.querySelector("#content-amozesh");
  const containerM = document.querySelector("#container");
  amozesh.forEach(async(item , index) => {
    console.log(item)
    const note  = `<div class="col-12 col-md-6 p-2 pp">
    <div class="instruction-item">
      <div class="col-4 col-md-4 height">
        <div class="img-instruction"><img src="http://localhost/cando/cando/file${item.image}"
            alt=""></div>
      </div>
      <div class="col-7 description">
        <div class="name-instruction">${item.title}</div>
        <a href="#">
          <div class="the-description">
          ${item.description}
          </div>
        </a>
        <div class="detiles">
          <span class="time">
            <div class="pl-2"><img src="./assets/images/CLOCK.png"
                alt=""></div>

            <span class="mt-1 pr-1">30دقیقه</span>
          </span>

          <span class="det">
            <div><img src="./assets/images/kitchen.png" alt=""></div>
            <span class="mt-1 pr-1">${await convertHardship(item.hardship)}</span>
          </span>

        </div>
      </div>

      <div class="col-1 bbb">
        <a href="Ready-package-sweets.html?${item.id}">
          <div class="more">
            <img src="./assets/images/more.png" alt="">
          </div>
        </a>
       
      </div>

    </div>
  </div>
  `
    containerA.innerHTML += note
  });
    const note  = ` 
    <div class="swiper w-100" id="slider-main">
    <div class="swiper-wrapper" >
      <!-- START ITEM SLIDER -->
     
      ${
        Object.keys(article).map(item => {

          return `
          <div class="swiper-slide">
          <img src="./assets/images/product.jpeg" alt="">
          <div class="contente-txt">
            <h5>${article[item].title}</h5>
            <span>
            ${article[item].description}
           </span>
            <div class="img-b">
              <a href="Article.html?${article[item].id}"><img src="./assets/images/bottom-f.png"></a>
            </div>
           
          </div>
        </div>    
          
          `


        }).join("")
      }

      
      <!-- end ITEM SLIDER -->


    </div>
    <div class="swiper-pagination"></div>
  </div>
  `
  containerM.innerHTML = note
  
  const swiper = new Swiper('#slider-main', {
    // Default parameters
    slidesPerView: 4,
    spaceBetween: 10,
    // Responsive breakpoints

    autoplay: {
        delay: 4000
    },


    breakpoints: {
        // when window width is >= 320px
        200: {
            slidesPerView: 2,
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
            slidesPerView: 5,
        }
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
};

await renderPage();

/*------------------render page--------------------*/
