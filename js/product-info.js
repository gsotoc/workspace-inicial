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
    printProductInfo(product);
})