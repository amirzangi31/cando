import {
  BASE_IAMGE,
  GetProductWithId,
  deleteComment,
  getAllComment,
  getUserWithId,
  updateComment,
  validateLoginAdmin,
} from "../api.js";
await validateLoginAdmin()

/*--------------------render page---------------------*/

const allComments = await getAllComment();

const renderPage = async () => {
  const container = document.querySelector("#container");

  allComments.forEach(async (item, index) => {
    const product = await GetProductWithId(item.product_id);
    const { title, image } = product[0];
    const user = await getUserWithId(item.user_id);
    const { name } = user[0];
    const note = `<div class="col-12 col-md-6 p-2">
        <div class="product-item p-2">
            <div class="col-4">
                <div class="image">
                    <img src="${BASE_IAMGE}${image}">
                </div>
                <div class="text-image">
                    <span >${title}</span>
                </div>
                
            </div>
            <div class="col-8 p-1">
              <div class="col-12 user-name">
                <span>${name}</span>
              </div>
              <div class="detail ">
                <span class="des-comment">${item.description}</span>
              </div>
              <div class="col-12 check">
                <div class="p-2 " >
                  <img class="right p-1" src="../assets/images/check.png" onclick="confirmHanlder(${item.id}, ${item.product_id} , ${item.user_id}  , ${index} )">
                </div>
                <div class="p-2 ">
                  <img class="left p-1" src="../assets/images/zarb.png" onclick="deleteHanlder(${item.id}, ${item.product_id} , ${item.user_id}  , ${index})">
                </div>

              </div>

            </div>

        </div>

    </div>`;

    container.innerHTML += note;
  });
};

await renderPage();

/*--------------------render page---------------------*/

/*----------------confirm handler--------------------*/
window.confirmHanlder = async (id, product_id , userid  , index ) => {

  const des = document.querySelectorAll(".des-comment")[index]
  
  const data ={
    id ,
    product_id,
    user_id : userid,
    accepted : 1,
    description : des.innerHTML
  }


  await updateComment(id , data)
  window.location.reload()
};

/*----------------confirm handler--------------------*/

/*----------------delete handler--------------------*/
window.deleteHanlder = async (id, product_id , userid  , index) => {
  const des = document.querySelectorAll(".des-comment")[index]
  
  const data ={
    id ,
    product_id,
    user_id : userid,
    accepted : 1,
    description : des.innerHTML
  }


  await updateComment(id , data)
  window.location.reload()
};

/*----------------delete handler--------------------*/
