import { GetAllProductList, getAllOrders, getUserWithId, totalPriceOrder, validateLoginAdmin } from "../api.js";
await validateLoginAdmin()

/*---------------render page------------------*/
const allOrders = await getAllOrders();
const filterOrder = allOrders.filter(item => item.user_accept === "true" && item.isDelete === "false")


const renderPage = async () => {
  const container = document.querySelector("#container");

  filterOrder.forEach(async (item , index) => {

    const products = await GetAllProductList(item.id)
    const user = await getUserWithId(item.user_id)
    const date = item.created.split(" ")[0];
    const resultDate = moment(date, "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    const {name , phone} = user[0]

        const note = `<div class="col-12 col-md-6 p-2">
        <div class="monitoring-content">
            <div class="col-1 image ">
                <img src="../assets/images/icon/icon-m.png">
            </div>
            <div class="col-8 txt-content p-1">
                <span>${name}</span>
                <span>${phone}</span>
                <div class="date col-12">
                    <span class="px-1">تاریخ و ساعت:15:50:40</span>
                    
                    <span>${resultDate}</span>
                </div>
                

            </div>
            <div class="col-3 prices p-1">
                <h6>${totalPriceOrder(products).totalS}</h6>
                <span>هزارتومان</span>
                

            </div>

        </div>

    </div>`
    container.innerHTML += note;
    })



};

await renderPage();

/*---------------render page------------------*/
