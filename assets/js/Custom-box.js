import {
  BASE_IAMGE,
  GetAllProduct,
  GetAllProductList,
  GetOrderWithUser,
  InsertOrder,
  addCakeA,
  addPackage,
  createProduct,
  getAllDeposit,
  insertProductToOrder,
  updateCount,
  userId,
  validateLogin,
} from "./api.js";
import { successAlert } from "./Services.js";
await validateLogin();

/* ------------------change img and content--------------------- */
let btns = document.querySelectorAll(".inner-custom-box");
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

/* ------------------change img and content--------------------- */
const allProducts = await GetAllProduct();
const products = allProducts.filter((item) => item.type === "amadeh");
const allDeposit = await getAllDeposit();

const bayaneh = allDeposit[0].package;

const weightBox = document.querySelector("input[name='weight'");
let weight = weightBox.value;

weightBox.addEventListener("input", (e) => {
  weight = e.target.value;
});

const infoItems = [
  { id: 1, info: "شیرینی خامه 1 ", value: "شیرینی_خامه_1 " },
  { id: 2, info: "شیرینی خامه 2 ", value: "شیرینی_خامه_2 " },
  { id: 3, info: "شیرینی خامه 3 ", value: "شیرینی_خامه_3 " },
  { id: 4, info: "شیرینی خامه 4 ", value: "شیرینی_خامه_4 " },
  { id: 5, info: "شیرینی خامه 5 ", value: "شیرینی_خامه_5 " },
  { id: 6, info: "شیرینی خامه 6 ", value: "شیرینی_خامه_6 " },
];

let items = !!window.localStorage.getItem("box")
  ? JSON.parse(window.localStorage.getItem("box"))
  : [{ id: 1, info: 1, row: 1 }];

const container = document.querySelector("#content-items");
const containerTheme = document.querySelector("#container-theme");
const renderPage = () => {
  const footer = document.querySelector("#footer");
  footer.innerHTML = `${bayaneh.toLocaleString()}   تومان`;

  products.forEach((item, index) => {
    const note = ` <div class="col-12 col-lg-6 p-2 pp">
    <div class="product-item">
      <div class="col-3 col-md-4 height">
        <div class="img-product">
          <img src="${BASE_IAMGE}${item.image}" alt="" />
        </div>
      </div>
      <div class="col-6 col-md-5 moshakhaseh">
        <div class="name-product">${item.title}</div>
        <div class="ajza">
          <div class="ajzaitem col-6">
            <span>${item.description}</span>
          </div>
        </div>
      </div>
      <div class="col-2 price">${item.price}<br />هزارتومان</div>
      <div class="col-1 bbb">
        <div class="cart" onclick="addToCartTheme(${item.id})">
          <img src="./assets/images/icon/cart.png" alt="" />
        </div>
      </div>
    </div>
  </div>`;

    containerTheme.innerHTML += note;
  });

  if (!window.localStorage.getItem("box")) {
    window.localStorage.setItem("box", JSON.stringify(items));
  } else {
    const itemsLocal = JSON.parse(window.localStorage.getItem("box"));

    container.innerHTML = "";
    itemsLocal.forEach((item, index) => {
      const note = `
    <div class="col-12 col-md-6 px-2 py-2">
    <div class="inner-pakage-input">
      <div class="right">ردیف ${index + 1} چی باشه؟</div>
      <div class="left">
      <select onChange="changeHandler(${item.id})" class="select my-2" value=${
        item.info
      }>
      ${infoItems
        .map(function (key) {
          return `<option ${
            item.info === key.value ? "selected = 'selected'" : null
          } value=${key.value} >${key.info}</option>`;
        })
        .join("")}
        

        
       </select>
        
        <span
          ><a href="#"
            ><img
              src="./assets/images/icon/Group
            1900.png"
              alt="" /></a
        ></span>
      </div>
      </div>
      </div>`;
      container.innerHTML += note;
    });
  }
};

renderPage();

/*----------------------add item ---------------------------*/
const btnAddItem = document.querySelector("#add-item");

btnAddItem.addEventListener("click", async () => {
  const test = {
    id: items.length + 1,
    info: 1,
    row: items.length + 1,
  };

  items = [...items, test];

  window.localStorage.setItem("box", JSON.stringify(items));
  renderPage();
});
/*----------------------add item ---------------------------*/

const btnAddToCart = document.querySelector("#add-to-cart");
const weightHandler = (weight) => {
  switch (weight) {
    case 0: {
      return 2;
    }
    case 11: {
      return 3;
    }
    case 22: {
      return 4;
    }
    case 33: {
      return 5;
    }
    case 44: {
      return 6;
    }
    case 55: {
      return 7;
    }
    case 66: {
      return 8;
    }
    case 77: {
      return 9;
    }
    case 88: {
      return 10;
    }
    case 99: {
      return 11;
    }
  }
};

btnAddToCart.addEventListener("click", async () => {
  /******------------گرفتن اطلاعات از صفحه------------- */
  const selects = [...document.querySelectorAll("select")];
  const convertToO = selects.map((item) => `{"name" : "${item.value}" }`);
  const convertToS = convertToO.toString();
  /******------------گرفتن اطلاعات از صفحه------------- */

  const userID = await userId();
  /***--------------add to package----------------****/
  const data = {
    user_id: userID,
    Deposit: 0,
    accept: "false",
    type: "pakage",
  };

  const pakageId = await addPackage(data);

  const result = {
    weight: weightHandler(+weight),
    pakage_id: pakageId,
    product_id: convertToS,
  };
  const rra = await addCakeA(result);
  /****--------------add to package----------------****/

  /****--------------add to products----------------****/
  const dataOne = {
    title: "جعبه دلخواه",
    image: "",
    count: 1,
    price: allDeposit[0].package,
    description: "",
    category_id: 0,
    discount: 0,
    wallet: 100,
    type: "bayane",
  };
  const rrr = await createProduct(dataOne);

  /*****--------------add to products----------------*****/

  /*****--------------add to order----------------*****/

  const isOrder = await GetOrderWithUser(userID);
  const findOrderFalse = isOrder.find((item) => item.user_accept === "false" && item.isDelete === "false");

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
      product_id: rrr,
      count: 1,
      type: "true",
    };
    await insertProductToOrder(product);
    successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = JSON.parse(window.localStorage.getItem("orderId"));
    const productList = await GetAllProductList(orderId);
    const isProduct = productList.findIndex(
      (item) => item.product_id === `${pakageId}`
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
        discount: 0,
        product_id: rrr,
        count: 1,
        type: "true",
      };
      await insertProductToOrder(product);
      successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    }
  }
  /*****--------------add to order----------------*****/
});

window.changeHandler = (id) => {
  const item = items[id - 1];

  const value = document.querySelectorAll(".select")[id - 1].value;
  item.info = +value;

  window.localStorage.setItem("box", JSON.stringify(items));
};

/*----------------------remove item ---------------------------*/

const btnDelete = document.querySelector("#delete");

btnDelete.addEventListener("click", () => {
  items.pop();

  window.localStorage.setItem("box", JSON.stringify(items));
  renderPage();
});

/*----------------------remove item ---------------------------*/
/*-------------------addToCartTheme--------------------*/
const userID = await userId();
window.addToCartTheme = async (id) => {
  const isOrder = await GetOrderWithUser(userID);
  const findOrderFalse = isOrder.find((item) => item.user_accept === "false" && item.isDelete === "false");

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
        discount: 0,
        product_id: id,
        count: 1,
        type: "false",
      };
      await insertProductToOrder(product);
      successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    }
  }
};

/*-------------------addToCartTheme--------------------*/
