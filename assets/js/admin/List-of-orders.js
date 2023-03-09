import { GetAllProductList, getAddressWithId, getAllOrders } from "../api.js";

/*-------------------------render page------------------------*/
const allOrders = await getAllOrders();
const orders = allOrders.filter(
  (item) => item.user_accept === "true" && item.admin_accept === "false"
);
console.log(orders);
const renderPage = async () => {
  const container = document.querySelector("#container");

  orders.forEach(async (item, index) => {
    const date = item.created.split(" ")[0];
    const resultDate = moment(date, "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    const addressa = await getAddressWithId(item.user_id);
    const { address } = addressa[0];
    const products = await GetAllProductList(item.id);
    console.log(products);
    const note = `
    <div class="col-12 col-md-6 px-1 py-1">
                <div class="price-item ">
                    <div class="p-3 col-12">
                        <div class="col-12 detail">
                            <div class="col-12 detail-item p-2">
                                <label class=" col-4">کد رهگیری:</label>
                                <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="${
                                  item.id
                                }">
                            </div>
                            <div class="col-12 detail-item p-2">
                                <label class=" col-4">تاریخ و زمان سفارش:</label>
                                <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="${resultDate}">
                            </div>
                            <div class="col-12 detail-item p-2">
                                <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                                <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="${
                                  item.name
                                }   ${item.phone}">
                            </div>
                            <div class="col-12 detail-item p-2">
                                <input class="col-12 address" type="text" name="value-kharid" id="darsad-kharid" placeholder="${address}">
                            </div>
                            
    
                        </div>
                        <div>
                          
                        </div>
                        <div class="col-12">
                            <div class="moshakhasat py-1">
                                <div class="col-12 txt-main p-2">
                                    <div class="main-content">
                                    ${Object.keys(products)
                                      .map((pro) => {
                                        const {name , price} = products[pro]
                                        return `
                                      <div class="col-12 col-md-6 item-list p-1">
                                          <span>${name}</span>
                                          <span>${price}تومان</span>
                                      </div>
                                      
                                      `;
                                      })
                                      .join("")}
                                        
                                </div>
                            </div>
    
                        </div>
                    </div>
                    <div class="col-12 btn-bottom p-2 takhmin-price" id="takhmin-price">
                        <span>تخمین قیمت و آماده سازی</span>

                    </div>
                </div>
              </div>
              `;

    container.innerHTML += note;
  });
};
await renderPage();
window.onload = () =>{

  let btnsShowModal = document.querySelectorAll(".takhmin-price");
  let modals = document.querySelector("#modal-takhmin-gheymat");
  let overalyModals = document.querySelector(
    "#modal-takhmin-gheymat .inner-modals"
  );
  
  btnsShowModal.forEach((item, index) => {
    item.addEventListener("click", () => {
      modals.classList.add("active");
    });
  });
  overalyModals.addEventListener("click", (e) => {
    if (e.target.className === "inner-modals") {
      modals.classList.remove("active");
    }
  });
}
/*-------------------------render page------------------------*/

