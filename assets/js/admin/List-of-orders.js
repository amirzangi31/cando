import { GetAllProductList, acceptAdminOrder, getAddressWithId, getAllOrders, validateLoginAdmin } from "../api.js";
await validateLoginAdmin()

/*-------------------------render page------------------------*/
const allOrders = await getAllOrders();
const orders = allOrders.filter(
  (item) =>
    item.user_accept === "true" &&
    item.admin_accept === "false" &&
    item.isDelete === "false"
);

const renderPage = async () => {
  const container = document.querySelector("#container");
  const containerModal = document.querySelector("#container-modal");

  orders.forEach(async (item, index) => {
    const date = item.created.split(" ")[0];
    const resultDate = moment(date, "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    const addressa = await getAddressWithId(item.user_id);
    const { address, id, name, phone } = addressa[0];
    const products = await GetAllProductList(item.id);
    const modal = `
    <div class="content-modals modal-req">
    <div class="inner-modals" style="z-index: -1">
      <div class="contents">
        <div class="px-2">
          <span
            class="text-white"
            style="font-size: 40px; cursor: pointer"
            onclick="closeModalReq(${index})"
            >×</span
          >
        </div>
        <div class="col-12 py-1">
          <div class="price-item">
            <div class="p-3 col-12">
              <div class="col-12 detail">
                <div class="col-12 detail-item p-2">
                  <label class="col-4">کد رهگیری:</label>
                  <input
                    class="col-8"
                    type="text"
                    name="code"
                    id="Tracking-Code"
                    placeholder="${item.id}"
                  />
                </div>
                <div class="col-12 detail-item p-2">
                  <label class="col-4">تاریخ و زمان سفارش:</label>
                  <input
                    class="col-8"
                    type="text"
                    name="ِDate"
                    id="date-item"
                    placeholder=" "
                  />
                </div>
                <div class="col-12 detail-item p-2">
                  <label class="col-4">اطلاعات تحویل گیرنده:</label>
                  <input
                    class="col-8"
                    type="text"
                    name="Delivery"
                    id="Delivery-information"
                    placeholder="${name} ${phone}"
                  />
                </div>
                <div class="col-12 detail-item p-2">
                  <input
                    class="col-12 address"
                    type="text"
                    name="value-address"
                    id="address"
                    placeholder="${address}"
                  />
                </div>
              </div>
              <div class="col-12 my-2">
                <div class="col-12">
                  <sapn
                    class="btn text-white btn-sm w-100"
                    style="background: #cd9b38"
                    onclick="confirmRequest(${item.id})"
                    >ثبت سفارش</sapn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    const note = `
    
    



  <div class="col-12 col-md-6 px-1 py-1">
              <div class="price-item">
                <div class="p-3 col-12">
                  <div class="col-12 detail">
                    <div class="col-12 detail-item p-2">
                      <label class="col-4">کد رهگیری:</label>
                      <input
                        class="col-8"
                        type="text"
                        name="value-kharid"
                        id="darsad-kharid"
                        placeholder="${item.id}"
                      />
                    </div>
                    <div class="col-12 detail-item p-2">
                      <label class="col-4">تاریخ و زمان سفارش:</label>
                      <input
                        class="col-8"
                        type="text"
                        name="value-kharid"
                        id="darsad-kharid"
                        placeholder="${resultDate}"
                      />
                    </div>
                    <div class="col-12 detail-item p-2">
                      <label class="col-4">اطلاعات تحویل گیرنده:</label>
                      <input
                        class="col-8"
                        type="text"
                        name="value-kharid"
                        id="darsad-kharid"
                        placeholder="${item.name}   ${item.phone}"
                      />
                    </div>
                    <div class="col-12 detail-item p-2">
                      <input
                        class="col-12 address"
                        type="text"
                        name="value-kharid"
                        id="darsad-kharid"
                        placeholder="${address}"
                      />
                    </div>
                  </div>
                  <div></div>
                  <div class="col-12">
                    <div class="moshakhasat py-1">
                      <div class="col-12 txt-main p-2">
                        <div class="main-content">
                          ${Object.keys(products)
                            .map((pro) => {
                              const { name, price } = products[pro];
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
                  <div
                    class="col-12 btn-bottom p-2 takhmin-price"
                    id="takhmin-price"
                    onclick="showModal(${index})"
                  >
                    <span>تخمین قیمت و آماده سازی</span>
                  </div>
                </div>
              </div>
            </div>
              `;

    container.innerHTML += note;
    containerModal.innerHTML += modal;
  });
};
await renderPage();

/*-----------------------show and close modal--------------------------*/

window.showModal = (index) => {
  const modals = document.querySelectorAll(".modal-req");
  modals[index].classList.add("active");
};
window.closeModalReq = (index) => {
  const modals = document.querySelectorAll(".modal-req");

  modals[index].classList.remove("active");
};

/*-----------------------show and close modal--------------------------*/

/*-----------------confirmReq handler--------------------*/

window.confirmRequest = async(id ) =>{
  await acceptAdminOrder(id)
  window.location.reload()
}

/*-----------------confirmReq handler--------------------*/
