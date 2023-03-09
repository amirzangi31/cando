const BASE_URL = "http://localhost/cando/cando/";
const BASE_IAMGE = "http://localhost/cando/cando/file";

// user
const Login = async (data) => {
  const response = await axios.post(`${BASE_URL}user/login.php`, data);
  return response.data;
};
const Register = async (data) => {
  const response = await axios.post(`${BASE_URL}user/Register.php`, data);
  return response.data;
};
const GetWithToken = async (token) => {
  const response = await axios(
    `${BASE_URL}user/GetWithToken.php?token=${token}`
  );
  return response.data;
};
const GetWalletWithToken = async (token) => {
  const response = await axios(
    `${BASE_URL}user/GetWalletToken.php?token=${token}`
  );
  return response.data;
};

const getUserWithToken = async () => {
  const userToken = JSON.parse(window.localStorage.getItem("token"));

  const res = await fetch(
    `${BASE_URL}user/GetWithToken.php?token=${userToken}`
  );
  const data = await res.json();

  return data;
};

const getAllUsers = async () => {
  const res = await axios(`${BASE_URL}user/GetUser.php`);
  return res.data;
};

const getUserWithId = async (id) => {
  const res = await axios(`${BASE_URL}user/GetUserWithID.php?id=${id}`);
  return res.data;
};

// story
const GetAllStory = async () => {
  const response = await axios(`${BASE_URL}story/GetAll.php`);
  return response.data;
};

// product
const GetAllProduct = async () => {
  const response = await axios(`${BASE_URL}product/GetAll.php`);
  return response.data;
};
const GetProductWithId = async (id) => {
  const response = await axios(`${BASE_URL}product/GetWithId.php?id=${id}`);
  return response.data;
};
const createProduct = async (data) => {
  const res = await axios.post(`${BASE_URL}product/Insert.php`, data);
  console.log(res.data);
  return res.data;
};
const updateProduct = async (data, id) => {
  const res = await axios.patch(`${BASE_URL}product/update.php?id=${id}`, data);
  return res.data;
};

//Category
const getAllCategories = async () => {
  const res = await axios(`${BASE_URL}category/Get.php`);
  return res.data;
};

const addCategory = async (data) => {
  const res = await axios.post(`${BASE_URL}category/Insert.php`, data);
  console.log(res.data);
  return res.data;
};

// favorite
const GetFavorite = async (id) => {
  const response = await axios(`${BASE_URL}favorite/GetWithId.php?id=${id}`);
  return response.data;
};

// order
const GetOrderWithUser = async (id) => {
  const response = await axios(`${BASE_URL}order/GetWithUserId.php?id=${id}`);
  return response.data;
};

const getAllOrders = async () => {
  const res = await axios(`${BASE_URL}order/GetAllOrders.php`);
  return res.data;
};

const GetAllProductList = async (id) => {
  const res = await axios(`${BASE_URL}order/GetProductList.php?id=${id}`);
  return res.data;
};
const CheckOrder = async (id) => {
  const response = await axios(`${BASE_URL}order/ChekcOrder.php?id=${id}`);
  return response.data;
};
const InsertOrder = async (data) => {
  const response = await axios.post(`${BASE_URL}order/Insert.php`, data);
  return response.data;
};

const addToOrder = async (data) => {
  const res = await axios.post(`${BASE_URL}order/Insert.php`, data);
  return res.data;
};
const insertProductToOrder = async (data) => {
  const response = await axios.post(
    `${BASE_URL}order/insertProductList.php`,
    data
  );
  console.log(response.data);
  return response.data;
};
const updataProduct = async (data) => {
  const response = await axios(
    `${BASE_URL}order/UpdateProducts.php?id=${id}`,
    data
  );
  console.log(response.data);
  return response.data;
};

// ticekt
const InsertTicket = async (data) => {
  const response = await axios.post(`${BASE_URL}ticket/InserTicket.php`, data);
  return response.data;
};
const InsertTicketReply = async (data) => {
  const response = await axios.post(
    `${BASE_URL}ticket/InsertTicketReply.php`,
    data
  );
  return response.data;
};

const GetAllTicket = async () => {
  const response = await axios(`${BASE_URL}ticket/GetAllTicket.php`);
  return response.data;
};
const GetTicketReplyWithId = async (id) => {
  const response = await axios(`${BASE_URL}ticket/GetTicketReply.php?id=${id}`);
  console.log(response.data);
  return response.data;
};
const GetTicketReply = async (id) => {
  const response = await axios(`${BASE_URL}ticket/GetTicketReply.php?id=${id}`);
  return response.data;
};
const getTicketWithId = async (id) => {
  const res = await axios(`${BASE_URL}ticket/GetTicketById.php?id=${id}`);

  return res.data;
};

const updateTicket = async (id) => {};

const addAddress = async (data) => {
  const res = await axios.post(`${BASE_URL}address/InsertAddress.php`, data);
  console.log(res.data);
  return res.data;
};

//back
const back = () => {
  document.querySelector("#back").addEventListener("click", () => {
    window.history.back();
  });
};

//cake , package
const addCake = async (data) => {
  const res = await axios.post(`${BASE_URL}pakage/InsertCake.php`, data);
  return res.data;
};

const addCakeA = async (data) => {
  const res = await axios.post(
    `${BASE_URL}pakage/InsertArbitraryPakage.php`,
    data
  );

  return res.data;
};

const addPackage = async (data) => {
  const res = await axios.post(`${BASE_URL}pakage/InsertPakage.php`, data);

  return res.data;
};
const getWithIdPackage = async (id) => {
  const res = await axios.post(`${BASE_URL}pakage/GetWithUserId.php?id=${id}`);
  return res.data;
};

//UPLOAD IMAGE
const uploadImage = async (input) => {
  const form = new FormData();
  const file = document.querySelector(`#${input}`).files[0];
  form.append("upfile", file);

  const url = `${BASE_URL}file/upload.php`;

  const res = await axios.post(url, form);

  const path = res.data.path;
  const newUrl = path.split("");
  const test = newUrl.slice(1, newUrl.length);
  const result = test.join("");
  return result;
};

const addAmozesh = async (data) => {
  const res = await axios.post(`${BASE_URL}article/insert.php`, data);
  console.log(res.data);
  return res.data;
};

const totalPriceOrder = (products) => {
  const total = products.reduce((a, b) => +a + +b.count * b.price, 0);
  return { totalS: total.toLocaleString(), total };
};

const getAllArticle = async () => {
  const res = await axios(`${BASE_URL}article/GetAll.php`);
  return res.data;
};
const getArticleWithId = async (id) => {
  const res = await axios(`${BASE_URL}article/GetWithId.php?id=${id}`);
  return res.data;
};

const updateUser = async (id, data) => {
  const res = await axios.put(`${BASE_URL}user/UpdateUser.php?id=${id}`, data);
  return res.data;
};

const validateLogin = async () => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  if ([null, undefined, ""].includes(token)) {
    window.location.replace("./log-in.html");
  }
};

const getTokenLocal = async () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  return token;
};

const userId = async () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const user = await getUserWithToken(token);
  const userId = user[0].id;
  return userId;
};

const getPath = async () => {
  const one = window.location.search;
  const two = one.split("");
  const three = two.slice(1);
  const result = three.join("");
  return result;
};

const exit = async () => {
  window.localStorage.removeItem("token");
};

const getArticle = async (id) => {
  const res = await axios(`${BASE_URL}article/GetWithId.php?id=${id}`);

  return res.data;
};

const getAllCakes = async () => {
  const res = await axios(`${BASE_URL}pakage/GetAll.php`);
  console.log(res);
  return res.data;
};

const updateCount = async (id, dataf) => {
  const res = await axios.post(
    `${BASE_URL}order/UpdateCount.php?id=${id}`,
    dataf
  );

  return res.data;
};

const getAllFavorite = async() =>{
  const res =await axios(`${BASE_URL}favorite/GetAll.php`)
  return res.data
}


const addFavorite = async (id, data) => {
  const res = await axios.post(`${BASE_URL}Favorite/insert.php?id=${id}`, data);
  return res.data;
};

const updateFavorite = async (id, dataf) => {
  const res = await axios.post(
    `${BASE_URL}Favorite/UpdateProducts.php?id=${id}`,
    dataf
  );
  return res.data;
};

const getAllProductsFavoriteWithId = async (id) => {
  const res = await axios(`${BASE_URL}Favorite/GetWithId.php?id=${id}`);

  return res.data;
};

const getAddressWithId = async (id) => {
  const res = await axios(`${BASE_URL}address/GetWithUserId.php?id=${id}`);

  return res.data;
};

const getAllPackage = async () => {
  const res = await axios(`${BASE_URL}pakage/GetAll.php`);

  return res.data;
};

const getAllDispoit = async () => {
  const res = await axios(`${BASE_URL}deposit/GetAll.php`);

  return res.data;
};

const getWallet = async () => {
  const res = await axios(`${BASE_URL}RechargeWallet/GetAll.php`);

  return res.data;
};

const updateDeposit = async (data) => {
  const res = await axios.post(`${BASE_URL}deposit/Update.php`, data);
  return res.data;
};
const updateWallet = async (data) => {
  const res = await axios.post(`${BASE_URL}RechargeWallet/Update.php`, data);
  return res.data;
};

const getAllWallet = async () => {
  const res = await axios(`${BASE_URL}wallet/GetAll.php`);
  return res.data;
};

const getAllDeposit = async () => {
  const res = await axios(`${BASE_URL}deposit/GetAll.php`);
  return res.data;
};

const addOprator = async (data) => {
  const res = await axios.post(`${BASE_URL}admin/Register.php`, data);
  console.log(res.data);
  return res.data;
};

const adminWithToken = async(data) =>{
  const res = await axios(`${BASE_URL}admin/GetWithToken.php?token=${data}`)

  return res.data
}




const LoginAdmin = async (data) => {
  const res = await axios.post(`${BASE_URL}admin/Login.php`, data);
  return res.data;
};

const getAllComment = async () => {
  const res = await axios(`${BASE_URL}comment/GetAll.php`);
  return res.data;
};
const addCommnet = async (data) => {
  const res = await axios.post(`${BASE_URL}comment/Insert.php`, data);

  return res.data;
};

const updateComment = async (id, dataf) => {
  const res = await axios.post(`${BASE_URL}comment/delete.php?id=${id}`, dataf);

  return res.data;
};

const deleteComment = async (id, dataf) => {
  const res = await axios.post(`${BASE_URL}comment/delete.php?id=${id}`, dataf);

  return res.data;
};

const getAllOprator = async () => {
  const res = await axios(`${BASE_URL}admin/GetUser.php`);
  return res.data;
};


const deleteFavorite = async(id) =>{
  const res = await axios.delete(`${BASE_URL}favorite/delete.php?id=${id}`)

  return res.data
}

const confirmPackage = async(id) => {
  const data = {
    id 
  }

  const res = await axios.post(`${BASE_URL}pakage/UpdateAcceptPakage.php`, data)
  console.log(res.data)
  return res.data



}



export {
  confirmPackage,
  deleteFavorite,
  getAllOprator,
  updateComment,
  deleteComment,
  addCommnet,
  getAllComment,
  LoginAdmin,
  addOprator,
  getAllDeposit,
  getArticle,
  exit,
  getPath,
  uploadImage,
  userId,
  getTokenLocal,
  totalPriceOrder,
  Login,
  addCakeA,
  Register,
  GetAllStory,
  InsertTicketReply,
  BASE_URL,
  GetTicketReplyWithId,
  GetAllProduct,
  GetProductWithId,
  GetOrderWithUser,
  GetWithToken,
  updateTicket,
  GetWalletWithToken,
  InsertTicket,
  GetAllTicket,
  GetTicketReply,
  CheckOrder,
  InsertOrder,
  GetFavorite,
  getAllCategories,
  GetAllProductList,
  back,
  addCategory,
  addToOrder,
  createProduct,
  addCake,
  updateProduct,
  insertProductToOrder,
  updataProduct,
  BASE_IAMGE,
  addPackage,
  getWithIdPackage,
  getUserWithToken,
  addAddress,
  addAmozesh,
  getAllArticle,
  getAllUsers,
  updateUser,
  validateLogin,
  getUserWithId,
  getTicketWithId,
  getArticleWithId,
  getAllCakes,
  updateCount,
  addFavorite,
  getAllProductsFavoriteWithId,
  updateFavorite,
  getAddressWithId,
  getAllOrders,
  getAllPackage,
  getAllDispoit,
  getWallet,
  updateDeposit,
  updateWallet,
  getAllWallet,
  getAllFavorite,
  adminWithToken
};
