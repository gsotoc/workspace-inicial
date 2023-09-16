const productContainer=document.getElementById("productContainer");
let commentArray=[];
function printProductInfo(product) {
    const productImg=product.images;
    const productName=product.name;
    const productDescription=product.description;
    const productCost=product.cost;
    const productCurrency=product.currency;
    const productSoldCount=product.soldCount;
    const htmlContentToAppend=`
    <div class="row">
    <div class="col-8">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${productImg[0]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productImg[1]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productImg[2]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productImg[3]}" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
    <div class="col-4 position-relative">
        <div class="row">
            <h2 class="col-9">${productName}</h2>
            <h4>$${productCost} <span>${productCurrency}</span></h4>
            <h5>Descripción del producto:</h5>
            <p>${productDescription}</p>
        </div>
        <div class="position-absolute top-0 end-0">
        <p class=""><span>${productSoldCount}</span> vendidos</p>
        </div>  
        <button class="btn btn-primary position-absolute bottom-0 w-100">Comprar</button>    
    </div>
  </div>`
  productContainer.innerHTML=htmlContentToAppend;
}

function formatearFecha(fecha) {
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const segundos= fecha.getSeconds().toString().padStart(2, '0');
  return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

document.addEventListener("DOMContentLoaded",async ()=>{
  //Tomamos los datos del producto según su ID el cual tenemos almacenado en localStorage
    let productID=localStorage.getItem("productID");
    let product=await getJSONData(PRODUCT_INFO_URL+productID+EXT_TYPE);
    product=product.data;
    //Tomamos los comentarios guardados en localStorage
    let comentariosLocalStorage=JSON.parse(localStorage.getItem("comments"))||[];
    let comentariosLocalStorageProduct=[]
    //Filtramos los comentarios dependiendo el producto en el que estemos y lo guardamos en comentariosLocalStorageProduct
    comentariosLocalStorage.forEach((comentario)=>{
      if (comentario.product==productID) {
        comentariosLocalStorageProduct.push(comentario)
      }
    })
    //Imprimimos la información del producto
    printProductInfo(product);
    //Tomamos los comentarios de la API
    let comentarios=await getJSONData(PRODUCT_INFO_COMMENTS_URL+productID+EXT_TYPE);
    comentarios=comentarios.data
    //Juntamos los comentarios del producto que tenemos en localStorage y los que tomamos de la API, los guardamos en un array llamado commentArray
    commentArray=commentArray.concat(comentarios,comentariosLocalStorageProduct)
    //Imprimimos los comentarios pasando como parámetro el array que sumamos anteriormente
    printComment(commentArray);
    //Creamos el evento del boton de enviar comentario
    btnEnviar.addEventListener("click", async() => { 
      //checkeamos que el campo de comentario no esté vacío
      if(comentario.value.trim()!=""){
        //limpiamos el commentArray para no sumar más comentarios cada vez que ingresamos uno nuevo
        commentArray=comentarios;
        //Declaramos variables que usaremos posteriormente
        const rating = localStorage.getItem("rating");
        const usuario = sessionStorage.getItem("user")||localStorage.getItem("user");
        //Creamos el objeto del comentario a guardar con su respectivo formato
        let infoComentario = {
          product: productID,
          user: usuario,
          dateTime: formatearFecha(new Date()),
          score: rating,
          description: comentario.value
        };        
        //sumamos el comentario al array que contiene todos los comentarios de localStorage
        comentariosLocalStorage.push(infoComentario);
        //lo sumamos también al array que usamos para almacenar los comentarios de este producto
        comentariosLocalStorageProduct.push(infoComentario);
        //guardamos los comentarios nuevamente en localStorage
        localStorage.setItem("comments",JSON.stringify(comentariosLocalStorage));
        //Sumamos nuevamente los comentarios del producto, incluyendo el último agregado
        commentArray=commentArray.concat(comentariosLocalStorageProduct);
      }
      //imprimimos nuevamente todos los comentarios
      printComment(commentArray);
      
    });
    
})

//funcionalidad comentarios
const comentario = document.getElementById("comment");
const btnEnviar = document.getElementById("send");
const container = document.getElementById("commentContainer");
commentArray = JSON.parse(localStorage.getItem("txtArray")) || [];

function updateStars() {
  const stars = document.querySelectorAll(".star");
  stars.forEach(function (star) {
    const rating = parseInt(star.getAttribute("data-rating"));
    if (rating <= currentRating) {
      star.classList.add("checked");
    } else {
      star.classList.remove("checked");
    }
  });
}

// Función que imprime los comentarios en pantalla
function printComment(Array) {
    // Vacío el div contenedor
    container.innerHTML = "";
    let htmlContentToAppend=""
    Array.forEach(elem => {
        htmlContentToAppend += `
                                <div class="row list-group-item comment">
                                  <p>${elem.user} - ${elem.dateTime}-
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span></p>
                                  <p>${elem.description}</p>
                                </div>`; 
    });
    container.innerHTML=htmlContentToAppend;
    checkStars();
}
//Esta funcion toma el array de todos los comentarios ingresados y les asigna la clase "checked" a cada estrella según corresponda
function checkStars() {
  //Este for recorre el array que tenemos guardado actualmente con todos los comentarios del producto
  for (let i = 0; i < commentArray.length; i++) {
    //Declaramos como "commentDiv" el elemento dentro del DOM que contiene el comentario que tenemos en nuestro array
    //los índices coinciden ya que los imprimimos a partir del mismo array.
    const element = document.querySelectorAll(".comment");
    const commentDiv=element[i]
    for (let j = 0; j < commentArray[i].score; j++) {
      //Tomamos las estrellas del commentDiv y le asignamos checked una por una iterando esta funcion 
      //dependiendo de la puntuación del comentario
      commentDiv.querySelectorAll(".fa-star")[j].classList.add("checked");
    }
  }
}

//ratings
const selectedRating = document.querySelectorAll(".fa-star");

selectedRating.forEach(estrella=>{
  estrella.addEventListener("click",(e)=>{
    const rating = e.target.getAttribute("value");

//Agrego el atributo checked a todos las estrellas
    selectedRating.forEach(item => {
      if(item.getAttribute("value") <= rating){
        item.classList.add("checked")
      }else{
        item.classList.remove("checked")
      }
    })
    localStorage.setItem("rating", rating)
  })
});