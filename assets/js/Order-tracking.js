import { getAddressWithId, getAllOrders, getPath, userId, validateLogin } from "./api.js";
await validateLogin();

///js for btn bottom
let btnHamburger = document.querySelector(".btn-bottom");

btnHamburger.addEventListener("click", () => {
  btnHamburger.classList.toggle("active");
});

////////////////////////////////////////////////////////////////
//js for map

$(document).ready(function () {
  var app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: 30.2833,
        lng: 57.0667,
      },
      zoom: 10,
    },
    apiKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcyMzExMDc4MmVmMGM3YTdmNjliN2EyZDY5MDQxZDBkM2IxNzQ3ZjkwMTA1NWNmZTVlNDY2N2NhOGY2OTFkOGVhMTlkNjk0ZWQ1YmNmYjc1In0.eyJhdWQiOiIyMDM4NCIsImp0aSI6IjcyMzExMDc4MmVmMGM3YTdmNjliN2EyZDY5MDQxZDBkM2IxNzQ3ZjkwMTA1NWNmZTVlNDY2N2NhOGY2OTFkOGVhMTlkNjk0ZWQ1YmNmYjc1IiwiaWF0IjoxNjcxMjcxMzY1LCJuYmYiOjE2NzEyNzEzNjUsImV4cCI6MTY3Mzc3Njk2NSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.PI3vHjsfRB98fNvgm93prSCpA3S_0-mcLQlmwTmDfcQ8cSMOIUdoJcJ6P9Mi_XQ4m_uU0UE-DLy_54Dz2BAjvhq9Ah1KVRC2Svgs7Kck8MAn_xILI0K3PxSr_GFuUXOAK0FR29KhhvwBpqQdnC76Bl5dfpInooCSeSvFvUKuUC3d8QF9pDc6FHuqRsuM9x1uhRbv1TpRZMo2uXiXClwjHH_uvOwurrC9EfDYcXFw72sMeIi90COuspoUUJCnZF1MGH0JR9DUK9oyEDVbf0uA9PnIULr6J98lq82aAQrFlDeD389GHtQ131uNhZV1WUBclseQQYFSiXjZ5AZ_qbukyg",
  });
  app.addLayers();
  app.map.on("click", function (e) {
    // آدرس یابی و نمایش نتیجه در یک باکس مشخص
    app.showReverseGeocode({
      state: {
        latlng: {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        },
        zoom: 16,
      },
    });
    app.addMarker({
      name: "advanced-marker",
      latlng: {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      },
      icon: app.icons.red,
      popup: false,
    });
    // برای سفارشی سازی نمایش نتیجه به جای متد بالا از متد زیر میتوان استفاده کرد
    // app.findReverseGeocode({
    //   state: {
    //     latlng: {
    //       lat: e.latlng.lat,
    //       lng: e.latlng.lng
    //     },
    //     zoom: 16
    //   },
    //   after: function(data) {
    //     app.addMarker({
    //       name: 'advanced-marker',
    //       latlng: {
    //         lat: e.latlng.lat,
    //         lng: e.latlng.lng
    //       },
    //       icon: app.icons.red,
    //       popup: {
    //         title: {
    //           i18n: 'آدرس '
    //         },
    //         description: {
    //           i18n: data.address
    //         },
    //         class: 'marker-class',
    //         open: true
    //       }
    //     });
    //   }
    // });
  });
});

/*----------------render page------------------*/

const userID = await userId();

const getAddress = await getAddressWithId(userID);
const addressUser = getAddress[getAddress.length - 1];

const path = await getPath();
const allOrders = await getAllOrders(path);
const order = allOrders.filter((item) => item.id === path);
const { status } = order[0];

const renderPage = async () => {
  const images = document.querySelectorAll(".confirm")
  images.forEach((item , index) => {
    item.style.display = "none"
  })

  images[+status].style.display = "block"

 


  const container = document.querySelector("#container");
  const note = `<div class="col-11 addres-item p-2">
    <span>آدرس : ${addressUser.address}،کدپستی${addressUser.postalcode}</span>
</div>
<div class="col-11 moshakhasat-item p-2">
    <div class="fname col-6" >
        <img class="p-1" src="./assets/images/icon/mobile.png">
        <span class="p-1">نام گیرنده :${addressUser.name}</span>
    </div>
    <div class="fname col-6" >
        <img class="p-1" src="./assets/images/icon/call.png">
        <span class="p-1">شماره گیرنده :${addressUser.phone}</span>
    </div>
</div>`;

  container.innerHTML = note;
};

await renderPage();

/*----------------render page------------------*/
