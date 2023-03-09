import { InsertTicket, back, GetAllTicket, userId, validateLogin } from "./api.js";
import { successAlert } from "./Services.js";
await validateLogin();

const backIcon = document.querySelector("#back");
backIcon.addEventListener("click", () => {
  back();
});

const sendTicket = async () => {
  const userID = await userId();



  const title = document.querySelector("#title-ticket");
  const message = document.querySelector("#des-ticket");
  console.log(title.value , message.value)

  if(!Boolean(title.value)  || !Boolean(message.value)){
    successAlert("error" , "لطفا تمام فیلد هارا پر کنید")
    return
  }


  const data = {
    user_id: +userID,
    message: message.value,
    title: title.value,
    type: "all",
    status: 0,
  };

  const ttt = await InsertTicket(data);
  successAlert("success" , "تیکت با موفقیت ارسال شد منتظر جواب بمانید")
  title.value = "";
  message.value = "";

};

const sendBtn = document.querySelectorAll(".send-btn");
sendBtn.forEach((item) => {
  item.addEventListener("click", sendTicket);
});
