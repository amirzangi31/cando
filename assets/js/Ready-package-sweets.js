
import { convertHardship } from "./Services.js"
import { getArticleWithId, getPath, validateLogin } from "./api.js"

await validateLogin();

/*-------------------render Page-----------------------*/




const renderPage = async() =>{
    const path = await getPath()
    const article = await getArticleWithId(+path)
    const {title , description , hardship} = article[0]
    const container = document.querySelector("#container")

    const note = `
    <div class="col-12 package-sweet">
                        <div class="col-6 clock">
                            <img class="p-1" src="./assets/images/icon/CLOCK.png">
                            <span>30دقیقه</span>
                        </div>
                        <div class="col-6 clock">
                            <img class="p-1" src="./assets/images/icon/chef.png">
                            <span>${await convertHardship(hardship)}</span>
                        </div>
        
                       </div>
                       <div class="col-12 equipment p-2">
                        <div class="equipment-item p-2">
                            <div class="col-12">
                                <span>وسایل مورد نیاز</span>
                            </div>
                            <div class="col-12">
                                <span>${title}</span>
                            </div>
            
                        </div>
                        
                       </div>
                       <div class="col-12 equipment p-2">
                        <div class="equipment-item p-2">
                            <div class="col-12">
                                <span>دستور پخت</span>
                            </div>
                            <div class="col-12">
                               <span>${description}</span>
                            </div>
            
                        </div>
                        
                       </div>`



    container.innerHTML = note;
}


await renderPage()
/*-------------------render Page-----------------------*/