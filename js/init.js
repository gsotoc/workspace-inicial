const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const logOutBtn=document.getElementById("logOut");
const alternarTemaBTN=document.getElementById("alternarTema");
let user=""
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//Esta funcion se encarga de checkear que el usuario haya ingresado sesión previamente, en caso contrario, se lo devuelve a la página de login
function checkLog() {
  if (sessionStorage.getItem("user")) {
    user=sessionStorage.getItem("user");
    document.getElementById("userHeader").innerHTML=user;
  }
  else if(localStorage.getItem("user")) {
    user=localStorage.getItem("user");
    document.getElementById("userHeader").innerHTML=user;
  } else {
    location.replace("login.html");
  }
}
document.addEventListener("DOMContentLoaded", function() {
          //Agregamos el boton de alternar en modo oscuro 
  const listas=document.getElementsByClassName("list-group");
  if(!window.location.href.includes("index")){
  if (JSON.parse(localStorage.getItem("modo"))) {
    document.body.classList.toggle("modo-noche");
    alternarTemaBTN.classList.toggle("btn-light")
    listas[0].classList.toggle("list-group-dark");
  }
    alternarTemaBTN.addEventListener("click",()=>{
      if (JSON.parse(localStorage.getItem("modo"))) {
        localStorage.setItem("modo",false);
        alternarTemaBTN.classList.toggle("btn-light")
      } else {
        localStorage.setItem("modo",true);
        alternarTemaBTN.classList.toggle("btn-light")
      }      
      listas[0].classList.toggle("list-group-dark");
      document.body.classList.toggle("modo-noche");
    });
  }
    
checkLog();
//Funcionalidad del botón de cerrar sesion, limpia el usuario de sessionStorage y localStorage, a continuación lo redirigimos a la página de login
logOutBtn.addEventListener("click",()=>{
  sessionStorage.clear("user");
  localStorage.clear("user");
  location.reload();
})
});







