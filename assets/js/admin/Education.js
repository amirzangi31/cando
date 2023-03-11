import { convertHardship, shortText } from "../Services.js";
import { BASE_IAMGE, addAmozesh, getAllArticle, uploadImage, validateLoginAdmin } from "../api.js";
await validateLoginAdmin()

/*---------------------render Page-------------------*/
const renderPage = async () => {
  const articles = await getAllArticle();
  const amozesh = articles.filter((item) => item.type === "learn");
  const article = articles.filter((item) => item.type === "article");



  const containerA = document.querySelector("#content-amozesh");
  const containerM = document.querySelector("#content-maghaleh");

  amozesh.forEach(async(item, index) => {
    const note = `
    <div class="col-12 col-md-6  p-2 pp">
                <div class="product-item">
                  <div class="col-4 col-md-4 height">
                    <div class="img-product"><img src="http://localhost/cando/cando/file${item.image}"
                        alt=""></div>
                  </div>
                  <div class="col-7 col-md-7 moshakhaseh">
                    <div class="sweat-name">${item.title}</div>
                    <div class="description">
                      <div class="description-item col-12">
                        <span>${ shortText(item.description , 150)}</span>
                      </div>

                      <div class="detiles">
                        <div class="col-6 p-1">
                            <div class="detiles-item">
                                <span class="col-9 right">زمان (دقیقه)</span>
                                <span class="left col-3">22</span>
                            </div>
                        </div>
                        <div class="col-6 p-1">
                            <div class="detiles-item">
                                <span class="col-8 right">درجه سختی</span>
                                <span class="left col-4">${await convertHardship(item.hardship)}</span>
                            </div>
                        </div>

                      </div>
                    </div>
                 
                  </div>
                 
                  <div class="col-1 bbb">
                    <div class="cart">
                      <div class="cart-image-trash"><img src="../assets/images/trash.png" alt=""></div>
                     <div class="cart-image-edit"><img src="../assets/images/edit.png" alt=""></div>
                    </div>
                  </div>
  
                </div>
  
              </div>
    `;
    containerA.innerHTML += note;
  });

  article.forEach(async(item, index) => {
    console.log(item)
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
            <span>${ shortText(item.description , 100)}</span>
          </div>
        </div>
      </div>
      <div class="col-1 bbb">
        <div class="cart">
          <div class="cart-image-trash"><img src="../assets/images/trash.png" alt=""></div>
         <div class="cart-image-edit"><img src="../assets/images/edit.png" alt=""></div>
        </div>
      </div>

    </div>

  </div>`;
    containerM.innerHTML += note;
  });
};

await renderPage();

/*---------------------render Page-------------------*/

// change content pakage main new-education and  new Article

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
// change content pakage main new-education and  new Article

/*------------------show and close modal-new-education ------------------- */
let btnShowModaleducation = document.querySelector("#new-education-btn");
let modalseducation = document.querySelector("#modal-education-pakage");
let overalyModals = document.querySelector(
  "#modal-education-pakage .inner-modal"
);

btnShowModaleducation.addEventListener("click", () => {
  modalseducation.classList.add("active");
});

overalyModals.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal") {
    modalseducation.classList.remove("active");
  }
});

/*------------------show and close modal-new-education ------------------- */

/*------------------show and close modal-new-Article ------------------- */
let btnShowModalsweet = document.querySelector("#new-Article-btn");
let modalsweet = document.querySelector("#modal-add-Article");
let overalyModal = document.querySelector("#modal-add-Article .inner-modal");

btnShowModalsweet.addEventListener("click", () => {
  modalsweet.classList.add("active");
});

overalyModal.addEventListener("click", (e) => {
  if (e.target.className === "inner-modal") {
    modalsweet.classList.remove("active");
  }
});

/*------------------show and close modal-new-Article ------------------- */

/*------------------on and off desired-package in modal ------------------- */

function validate() {
  var checkbox = document.getElementById("check-input");
  var package_delkhah = document.getElementById("package-delkhah");
  if (checkbox.checked == true) {
    var a = document.getElementById("small-circle");
    var b = document.getElementById("circle-bironi");
    a.style.right = "9%";
    b.style.backgroundColor = "#55BF63";
    package_delkhah.style.display = "block";
    // for(var i=0;i<package_delkhah.length;i++)
    // {
    //   package_delkhah[i].style.display="flex";
    // }
  } else {
    var x = document.getElementById("small-circle");
    var y = document.getElementById("circle-bironi");
    x.style.right = "54%";
    y.style.backgroundColor = "#9e9fb1";
    package_delkhah.style.display = "none";

    // for(var i=0;i<package_delkhah.length;i++)
    // {
    //   package_delkhah[i].style.display="none";
    // }
  }
}

/*------------------on and off desired-package in modal ------------------- */

/*--------------------upload images-----------------*/

let imageUrl;

const image = document.querySelector("#image-model");
const imageM = document.querySelector("#modal-image-m");

const btnA = document.querySelector("#btn-amozesh");
const btnM = document.querySelector("#btn-maghaleh");

image.addEventListener("change", async () => {
  const image = await uploadImage("image-model");
  imageUrl = image;
});
imageM.addEventListener("change", async () => {
  const image = await uploadImage("modal-image-m");
  imageUrl = image;
});

btnA.addEventListener("click", async () => {
  const title = document.querySelector("#title-a");
  const des = document.querySelector("#des-a");
  const time = document.querySelector("#time");
  const mavad = document.querySelector("#mavad");
  const image = imageUrl;
  const type = "learn";
  const hardShip = "easy";

  const data = {
    title: title.value,
    description: des.value,
    created: time.value,
    image,
    type,
    hardship: hardShip,
    raw_material : mavad.value
  };
  const rr = await addAmozesh(data);
  console.log(rr)
});

btnM.addEventListener("click", async () => {
  const title = document.querySelector("#title-m");
  const des = document.querySelector("#des-m");
  const time = "00";
  const image = imageUrl;
  const type = "article";
  const hardShip = "easy";

  const data = {
    title: title.value,
    description: des.value,
    created: time,
    image,
    type,
    hardship: hardShip,
    raw_material : ""

  };
const rrr=await addAmozesh(data)
console.log(rrr)
});

/*--------------------upload images-----------------*/
