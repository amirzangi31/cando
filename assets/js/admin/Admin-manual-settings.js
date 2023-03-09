import { getAllDispoit, getWallet, updateDeposit, updateWallet } from "../api.js";

/*---------------------render page -----------------------*/
const allDispoit = await getAllDispoit();
const wallet = await getWallet();

const renderPage = async () => {
    const { cake, normal, send_free } = allDispoit[0];
    const { percentage } = wallet[0];
    const containerOne = document.querySelector("#container-one");
 
  const note = `
<div class="col-9 p-1 me-3">
                    <span>میزان بیعانه</span>
                </div>
                <!--start deposit amount-->
                <div class="deposit-amount bottomborder p-2" >
                    <!-- start -->
                    <div class="col-12 col-md-6 p-2">

                        <div class="deposit-item p-2">
                            <div class="col-12 p-1">
                                <span>میزان بیعانه سفارشات عادی</span>
                            </div>
                            <div class="col-12 detail-item p-1">
                                <input class="col-8" type="text"  value="${normal}" name="value-kharid" id="normal">
                            <label class=" col-4">درصد از خرید کل</label>

                            </div>
                        </div>

                    </div>
                    <div class="col-12 col-md-6 p-2">
                        <div class="deposit-item p-2">
                            <div class="col-12 p-1">
                                <span>میزان بیعانه کیک دلخواه</span>
                            </div>
                            <div class="col-12 detail-item p-1">
                                <input class="col-8" type="text" value="${cake}" name="value-kharid-cake" id="cake" >
                            <label class=" col-4">درصد از خرید کل</label>

                            </div>
                        </div>

                    </div>
                    <div class="col-12 col-md-6 p-2">
                        <div class="deposit-item p-2">
                            <div class="col-12 p-1">
                                <span>میزان بیعانه جعبه شیرینی میکس</span>
                            </div>
                            <div class="col-12 detail-item p-1">
                                <input class="col-8" type="text" value="${allDispoit[0].package}" name="value-kharid-boxsweet" id="packeage">
                            <label class=" col-4">درصد از خرید کل</label>

                            </div>
                        </div>

                    </div>
                    <div>
                    <span class="btn btn-primary btn-sm" onclick="depositHandler()">ثبت</span>
                    </div>
                </div>
                 <!--end deposit amount-->
                <!--start free delivery-->
                <div class="col-9 p-1 me-3">
                    <span>ارسال رایگان</span>
                </div>
                <div class="deposit-amount bottomborder p-2">
                    <!-- start -->
                    <div class="col-12 col-md-6 p-2">
                        <div class="deposit-item p-2">
                            <div class="col-12 p-1">
                                <span>خرید های بالای</span>
                            </div>
                            <div class="col-12 detail-item p-1">
                                <input class="col-8" value="${send_free}" type="text" name="value-kharid-free" id="send_free">
                            <label class=" col-4">تومان</label>

                            </div>
                        </div>
                        
                        </div>
                        <div>
                            <span class="btn btn-primary btn-sm" onclick="sendHandler()">ثبت</span>
                        </div>  

                    <!--free delivery-->
                </div>
                <!--end free delivery-->
                <!--start Recharge wallet-->
                <div class="col-9 p-1 me-3">
                    <span>شارژ کیف پول</span>
                </div>
                <div class="deposit-amount bottomborder p-2">
                    <!-- start -->
                    <div class="col-12 col-md-6 p-2">

                        <div class="deposit-item p-2">

                            <div class="col-12 detail-item p-1">
                                <input class="col-8" type="text" value="${percentage}"  name="value-kharid-wallet" id="wallet-value">
                                <label class=" col-4">درصد از خرید کل</label>

                            </div>
                        </div>

                    </div>
                    <div class="">
                        <span class="btn btn-primary btn-sm" onclick="walletHandler()">ثبت</span>
                    </div>

                </div>
                <!--end Recharge wallet-->

                <!-- start Unbookable dates -->
                <div class="col-9 p-1 me-3">
                    <span>تاریخ های غیر قابل رزرو</span>
                </div>
                <div class="deposit-amount  p-2">
                    <!-- start -->
                    <div class="col-12 col-md-6 p-2">
                        <div class="deposit-item p-2">

                            <div class="col-12  p-1">
                                <select name="date" id="Reservation-date">
                                    <option value="date">شنبه 23 آبان</option>
                                </select>
                            </div>
                        </div>

                    </div>


                </div>
                <!-- end Unbookable dates -->
`;

  containerOne.innerHTML = note;
};

await renderPage();

/*---------------------render page -----------------------*/


const cake = document.querySelector("#cake")
const packeage = document.querySelector("#packeage")
const send_free = document.querySelector("#send_free")
const normal = document.querySelector("#normal")
const wallet_value = document.querySelector("#wallet-value")




/*---------------------- deposit handler -----------------------*/
window.depositHandler = async() => {
    const data = {
        id:1,
        cake : cake.value,
        package : packeage.value,
        send_free : send_free.value,
        normal: normal.value
    }

     const rrr = await updateDeposit(data)
     console.log(rrr)
}
/*---------------------- deposit handler -----------------------*/


/*---------------------- send handler -----------------------*/
window.sendHandler = async() => {
    const data = {
        id:1,
        cake : allDispoit[0].cake,
        package : allDispoit[0].package,
        send_free : send_free.value,
        normal: normal.value
    }
    const rrr= await updateDeposit(data)
}
/*---------------------- send handler -----------------------*/



/*---------------------- wallet handler -----------------------*/
window.walletHandler = async() => {
    const data = {
        id :1 ,
        percentage : wallet_value.value
    }

    const rrr = await updateWallet(data)
    console.log(rrr)
}
/*---------------------- wallet handler -----------------------*/
