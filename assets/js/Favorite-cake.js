import { successAlert } from "./Services.js";
import {
  GetAllProductList,
  GetOrderWithUser,
  InsertOrder,
  addCake,
  addPackage,
  createProduct,
  getAllDeposit,
  insertProductToOrder,
  uploadImage,
  userId,
  validateLogin,
} from "./api.js";
await validateLogin();

const allDeposit = await getAllDeposit();
let esfang = document.querySelectorAll("#esfang-div");
let esfang_img = document.querySelectorAll("#esfang-img");

let filing = document.querySelectorAll("#filing-div");
let filing_img = document.querySelectorAll("#filing-img");

let cream = document.querySelectorAll(".cream-div");
let cream_img = document.querySelectorAll(".cream-img");

let tasteCake = "وانیل";
esfang.forEach((item, index) => {
  item.addEventListener("click", () => {
    esfang.forEach((item, index) => {
      item.classList.remove("active");
    });
    esfang_img.forEach((item) => {
      item.classList.remove("active");
    });
    esfang[index].classList.add("active");
    esfang_img[index].classList.add("active");
    tasteCake = item.getAttribute("data-image");
  });
});

let filingId = "آناناس و گردو";
filing.forEach((item, index) => {
  item.addEventListener("click", () => {
    filing.forEach((item) => {
      item.classList.remove("active");
    });
    filing_img.forEach((item) => {
      item.classList.remove("active");
    });
    filing[index].classList.add("active");
    filing_img[index].classList.add("active");
    filingId = item.getAttribute("data-image");
  });
});
let tasteCream = "وانیل";
cream.forEach((item, index) => {
  item.addEventListener("click", () => {
    cream.forEach((item) => {
      item.classList.remove("active");
    });
    cream_img.forEach((item) => {
      item.classList.remove("active");
    });
    cream[index].classList.add("active");
    cream_img[index].classList.add("active");
    tasteCream = item.getAttribute("data-image");
  });
});

const btnSend = document.querySelector("#new-birth-btn");

const imageCake = document.querySelector("#imgfile");
const type = document.querySelector("#type");
const weight = document.querySelector("#cake-weight");
const creamAmount = document.querySelector("#amount-cream");
const des = document.querySelector("#description");
const title = document.querySelector("#writing-cake");
const date = document.querySelector("#persianDatapicker");






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
const creamHandler = (cream) => {
  switch (cream) {
    case 0: {
      return "کم";
    }
    case 50: {
      return "متوسط";
    }
    case 100: {
      return "زیاد";
    }
  }
};

/*-------------------upload image--------------------*/
let imageUrl;
imageCake.addEventListener("change", async () => {
  const image = await uploadImage("imgfile");

  imageUrl = image;
});

/*-------------------upload image--------------------*/
const userID = await userId();

btnSend.addEventListener("click", async () => {
  /*-----------------add package-------------------*/
  const result = {
    user_id: userID,
    Deposit: 0,
    accept: "false",
    type: "cake",
  };
  const pakageId = await addPackage(result);
  /*----------------add package--------------------*/

  /****--------------add to products----------------****/
  const dataOne = {
    title: "کیک تولد",
    image: imageUrl,
    count: 1,
    price: allDeposit[0].cake,
    description: des.value,
    category_id: 0,
    discount: 0,
    wallet: 100,
    type: "bayane",
  };
  const rrr = await createProduct(dataOne);

  /*****--------------add to products----------------*****/

  /*------------------add to products---------------------*/
  const dateValue = JSON.parse(window.localStorage.getItem("date"));
  const date = moment
    .from(dateValue, "fa", "YYYY/MM/DD")
    .locale("en")
    .format("YYYY/MM/DD");
    console.log(date)
  const data = {
    pakage_id: pakageId,
    image: imageUrl,
    type: type.value,
    taste_cake: tasteCake,
    taste_cream: tasteCream,
    filling: filingId,
    Weight: +weightHandler(+weight.value),
    amount_of_cream: `${creamHandler(+creamAmount.value)}`,
    description: des.value,
    writing_cake: title.value,
    created: date,
  };

  const ttt = await addCake(data);
  console.log(ttt);
  successAlert("success", "درخواست شما باموفقیت ثبت شد");
  // setTimeout(() => {
  //     window.location.reload()
  // }, 3000);
  /*------------------add to products---------------------*/

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
      package_id : pakageId
    };
    await insertProductToOrder(product);
    successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = JSON.parse(window.localStorage.getItem("orderId"));
    const productList = await GetAllProductList(orderId);
    // const isProduct = productList.findIndex(
    //   (item) => item.product_id === `${pakageId}`
    // );

    const product = {
      order_id: orderId,
      discount: 0,
      product_id: rrr,
      count: 1,
      type: "true",
      package_id : pakageId
    };
    await insertProductToOrder(product);
    successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  }

  /*****--------------add to order----------------*****/
  window.location.reload()
});
