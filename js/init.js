const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const logOutBtn = document.getElementById("logOut");
const alternarTemaBTN = document.getElementById("alternarTema");
let user = ""
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
//Esta funcion se encarga de checkear que el usuario haya ingresado sesión previamente, en caso contrario, se lo devuelve a la página de login
function checkLog() {
  if (sessionStorage.getItem("user")) {
    user = sessionStorage.getItem("user");
    document.getElementById("userHeader").innerHTML = user;
  }
  else if (localStorage.getItem("user")) {
    user = localStorage.getItem("user");
    document.getElementById("userHeader").innerHTML = user;
  } else {
    location.replace("login.html");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  //Agregamos el boton de alternar en modo oscuro 
  const listas = document.getElementsByClassName("list-group");
  if (!window.location.href.includes("index")) {
    if (JSON.parse(localStorage.getItem("modo"))) {
      document.body.classList.toggle("modo-noche");
      alternarTemaBTN.classList.toggle("btn-light")
      listas[0].classList.toggle("list-group-dark");
    }
    alternarTemaBTN.addEventListener("click", () => {
      if (JSON.parse(localStorage.getItem("modo"))) {
        localStorage.setItem("modo", false);
        alternarTemaBTN.classList.toggle("btn-light")
      } else {
        localStorage.setItem("modo", true);
        alternarTemaBTN.classList.toggle("btn-light")
      }
      listas[0].classList.toggle("list-group-dark");
      document.body.classList.toggle("modo-noche");

      let btnLight = `<button id="alternarTema" class="btn btn-dark">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </svg>
    </button>`

      let btnDark = `<button id="alternarTema" class="btn btn-dark">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
    </svg>
    </button>`

      if (document.body.classList.contains("modo-noche")) {
        document.getElementById("alternarTema").innerHTML = btnLight
      } else {
        document.getElementById("alternarTema").innerHTML = btnDark
      }
    });

    document.getElementById("btncart").addEventListener("click", () => {
      let shoppingList = JSON.parse(localStorage.getItem("cart"));
      console.log(carrito.data)
      let contentToAppend = `<div  class="list-group-item list-group">        

                                  <table class="table table-striped">
                                  <thead>
                                  <tr>
                                      <th scope="col">Nombre</th>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Costo</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                      <td>${shoppingList.name}</td>
                                      <td>${shoppingList.count}</td>
                                      <td>${shoppingList.currency} ${shoppingList.unitCost} </td>
                                  </tr>
                                  </tbody>
                              </table>
                              </div>`;

      document.getElementById("carrito").innerHTML = contentToAppend;
    });
  }

  checkLog();
  //Funcionalidad del botón de cerrar sesion, limpia el usuario de sessionStorage y localStorage, a continuación lo redirigimos a la página de login
  logOutBtn.addEventListener("click", () => {
    sessionStorage.clear("user");
    localStorage.clear("user");
    location.reload();
  })
});







