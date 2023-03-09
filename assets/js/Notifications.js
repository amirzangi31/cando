import { GetAllProductList, GetProductWithId, getPath, validateLogin } from "./api.js";
await validateLogin();

/*---------------------render page----------------------*/
const path = await getPath()
const products = await GetAllProductList(path)


const renderPage = async () => {

    const container = document.querySelector("#container")
    products.forEach(async(item , index) => {
        const product = await GetProductWithId(item.product_id)
        const {title,description } = product[0]

        const note = `  <div class="col-12 col-md-6 p-2 ">
        <div class="product-item">
          <div class="col-4 col-md-4 height">
            <div class="img-product">
              <img src="./assets/images/6.jpeg"
                alt="">
              </div>
          </div>
          <div class="col-5 col-md-5 moshakhaseh">
              <div class="the-details">
                  <h5 class="text">${title}</h5>
                  <p>${description}</p>
              </div>
          </div>
          <a href="Points-to-product.html?${item.product_id}">
            <div class="col-12 p-2 price">
              <div class="col-11 p-1" style="text-align: end;"><span>نظر به این محصول</span></div>
              <img src="./assets/images/icon/Group 1900.png">  
            </div>
          </a>
          

        </div>
      </div>`
      container.innerHTML += note
    });



};

await renderPage();

/*---------------------render page----------------------*/
