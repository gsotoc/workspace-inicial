const port="http://localhost:3000/"
const CATEGORIES_URL = port+"cats/cat";
const PUBLISH_PRODUCT_URL = port+"sell/publish";
const PRODUCTS_URL = port+"cats_products/";
const PRODUCT_INFO_URL = port+"products/";
const PRODUCT_INFO_COMMENTS_URL = port+"products_comments/";
const CART_INFO_URL = port+"user_cart/";
const CART_BUY_URL = port+"cart/buy";
const EXT_TYPE = ".json";
const logOutBtn=document.getElementById("logOut");
const alternarTemaBTN=document.getElementById("alternarTema")||{};
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

  document.getElementById("btncart").addEventListener("click",()=>{
    let contentToAppend =`<div  class="list-group-item list-group">        
                                                  <table class="table table-striped">
                                                  <thead>
                                                  <tr>
                                                      <th scope="col">Nombre</th>
                                                      <th scope="col">Cantidad</th>
                                                      <th scope="col">Costo</th>
                                                  </tr>
                                                  </thead>
                                                  <tbody>`
    let user=sessionStorage.getItem("user")||localStorage.getItem('user');
    let carritoLocalStorage = JSON.parse(localStorage.getItem('carritos'));
    let carritoUsuario=carritoLocalStorage[user]
    for (const producto in carritoUsuario) {
      
        const prod = carritoUsuario[producto];
          contentToAppend +=`<tr>
                                    <td>${prod.name}</td>
                                    <td>${prod.count}</td>
                                    <td>${prod.currency} ${prod.unitCost} </td>
                                </tr>`;
      }
            contentToAppend +=`</tbody>
                              </table>
                              </div>`
                              document.getElementById('carrito').innerHTML=contentToAppend
});

checkLog();
//Funcionalidad del botón de cerrar sesion, limpia el usuario de sessionStorage y localStorage, a continuación lo redirigimos a la página de login
logOutBtn.addEventListener("click",()=>{
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  location.reload();
})
});







