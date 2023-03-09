import { successAlert } from "./Services.js";
import {
  BASE_IAMGE,
  GetAllProduct,
  GetAllProductList,
  GetOrderWithUser,
  InsertOrder,
  getAllCategories,
  insertProductToOrder,
  updateCount,
  userId,
  validateLogin,
} from "./api.js";
await validateLogin();

/*-------------------------renderpage-----------------------------*/
const allProducts = await GetAllProduct();
const products = allProducts.filter(item => item.type === "sefareshi")
const renderPage = async () => {
  const container = document.querySelector("#container");
  const allCategory = await getAllCategories();

  products.forEach((item, index) => {
    const category = allCategory.filter(
      (elem) => `${elem.id}` === `${item.category_id}`
    );
    const note = `
        <div class="col-12 col-md-6 col-lg-4 p-2 pp">
        <div class="product-item">
          <div class="col-4 col-md-4 height">
            <div class="img-product"><img src="${BASE_IAMGE}${item.image}"
                alt=""></div>
          </div>
          <div>
          <a href="./Each-product-page.html?${item.id}" class="col-4 col-md-4 moshakhaseh">
            <div class="name-sweet">${item.title}</div>
            
          </a>
          ${item.type === "sefareshi" && `<a href="./Points-to-product.html?${item.id}" class="text-white" >comment</a>`}
          </div>
          <div class="col-2 price">
            ${item.price}<br />هزارتومان
          </div>
          <div class="col-1 bbb">
            <div class="cart " style="cursor : pointer" onclick="addToCart(${item.id},${item.discount})">
              <img src="./assets/images/icon/cart.png" alt="">
            </div>
          </div>

        </div>
      </div>`;

    container.innerHTML += note;
  });
};

await renderPage();

/*-------------------------renderpage-----------------------------*/

/*----------------------add to cart--------------------------*/

window.addToCart = async (id, discount) => {
  const userID = await userId();

  const isOrder = await GetOrderWithUser(userID);
  const findOrderFalse = isOrder.find((item) => item.user_accept === "false");
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
    
    if (isProduct !== -1 ) {
      const id = productList[isProduct].id;

      const data = {
        id
      }


      const rr = await updateCount(id , data)
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
};

/*----------------------add to cart--------------------------*/
