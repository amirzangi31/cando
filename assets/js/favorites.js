import { successAlert } from "./Services.js";
import {
  BASE_URL,
  GetAllProductList,
  GetOrderWithUser,
  GetProductWithId,
  InsertOrder,
  deleteFavorite,
  getAllProductsFavoriteWithId,
  insertProductToOrder,
  updateCount,
  userId,
} from "./api.js";

/*-------------------render Page------------------*/

const renderPage = async () => {
  const userID = await userId();
  const favorite = await getAllProductsFavoriteWithId(userID);

  const container = document.querySelector("#container");

  container.innerHTML = "";

  favorite.forEach(async (item, index) => {
    const product = await GetProductWithId(+item.product);

    const { title, price, image, id } = product[0];
    const note = `
        <div class="col-12 col-md-6 col-lg-4 p-2 pp">
              <div class="product-item">
                  <div class="col-1 close-btn" onclick="deleteHandler(${item.id})">
                      <img src="./assets/images/icon/close.png" alt="">
                  </div>
                <div class="col-4 col-md-4 height">
                  <div class="img-product"><img src="${BASE_URL}file${image}"
                      alt=""></div>
                </div>
                <div class="col-4 col-md-4 moshakhaseh">
                  <div class="name-sweet">${title}</div>
                  <a href="#">
                    <div class="the-details">جزئیات شیرینی</div>
                  </a>
                </div>
                <div class="col-2 price">
                ${price}<br />هزارتومان
                </div>
                <div class="col-1 bbb">
                  <div class="cart" onclick="addToOrder(${id})">
                    <img src="./assets/images/icon/cart.png" alt="">
                  </div>
                </div>

              </div>
            </div>`;
    container.innerHTML += note;
  });
};

await renderPage();

/*-------------------render Page------------------*/
/*---------------------add to order---------------------*/
const userID = await userId()
window.addToOrder = async (id) => {
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
      package_id : null
      
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
      package_id : null

      };
      await insertProductToOrder(product);
      successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    }
  }
};

/*---------------------add to order---------------------*/

/*---------------------delete to favorite---------------------*/

window.deleteHandler = async (id) => {
  await deleteFavorite(id);
  await renderPage();
};

/*---------------------delete to favorite---------------------*/
