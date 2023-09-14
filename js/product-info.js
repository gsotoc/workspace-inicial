const productContainer=document.getElementById("productContainer");
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

document.addEventListener("DOMContentLoaded",async ()=>{
    let productID=localStorage.getItem("productID");
    let product=await getJSONData(PRODUCT_INFO_URL+productID+EXT_TYPE);
    product=product.data
    console.log(product);
    printProductInfo(product);
})

//funcionalidad comentarios
const comentario = document.getElementById("comment");
const btnEnviar = document.getElementById("send");
const container = document.getElementById("commentContainer");
let txtArray = JSON.parse(localStorage.getItem("txtArray")) || [];

// // Función que guarda el texto ingresado en localStorage
// function guardarTxt(texto) {
//     txtArray.push(texto); 
//     localStorage.setItem("txtArray", JSON.stringify(txtArray));
// }



// Función que imprime el texto en pantalla
function printComment(Array) {
    // Vacío el div contenedor
    container.innerHTML = "";
    Array.forEach(elem => {
        container.innerHTML += `
                                <div class="row list-group-item">
                                  <p>${elem.user} - ${elem.date}</p>
                                  <p>${elem.comment}</p>
                                </div>`; 
    });
}

document.addEventListener("DOMContentLoaded", () => {
    btnEnviar.addEventListener("click", async() => { 
    let productID=localStorage.getItem("productID");
    let product=await getJSONData(PRODUCT_INFO_URL+productID+EXT_TYPE);
      if(comentario.value!="" && comentario.value!= " "){

        const rating = localStorage.getItem("rating");
        const usuario = sessionStorage.getItem("user");
        const prodID= localStorage.getItem("productID");
        
        let infoComentario = {
          productId: prodID,
          user: usuario,
          date: new Date().toLocaleDateString(),
          rating: rating,
          comment: comentario.value
        };
      product.data.comentario = infoComentario; 
      console.log(product);
      }
        printComment(txtArray);
    });
});

//ratings
const selectedRating = document.querySelectorAll(".fa-star");

selectedRating.forEach(estrella=>{
  estrella.addEventListener("click",(e)=>{
    const rating = e.target.getAttribute("value");

//Agrego el atributo checked a todos las estrellas
    selectedRating.forEach(item => {
      if(item.getAttribute("value") <= rating){
        item.classList.add("checked")
      }
    })
    localStorage.setItem("rating", rating)
  })
});

async function printenconsola(url){
  console.log(await getJSONData(url));
}
console.log("https://japceibal.github.io/emercado-api/products_comments/");