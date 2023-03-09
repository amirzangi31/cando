import { packageHandler } from "../Services.js";
import {
  BASE_IAMGE,
  GetOrderWithUser,
  InsertOrder,
  confirmPackage,
  createProduct,
  getAddressWithId,
  getAllDeposit,
  getAllPackage,
  getUserWithId,
  insertProductToOrder,
} from "../api.js";

/*--------------render page------------------*/
const getAllPackageo = await getAllPackage();
const allPackage = getAllPackageo.filter((item) => item.accept === "false");
const cakes = allPackage.filter((item) => item.type === "cake" && item.pay === "true");
const pakages = allPackage.filter((item) => item.type === "pakage" && item.pay === "true");

/**گرفتن تمام بیعانه ها */
const allDeposit = await getAllDeposit();
const { cake } = allDeposit[0];

const renderPage = async () => {
  const containerCake = document.querySelector("#container-cake");
  const containerPackage = document.querySelector("#container-package");

  cakes.forEach(async (item, index) => {
    const user = await getUserWithId(+item.user_id);
    const addressaa = await getAddressWithId(+item.user_id);
    const { address, postalcode, name, phone, id } = addressaa[0];
    const date = item.created.split(" ")[0];
    const resultDate = moment(date, "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    const type = "cake"
    const note = `
    <div class="content-modals modal-takhmin">
            <div class="inner-modals"  style="z-index : -1">

                 <div class="contents">
                 <div class="px-2">
                    <span class="text-white" style="font-size : 40px ; cursor : pointer" onclick="closeHandler(${index})">×</span>
                 </div>
                    <div class="col-12  py-1">
                <div class="price-item ">
                    <div class="p-3 col-12">
                    <div class="col-12 detail">
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">کد رهگیری:</label>
                        <input class="col-8" type="text" name="code" id="Tracking-Code" placeholder="${id}">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">تاریخ و زمان سفارش:</label>
                        <input class="col-8" type="text" name="ِDate" id="date-item" placeholder="${resultDate}">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                        <input class="col-8" type="text" name="Delivery" id="Delivery-information" placeholder="${name} ${phone}">
                    </div>
                    <div class="col-12 detail-item p-2">
                        <input class="col-12 address" type="text" name="value-address" id="address" placeholder="${address}">
                    </div>
              

          </div>
                  <div class="col-12">
                      <div class="moshakhasat py-1">
                              <div class="col-12 txt-main p-2">
                            <input type="number"  class="w-100 py-2 px-2 rounded-3 text-white" placeholder="تخمین قیمت" style="outline : 1px solid white   "  />
                              </div>
                              <div class="col-12 Total-price pt-1">
                                  <div class="col-12 item-list p-1 text-white">
                                      <span>بیعانه</span>
                                      <span>${cake}تومان</span>
                                  </div>
                              </div>
                              <div class="col-12">
                                <sapn class="btn text-white btn-sm w-100" style="background : #cd9b38" onclick="priceHandler(${
                                  item.id
                                } , ${user[0].id}  )">آماد سازی و ثبت قیمت</sapn>
                              </div>
                          </div>
                      </div>
  
                  </div>
              </div>
  
          </div>
        </div>
      <div class="birthday-package  mt-2">
        <p>تخمین قیمت</p>
      </div>
      </div>
    </div>
  
  </div>
    <div class="col-12 col-md-6 px-1 py-1">
    <div class="price-item ">
        <div class="p-3 col-12">
            <div class="col-12 detail">
                <div class="col-12 detail-item p-2">
                    <label class=" col-4">کد رهگیری:</label>
                    <input class="col-8" type="text" name="code" id="Tracking-Code" placeholder="${id}">
                </div>
                <div class="col-12 detail-item p-2">
                    <label class=" col-4">تاریخ و زمان سفارش:</label>
                    <input class="col-8" type="text" name="ِDate" id="date-item" placeholder="${resultDate}">
                </div>
                <div class="col-12 detail-item p-2">
                    <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                    <input class="col-8" type="text" name="Delivery" id="Delivery-information" placeholder="${name} ${phone}">
                </div>
                <div class="col-12 detail-item p-2">
                    <input class="col-12 address" type="text" name="value-address" id="address" placeholder="${address}">
                </div>
                

            </div>
            <div class="col-12">
                <div class="moshakhasat py-1">
                    <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>کیلو گرم</span>
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-weight" id="weight" placeholder="${PersianTools.numberToWords(
                                  +item.Weight
                                )}">

                            </div>
                           
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>اسفنج</span>
                                
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-sponge" id="sponge" placeholder="${
                                  item.taste_cake
                                }">
                            </div>
                           
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>فیلینگ</span>
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-Filling" id="Filling" placeholder="${
                                  item.filling
                                }">
                            </div>
                           
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>خامه</span>
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-chocolate" id="chocolate" placeholder="${
                                  item.taste_cream
                                }">
                            </div>
                           
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>خامه</span>
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-cream" id="cream" placeholder="${
                                  item.amount_of_cream
                                }">
                            </div>
                           
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="download ">
                            <div class="col-12  p-1">
                                <span class="pe-2">${
                                  item.typeCake
                                }-<a href="${BASE_IAMGE}${
      item.image
    }" download="true" target="_blank">دانلود</a></span>
                            </div>
                            
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="description">
                            <div class="col-12  p-1">
                                <span class="pe-2">${item.description}</span>
                            </div>
                           
                        </div>

                    </div>
                    <div class="col-6 py-1 px-1">
                        <div class="description">
                            <div class="col-12 p-1">
                                <span class="pe-2">${item.description}</span>
                            </div>
                            
                           
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <div class="col-12 btn-bottom p-2" onclick="modalHandler(${index})">
            <span>تخمین قیمت و آماده سازی</span>

        </div>
    </div>
  </div>`;

    containerCake.innerHTML += note;
  });

  pakages.forEach(async (item, index) => {
    const user = await getUserWithId(+item.user_id);
    const addressaa = await getAddressWithId(+item.user_id);
    const { address, postalcode, name, phone, id } =
      addressaa[addressaa.length - 1];
    const data = await packageHandler(item.product);

    const note = `
    <div class="content-modals modal-takhmins">
    <div class="inner-modals" onclick="closeHandler(${index})" style="z-index : -1">
         <div class="contents">
         <div class="px-2">
                    <span class="text-white" style="font-size : 40px ; cursor : pointer" onclick="closeHandlerOne(${index})">×</span>
                 </div>
            <div class="col-12  py-1">
        <div class="price-item ">
            <div class="p-3 col-12">
            <div class="col-12 detail">
            <div class="col-12 detail-item p-2">
                <label class=" col-4">کد رهگیری:</label>
                <input class="col-8" type="text" name="code" id="Tracking-Code" placeholder="${id}">
            </div>
            <div class="col-12 detail-item p-2">
                <label class=" col-4">تاریخ و زمان سفارش:</label>
                <input class="col-8" type="text" name="ِDate" id="date-item" placeholder="">
            </div>
            <div class="col-12 detail-item p-2">
                <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                <input class="col-8" type="text" name="Delivery" id="Delivery-information" placeholder="${name} ${phone}">
            </div>
            <div class="col-12 detail-item p-2">
                <input class="col-12 address" type="text" name="value-address" id="address" placeholder="${address}">
            </div>
      

  </div>
          <div class="col-12">
              <div class="moshakhasat py-1">
                      <div class="col-12 txt-main p-2">
                    <input type="number"  class="w-100 py-2 px-2 rounded-3 text-white" placeholder="تخمین قیمت" style="outline : 1px solid white   "  />
                      </div>
                      <div class="col-12 Total-price pt-1">
                          <div class="col-12 item-list p-1 text-white">
                              <span>بیعانه</span>
                              <span>${allDeposit[0].package}تومان</span>
                          </div>
                      </div>
                      <div class="col-12">
                        <sapn class="btn text-white btn-sm w-100" style="background : #cd9b38" onclick="priceHandlerOne(${
                          item.id
                        }, ${user[0].id} )">آماد سازی و ثبت قیمت</sapn>
                      </div>
                  </div>
              </div>

          </div>
      </div>

  </div>
</div>
<div class="birthday-package  mt-2">
<p>تخمین قیمت</p>
</div>
</div>
</div>

</div>
    <div class="col-12 col-md-6 px-1 py-1">
    <div class="price-item ">
        <div class="p-3 col-12">
            <div class="col-12 detail">
                <div class="col-12 detail-item p-2">
                    <label class=" col-4">کد رهگیری:</label>
                    <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="${id}">
                </div>
                <div class="col-12 detail-item p-2">
                    <label class=" col-4">تاریخ و زمان سفارش:</label>
                    <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="شنبه 23 آبان-9 تا 12 صبح">
                </div>
                <div class="col-12 detail-item p-2">
                    <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                    <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="${name} ${phone}">
                </div>
                <div class="col-12 detail-item p-2">
                    <input class="col-12 address" type="text" name="value-kharid" id="darsad-kharid" placeholder="${address}">
                </div>
                

            </div>
            <div class="col-12">
                <div class="moshakhasat py-1">
                    <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>کیلو گرم</span>
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-weight" id="weight" placeholder="${PersianTools.numberToWords(
                                  item.weight
                                )}">
                            </div>
                           
                        </div>

                    </div>
                    ${Object.keys(data)
                      .map((pro, indexO) => {
                        const { name } = data[pro];
                        const test = name.split("_");
                        const result = test.join(" ");
                        return `
                            <div class="col-6 py-1 px-1">
                        <div class="moshakhasat-item ">
                            <div class="col-6 right p-1">
                                <span>ردیف ${PersianTools.numberToWords(
                                  indexO + 1
                                )}</span>
                            </div>
                            <div class="col-6 left p-1">
                                <input type="text" name="value-weight" id="weight" placeholder="${result}">
                            </div>
                        </div>

                    </div>
                            `;
                      })
                      .join("")}
                    
                </div>

            </div>
        </div>
        <div class="col-12 btn-bottom p-2" onclick="modalHandlerOne(${index})">
            <span>تخمین قیمت و آماده سازی</span>

        </div>
    </div>
  </div>`;

    containerPackage.innerHTML += note;
  });
};

await renderPage();

/*--------------render page------------------*/

// change content pakage main favorite cake and sweet box

let btns = document.querySelectorAll(".btn-change");
let contents = document.querySelectorAll(".content-price");

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
// change content pakage main favorite cake and sweet box

/*-----------------modalHandler and closeHandler-------------------- */
window.modalHandler = (index) => {
  const modals = document.querySelectorAll(".modal-takhmin");
  modals[index].classList.add("active");
};
window.modalHandlerOne = (index) => {
  const modals = document.querySelectorAll(".modal-takhmins");
  modals[index].classList.add("active");
};

window.closeHandler = (index) => {
  const modal = document.querySelectorAll(".modal-takhmin");

  modal[index].classList.remove("active");
};
window.closeHandlerOne = (index) => {
  const modal = document.querySelectorAll(".modal-takhmins");

  modal[index].classList.remove("active");
};

/*-----------------modalHandler and closeHandler-------------------- */





/*-----------------priceHandler -------------------- */
window.priceHandler = async (id , user , type) => {
    
  await confirmPackage(id);

  const all = await getAllPackage() 
  const pa = all.filter(item => item.id == id)
  const {image , description, Deposit} = pa[0]


  /****--------------add to products----------------****/
  const dataOne = {
    title: "کیک تولد",
    image: image,
    count: 1,
    price: Deposit,
    description: description,
    category_id: 0,
    discount: 0,
    wallet: 100,
    type: "bayane",
  };
  
  const rrr = await createProduct(dataOne);
  /*****--------------add to products----------------*****/
  
  const isOrder = await GetOrderWithUser(user);
  const findOrderFalse = isOrder.find((item) => item.user_accept === "false" && item.isDelete === "false");


  let orderId = null;
  if (!findOrderFalse) {
    const data = {
      user_id: user,
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
    // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  } else {
    const orderId = findOrderFalse.id;
    
    const product = {
      order_id: orderId,
      discount: 0,
      product_id: rrr,
      count: 1,
      type: "true",
    };
    await insertProductToOrder(product);
    // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
  }

//   window.location.reload();
};
/*-----------------priceHandler -------------------- */

/*-----------------priceHandlerOne -------------------- */
window.priceHandlerOne = async (id , user , type) => {
    
    await confirmPackage(id);
  
    const all = await getAllPackage() 
    const pa = all.filter(item => item.id == id)
    const { Deposit} = pa[0]
  
  
    /****--------------add to products----------------****/
    const dataOne = {
        title: "جعبه دلخواه",
        image: "",
        count: 1,
        price: Deposit,
        description: "",
        category_id: 0,
        discount: 0,
        wallet: 100,
        type: "bayane",
    };
    
    const rrr = await createProduct(dataOne);
    /*****--------------add to products----------------*****/
    
    const isOrder = await GetOrderWithUser(user);
    const findOrderFalse = isOrder.find((item) => item.user_accept === "false" && item.isDelete === "false");
  
  
    let orderId = null;
    if (!findOrderFalse) {
      const data = {
        user_id: user,
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
      // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    } else {
      const orderId = findOrderFalse.id;
      
      const product = {
        order_id: orderId,
        discount: 0,
        product_id: rrr,
        count: 1,
        type: "true",
      };
      await insertProductToOrder(product);
      // successAlert("success", "محصول با موفقیت به سبد خرید اضافه شد");
    }
  
  //   window.location.reload();
  };
/*-----------------priceHandlerOne -------------------- */
