import { GetProductWithId, addCommnet, getPath, userId, validateLogin } from "./api.js";
await validateLogin();

/*-----------------add commet--------------------*/
const path = await getPath()
const product = await GetProductWithId(+path)
const btn_add_comment = document.querySelector("#add-comment")

const userID = await userId()

btn_add_comment.addEventListener("click" , async() =>{
    const title = document.querySelector("#title")
const description = document.querySelector("#description")
    const data = {
        title : title.value,
        description : description.value,
        user_id : +userID,
        accepted : 0,
        product_id : product[0].id
    }


    const tt = await addCommnet(data)


    window.location.reload()
})



/*-----------------add commet--------------------*/