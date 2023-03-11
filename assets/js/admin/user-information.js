import { convertDate } from "../Services.js";
import {
  BASE_IAMGE,
  GetAllProductList,
  GetOrderWithUser,
  getAddressWithId,
  getPath,
  getUserWithId,
  totalPriceOrder,
  validateLoginAdmin,
} from "../api.js";
await validateLoginAdmin()

/*------------------render Page--------------------*/
const path = await getPath();
const user = await getUserWithId(path);
const addressa = await getAddressWithId(path);
const { name, phone, password } = user[0];
const orders = await GetOrderWithUser(path);
const filterOrders = orders.filter(
  (item) => item.user_accept === "true" && item.admin_accept === "true"
);

const renderPage = async () => {
  const headerContainer = document.querySelector("#header-container");
  const header = `
<div class="col-12 col-md-4 p-2 ">
                    <div class="information-item p-1">
                          <div class="col-5  p-1 value">
                              <span>نام و نام خانوادگی</span>
                          </div>
                        <div class="col-7 p-1 value-item">
                          <input type="text" placeholder="${name}">
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 p-2 ">
                      <div class="information-item p-1">
                            <div class="col-5  p-1 value">
                                <span>شهر</span>
                            </div>
                          <div class="col-7 p-1 value-item">
                            <input type="text" placeholder="${
                              addressa[addressa.length - 1] && addressa[addressa.length - 1].address
                            }">
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 p-2 ">
                      <div class="information-item p-1">
                            <div class="col-5  p-1 value">
                                <span>شماره تلفن</span>
                            </div>
                          <div class="col-7 p-1 value-item">
                            <input type="text" placeholder="${phone}">
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 p-2 ">
                      <div class="information-item p-1">
                            <div class="col-5  p-1 value">
                                <span>رمز عبور</span>
                            </div>
                          <div class="col-7 p-1 value-item">
                            <input type="text" placeholder="${password}">
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 p-2 ">
                      
                      <div class="information-item p-1">
                          <div class="col-6 col-md-8  p-1 value">
                              <span>شماره کارت جهت بازگرداندن وجه</span>
                          </div>
                        <div class="col-6 col-md-4 p-1 value-item">
                          <input type="text" placeholder="60375585854545">
                      </div>
                    </div>
                    </div>`;
  headerContainer.innerHTML = header;

  const orderContainer = document.querySelector("#order-container");
  filterOrders.forEach(async(item, index) => {
    const products = await GetAllProductList(item.id)
    const date = item.created
    const one = date.split(" ")
    const result = one[0]
    const totalPrice = await totalPriceOrder(products).totalS
    const order = `
    <div class="col-12 col-md-6 p-2">
    <div class="content-orders bottomborder">
        <div class="col-12 Tracking-Code p-2">
            <div class="col-7 tracking">
                <label class="col-5">کد رهگیری</label>
                <input class="col-7" name="code-rahgiri" id="Track-code" type="text" placeholder="${item.id}">
            </div>
            <div class="col-5 date">
                <span>${await convertDate(result)}</span>
            </div>
  
        </div>
        <div class="col-12 images p-2">
            <div class="col-9 image-item p-2">
            ${
                Object.keys(products).map((pro) =>{
                    return`
                    <div class="col-3 p-2">
                    <img src="${BASE_IAMGE}${products[pro].image}">
                </div>
                    
                    `
                }).join("")
            }
               
               
            </div>
            <div class="col-3 left-item p-2">
                <div class="price-value">
                    <h4 class="mb-0">${totalPrice}</h4>
                    <p class="text">هزارتومان</p>
            </div>
  
            </div>
        </div>
       
  
    </div>
  
  </div>
  `;

    orderContainer.innerHTML += order;
  });
};

await renderPage();

/*------------------render Page--------------------*/
