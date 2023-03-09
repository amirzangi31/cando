import { GetAllProductList, GetOrderWithUser, getAddressWithId, getAllDeposit, getPath, totalPriceOrder, userId, validateLogin } from "./api.js";
await validateLogin();
const userID = await userId()
const path = await getPath()
const allDeposit = await getAllDeposit()
const {send_free} = allDeposit[0]
const addressaa= await getAddressWithId(userID)
const {address , name  , phone} = addressaa[addressaa.length - 1]





const renderPage = async () => {
  // const allProducts = await GetAllProductList()

  const allOrder = await GetOrderWithUser(+userID);
  const order = allOrder.filter((item) => item.id === path);
  const container = document.querySelector("#container");
  const headerContainer = document.querySelector("#header-container")
  const {id , created} = order[0]
  const date = created.split(" ")[0]
  const resultDate = moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  const noteOne = `
  <div class="col-12 detail-item p-2">
                              <label class=" col-4">کد رهگیری:</label>
                              <input class="col-8" type="text" name="code" id="code-rahgiri" placeholder="${id}">
                          </div>
                          <div class="col-12 detail-item p-2">
                              <label class=" col-4">تاریخ و زمان سفارش:</label>
                              <input class="col-8" type="text" name="value-date" id="date-kharid" placeholder="${resultDate}">
                          </div>
                          <div class="col-12 detail-item p-2">
                              <label class=" col-4">اطلاعات تحویل گیرنده:</label>
                              <input class="col-8" type="text" name="value-kharid" id="darsad-kharid" placeholder="${name}   ${phone}">
                          </div>
                          <div class="col-12 detail-item p-2">
                              <input class="col-12 adres" type="text" name="value-address" id="address" placeholder="${address}">
                          </div>`
  headerContainer.innerHTML = noteOne
  order.forEach(async(item, index) => {


    const products = await GetAllProductList(+item.id)
    const total = totalPriceOrder(products).total + Number(send_free)
    const note = `
        <section class="category-product p-2 w-100">
            
            ${Object.keys(products).map((item) => {
                const{name,count,price} = products[item]
                return `
                <div class="col-12 col-md-6 p-2 ">
                <div class="product-item">
                  <div class="col-4 col-md-4 height">
                    <div class="img-product">
                      <img src=http://localhost/cando/cando/file${products[item].image}
                        alt="">
                      </div>
                  </div>
                  <div class="col-5 col-md-4 moshakhaseh">
                    <div class="name-sweet"><h4>${name}</h4></div>
                      <div class="the-details">
                        <p>تعداد : ${count}</p>
                      </div>
                  </div>
                  <div class="col-3 p-2 price">
                      <div class="price-value" >
                              <h4 class="mb-0" >${price}</h4>
                              <p class="text">هزارتومان</p>
                      </div>  
                  </div>
  
                </div>
              </div>`


            }).join("")
        }
            
              
          </section>
          <div class="col-12 p-2">
            <div class="line"></div>
             <!--start content list wallet  -->
            <section class="list">
                <div class="col-12 ">
                    <div class="content-list p-2">
                        <div class="col-12 p-2">
                            <div class="list-item">
                                <span>قیمت کالا ها</span>
                                <span>${totalPriceOrder(products).totalS}تومان</span>
    
                            </div>
    
                        </div>
                        <div class="col-12 p-2">
                            <div class="list-item">
                                <span>تخفیف کالا ها</span>
                                <span>0</span>
    
                            </div>
    
                        </div>
                        <div class="col-12 border-b p-2">
                            <div class="list-item credit" id="texts-etebar">
                                <span >هزینه ارسال</span>
                                <span >${send_free}تومان</span>
    
                            </div>
    
                        </div>
                        <div class="col-12  p-2">
                            <div class="list-item">
                                <span>جمع سبد خرید</span>
                                <span>${total.toLocaleString()}تومان</span>
    
                            </div>
                        </div>
    
                    </div>
    
                </div>
            </section>
            <!--end content list wallet  -->
          </div>`;

    container.innerHTML += note;
  });
};

await renderPage();
