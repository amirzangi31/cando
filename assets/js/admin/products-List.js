import {
  addCategory,
  BASE_IAMGE,
  createProduct,
  getAllCategories,
  GetAllProduct,
  uploadImage,
  validateLoginAdmin,
} from "../api.js";
await validateLoginAdmin()

/*----------------render Page----------------*/

// const test = document.querySelector("#demo");
// test.addEventListener("click", async () => {
//   const data = {
//     title: "cake - 66",
//     image: "ajfnv asdkl",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
//     price: 200,
//     category_id: 66,
//     discount: 0,
//     wallet: 20,
//     type: "sefareshi",
//   };
//   await createProduct(data);
// });

let imageUrl;

const renderPage = async () => {
  const categories = await getAllCategories();
  const pakages = await GetAllProduct();

  const containerModals = document.querySelector("#container-modal");
  const containerBtns = document.querySelector("#btn-content");
  const containerPackages = document.querySelector("#content");

  containerModals.innerHTML = "";
  containerPackages.innerHTML = "";
  containerBtns.innerHTML = "";

  categories.forEach((item, index) => {
    const miniPackage = pakages.filter((ttt) => item.id === ttt.category_id);
    const modal = `  <div class="content-modal" id="modal-products-list">
    <div class="inner-modal">
      <div class="content">
        <form class="px-4 pt-2">
          <div class="uplode-image mx-4 my-2">
          <input type="file" hidden id="image-model" hidden onchange="upload()"/> 
            <span>
              <img src="../assets/images/plus.png" />
            </span>
            <label for="image-model" class="mb-0">
              عکس را<br />
              اضافه کنید
            </label>
          </div>
          <div class="col-12 px-4 py-2">
            <input
              class="form-control pakage-name"
              name="package"
              id="package-name"
              type="text"
              placeholder="نام محصول"
              aria-label=".form-control-lg example"
            />
          </div>
          <div class="col-12 px-4 py-2">
            <textarea
              class="description-textarea description-model"
              cols="50"
              rows="4"
              
              placeholder="توضیحات"
            ></textarea>
          </div>
          <div class="col-12 px-4 py-2">
            <input
              class="form-control weight-model"
              name="value-price"
              id="price"
              type="text"
              placeholder="قیمت هر کیلو"
              aria-label=".form-control-lg example"
            />
          </div>
          <div class="col-12 px-4 py-2">
            <input
              class="form-control price-model"
              name="value-wholesale"
              id="wholesale-price"
              type="text"
              placeholder="قیمت عمده"
              aria-label=".form-control-lg example"
            />
          </div>
          <div class="col-12 px-4 py-2">
            <input
              class="form-control count-model"
              name="value-inventory"
              id="inventory-price"
              type="text"
              placeholder="قیمت موجودی"
              aria-label=".form-control-lg example"
            />
          </div>
        </form>
        <div class="birthday-package mt-2" onclick="createModel(${item.id} , ${index})">
          <p>تعریف کیک جدید</p>
        </div>
      </div>
    </div>
  </div>`;
    const btn = `
    <div class="col-2 group-item mx-1 p-1 sweet"><span>${item.name}</span></div>
    `;
    const packages = `
    <div class="content-pakage">
            <section class="category-product w-100">
              ${Object.keys(miniPackage)
                .map((key) => {


                  return `<div class="col-12 col-md-6 p-2 pp">
                  <div class="product-item">
                    <div class="col-4 height">
                      <div class="img-product">
                        <img src="${BASE_IAMGE}${miniPackage[key].image}" alt="aaaa" />
                      </div>
                    </div>
                    <div class="col-6 col-md-5 moshakhaseh">
                      <div class="description">
                        <div class="description-item col-12">
                          <span>نام محصول:${miniPackage[key].title}</span>
                        </div>b
                        <div class="description-item col-12">
                          <span>موجودی:12عدد</span>
                        </div>
                        <div class="description-item col-12">
                          <span>قیمت هرکیلو:${miniPackage[key].price}تومان</span>
                        </div>
                        <div class="description-item col-12">
                          <span>قیمت عمده:${miniPackage[key].price}تومان</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-1 bbb">
                      <div class="cart">
                        <div class="cart-image-trash" onclick="deleteHandler(${miniPackage[key].id})">
                          <img src="../assets/images/trash.png" alt="" />
                        </div>
                        <div class="cart-image-edit" onclick="updateHandler(${miniPackage[key].id})">
                          <img src="../assets/images/edit.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
                })
                .join("")}
            </section>
            <div class="btn-main col-12" id="new-cake-btn">
              <div class="btn-main-content">
                <span>
                  <img src="../assets/images/plus1.png" />
                </span>
                <p class="mb-0 me-1">تعریف ${item.name} جدید</p>
              </div>
            </div>
          </div>`;

    containerModals.innerHTML += modal;
    containerBtns.innerHTML += btn;
    containerPackages.innerHTML += packages;
  });

  const btns = document.querySelectorAll("#btn-content .group-item");
  const contents = document.querySelectorAll(".content-pakage");
  if (btns.length > 1) {
    document.querySelectorAll(".sweet")[0].classList.add("active");
    document.querySelectorAll(".content-pakage")[0].classList.add("active");
  }
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
  let btnsShowModal = document.querySelectorAll("#new-cake-btn");
  let modals = document.querySelectorAll("#modal-products-list");
  let overalyModals = document.querySelectorAll(
    "#modal-products-list .inner-modal"
  );
  btnsShowModal.forEach((item, index) => {
    item.addEventListener("click", () => {
      modals[index].classList.add("active");
    });
  });
  overalyModals.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      if (e.target.className === "inner-modal") {
        modals[index].classList.remove("active");
      }
    });
  });
};

await renderPage();
window.onload = () => {
  btns[0].classList.add("active");
  contents[0].classList.add("active");
};

/*--------------------upload images-----------------*/

window.upload = async () => {
  const image = await uploadImage("image-model");

  imageUrl = image;
};
/*--------------------upload images-----------------*/

/*------------------Create Model-----------------------*/
window.createModel = async (id, index) => {
  const name = document.querySelectorAll(".pakage-name")[index];
  const weight = document.querySelectorAll(".weight-model")[index];
  const count = document.querySelectorAll(".count-model")[index];
  const price = document.querySelectorAll(".price-model")[index];
  const des = document.querySelectorAll(".description-model")[index];

  const data = {
    title: name.value,
    image: imageUrl,
    count: count.value,
    price: `${price.value}`,
    description: des.value,
    category_id: id,
    discount: 0,
    wallet: 100,
    type: "sefareshi",
  };

  await createProduct(data);
  window.location.reload()
};
/*------------------Create Model-----------------------*/

/*--------------------Delete Model---------------------*/
window.deleteHandler = (id) => {
  console.log(`delete for model : ${id}`);
};
/*--------------------Delete Model---------------------*/

/*--------------------Update Model---------------------*/

window.updateHandler = (id) => {
  console.log(id);
  const data = {};
  //import function updateProduct(data , id)
};

/*--------------------Update Model---------------------*/

/*----------------render Page----------------*/
/*----------------add new category----------------*/

const btnShowModal = document.querySelector("#show-modal-name");
const addModal = document.querySelector("#modal-grouping");
const closeModal = document.querySelector("#inner-modal");

closeModal.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal-grouping") {
    addModal.classList.remove("active");
  }
});

btnShowModal.addEventListener("click", () => {
  addModal.classList.add("active");
});

let btns = document.querySelectorAll(".sweet");
let contents = document.querySelectorAll(".content-pakage");
const addCategoryBtn = document.querySelector("#add-category");
addCategoryBtn.addEventListener("click", async () => {
  const name = document.querySelector("#input-new-category").value;
  const data = { name: name };
  await addCategory(data);
  await renderPage();
  addModal.classList.remove("active");
  btns.forEach((item) => {
    item.classList.remove("active");
  });
  contents.forEach((item) => {
    item.classList.remove("active");
  });
});
/*----------------add new category----------------*/

/*------------------show and close modal products list ------------------- */
let btnsShowModal = document.querySelectorAll("#new-cake-btn");
let modals = document.querySelectorAll("#modal-products-list");
let overalyModals = document.querySelectorAll(
  "#modal-products-list .inner-modal"
);
btnsShowModal.forEach((item, index) => {
  item.addEventListener("click", () => {
    modals[index].classList.add("active");
  });
});
overalyModals.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (e.target.className === "inner-modal") {
      modals[index].classList.remove("active");
    }
  });
});

/*------------------show and close modal products list------------------- */

// change content main with menu

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



