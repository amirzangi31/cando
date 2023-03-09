import { getUserWithToken, updateUser, validateLogin } from "./api.js";
await validateLogin();

/*-----------------------renderPage-------------------------*/

const renderPage = async () => {
  const user = await getUserWithToken();
  const contaienr = document.querySelector("#container");

  const { name, phone, id, password } = user[0];

  const note = `
    <div class="information-account-content">
                <div class="col-3 image ">
                  <img src="./assets/images/icon/admin.png">
                </div>
              <!-- start -->
              <div class="col-12 col-md-4 p-2 ">
                <div class="information-item p-1">
                      <div class="col-6  p-1 value">
                          <span>نام  نام خانوادگی</span>
                      </div>
                    <div class="col-6 p-1 value-item">
                      <input type="text" name="name" id="Fname" value="${name}">
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 p-2 ">
                  <div class="information-item p-1">
                        <div class="col-5  p-1 value">
                            <span>شهر کرمان</span>
                        </div>
                      <div class="col-7 p-1 value-item">
                        <input type="text" name="ncity" id="city" placeholder="ویرایش">
                    </div>
                  </div>
              </div>
              <div class="col-12 col-md-4 p-2 ">
                  <div class="information-item p-1">
                        <div class="col-5  p-1 value">
                            <span>شماره تماس</span>
                        </div>
                      <div class="col-7 p-1 value-item">
                        <input type="text" name="phone" id="phoneN" value="${phone}">
                    </div>
                  </div>
              </div>
              <div class="col-12 col-md-4 p-2 ">
                  <div class="information-item p-1">
                        <div class="col-5  p-1 value">
                            <span>رمز عبور</span>
                        </div>
                      <div class="col-7 p-1 value-item">
                        <input type="password" name="pass" id="password" value="${password}">
                    </div>
                  </div>
              </div>
              <div class="col-12 col-md-4 p-2 ">
                  <div class="information-item p-1">
                        <div class="col-11  p-1 value">
                            <span>شماره کارت جهت بازگرداندن وجه</span>
                        </div>
                      <div class="col-1 p-1 value-item">
                          <img class="p-1" src="./assets/images/icon/Group 1900.png" alt="">
                    </div>
                  </div>
              </div>
              <div class="btn btn-primary btn-sm col-12 col-md-4 d-flex justify-content-center align-items-center" onclick="update(${id})">ثبت</div>
            </div>
    
    `;

  contaienr.innerHTML += note;
};

await renderPage();

/*-----------------------renderPage-------------------------*/

/*-------------------update user---------------------*/

window.update = async (id) => {
  const name = document.querySelector("#Fname");
  const phone = document.querySelector("#phoneN");
  const password = document.querySelector("#password");

  const data = {
    id: id,
    name: name.value,
    phonenumber: phone.value,
    password: password.value,
    nationalcode: "2981304021",
    signature: "test.jpg",
    credit_reserve: "0",
    credit_shopping: "120000",
    isActive: "false",
    business_license: "test.jpg",
  };

  await updateUser(id, data);
};

/*-------------------update user---------------------*/
