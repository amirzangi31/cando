import { shortText } from "../Services.js";
import { BASE_IAMGE, GetAllProduct, createProduct, uploadImage, validateLoginAdmin } from "../api.js";
await validateLoginAdmin()

/*-------------------render Page---------------------*/
const allProducts = await GetAllProduct()
const products = allProducts.filter(item => item.type === "amadeh")
const productsh = allProducts.filter(item => item.type === "jabeh")


const renderPage = async () => {
const themContainer= document.querySelector("#container-theme")
products.forEach((item , index) => {

  const note = `
  <div class="col-12 col-md-6 p-2 pp">
                <div class="product-item">
                  <div class="col-3 col-md-4 height">
                    <div class="img-product"><img src="${BASE_IAMGE}${item.image}"
                        alt=""></div>
                  </div>
                  <div class="col-6 col-md-5 moshakhaseh">
                    <div class="name-product">${item.title}</div>
                    <div class="ajza">
                      <div class="ajzaitem col-6">
                        
                        <span>${item.description}</span>
                      </div>
                      
  
                    </div>
                  </div>
                  <div class="col-2 price">
                    ${item.price}<br />هزارتومان
                  </div>
                  <div class="col-1 bbb">
                    <div class="cart">
                      <div class="cart-image-trash"><img src="../assets/images/trash.png" alt=""></div>
                     <div class="cart-image-edit"><img src="../assets/images/edit.png" alt=""></div>
                    </div>
                  </div>
  
                </div>
  
              </div>`

  themContainer.innerHTML += note
})


const shContainer = document.querySelector("#container-sh")

productsh.forEach(async(item , index) => {
  const note = `
  <div class="col-12 col-md-6 p-2 pp">
                <div class="product-item">
                  <div class="col-3 col-md-4 height">
                    <div class="img-product"><img src="${BASE_IAMGE}${item.image}"
                        alt=""></div>
                  </div>
                  <div class="col-6 col-md-5 moshakhaseh">
                    <div class="sweat-name">${item.title}</div>
                    <div class="description">
                      <div class="description-item col-12">
                        <span>${item.description}</span>
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-2 price">
                    ${item.price}<br />هزارتومان
                  </div>
                  <div class="col-1 bbb">
                    <div class="cart">
                      <div class="cart-image-trash"><img src="../assets/images/trash.png" alt=""></div>
                     <div class="cart-image-edit"><img src="../assets/images/edit.png" alt=""></div>
                    </div>
                  </div>
  
                </div>
  
              </div>`

  shContainer.innerHTML += note
})






};
await renderPage();

/*-------------------render Page---------------------*/

// change content pakage main new-birth and  new sweet

let btns = document.querySelectorAll(".btn-change");
let contents = document.querySelectorAll(".content-pakage");

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
// change content pakage main new-birth and  new sweet

/*------------------show and close modal-new-birth ------------------- */
let btnsShowModal = document.querySelector("#new-birth-btn");
let modals = document.querySelector("#modal-newbirth-pakage");
let overalyModals = document.querySelector(
  "#modal-newbirth-pakage .inner-modal"
);

btnsShowModal.addEventListener("click", () => {
  modals.classList.add("active");
});

overalyModals.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal") {
    modals.classList.remove("active");
  }
});
/*------------------show and close modal-new-birth ------------------- */

/*------------------show and close modal-new-sweet ------------------- */
let btnShowModalsweet = document.querySelector("#new-sweet-btn");
let modalsweet = document.querySelector("#modal-making-sweets");
let overalyModal = document.querySelector("#modal-making-sweets .inner-modal");

btnShowModalsweet.addEventListener("click", () => {
  modalsweet.classList.add("active");
});

overalyModal.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal") {
    modalsweet.classList.remove("active");
  }
});

/*------------------show and close modal-new-sweet ------------------- */


/*---------------------upload imageT-----------------------*/
let imageUrlT ;
const inputT = document.querySelector("#image-t")
inputT.addEventListener("change" , async() =>{

  const image = await uploadImage("image-t");
  
  imageUrlT = image;
})

/*---------------------upload imageT-----------------------*/
/*---------------------upload imageSh-----------------------*/
let imageUrlSh ;
const inputSh = document.querySelector("#image-sh")
inputSh.addEventListener("change" , async() =>{

  const image = await uploadImage("image-sh");
  
  imageUrlSh = image;
})

/*---------------------upload imageSh-----------------------*/


/*------------------add product---------------------*/
const btn_add_theme = document.querySelector("#btn-add-theme")
const name_t = document.querySelector("#name-t")
const des_t = document.querySelector("#des-t")
const price_t = document.querySelector("#price-t")

btn_add_theme.addEventListener("click" , async() => {

  const data = {
    title: name_t.value,
    image: imageUrlT,
    count: 0,
    price: `${price_t.value}`,
    description: des_t.value,
    category_id: null,
    discount: 0,
    wallet: 100,
    type: "amadeh",
  };


  const ttt= await createProduct(data)
  window.location.reload()
})


/*------------------add product---------------------*/

/*------------------add product---------------------*/
const btn_add_Sh = document.querySelector("#btn-add-sh")
const name_sh = document.querySelector("#name-sh")
const des_sh = document.querySelector("#des-sh")
const price_sh = document.querySelector("#price-sh")

btn_add_Sh.addEventListener("click" , async() => {

  const data = {
    title: name_sh.value,
    image: imageUrlSh,
    count: 0,
    price: `${price_sh.value}`,
    description: des_sh.value,
    category_id: null,
    discount: 0,
    wallet: 100,
    type: "jabeh",
  };


  await createProduct(data)
  window.location.reload()
})


/*------------------add product---------------------*/


