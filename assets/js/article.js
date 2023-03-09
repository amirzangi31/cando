import { getArticleWithId, getPath, validateLogin } from "./api.js"
await validateLogin();

/*-------------------render page----------------------*/


const renderPage = async() =>{
    const path = await getPath()
    const article = await getArticleWithId(+path)
    const container = document.querySelector("#container")

    const {title , description} = article[0]


    const note = `
    
    <div class="subject p-2 col-12">
                    <h2>${title}</h2>
                </div>
                <div class="description p-2 col-12">
                   <span>${description}</span>
                </span>
                </div>

    `

    container.innerHTML = note;

}


await renderPage()

/*-------------------render page----------------------*/