
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_SoldCount = "Count";
let productsArray=[];
let catName="";
let currentproductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
const rangeFilterCostMin= document.getElementById("rangeFilterCostMin");
const rangeFilterCostMax= document.getElementById("rangeFilterCostMax");
const sortAscBtn=document.getElementById("sortAsc");
const rangeFilterCost=document.getElementById("rangeFilterCost");
const clearRangeFilterBtn=document.getElementById("clearRangeFilter");
const sortByRelBtn=document.getElementById("sortByRel");
const sortDescBtn=document.getElementById("sortDesc");
const categoryNameH2=document.getElementById("categoryName");
const productsContainer=document.getElementById("productsContainer");
const searchTxt=document.getElementById("search");
//Guardamos en localStorage el ProductId para posteriormente saber que producto estamos mostrando en caso de entrar a product-info.html
function setProductID(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}
//Ordenamos el array que contiene todos los productos dependiendo del criterio que se haya elegido mediante los botones
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined){
        
        currentproductsArray = productsArray;
    }
   
    currentproductsArray = sortProducts(currentSortCriteria, currentproductsArray);

    //Muestro las categorías ordenadas
    printProducts(productsArray);
}
function filtrarArray(arrayproductos) {
    let productsFiltered=[]
    arrayproductos.some((producto)=>{
    producto.name.toUpperCase().includes(searchTxt.value.toUpperCase())?productsFiltered.push(producto):"";
    printProducts(productsFiltered);
    })

}
function sortProducts(criteria, array){
    //Creamos la variable result, donde se almacenarán todos los productos ordenados
    let result = [];
    //En caso de que el boton apretado haya sido el de ordenar por nombre de manera ascendente
    if (criteria === ORDER_ASC_BY_COST)
    {

        result = array.sort(function(a, b) {
            //Esta funcion ordena de forma alfabética ascendente con su nombre todos los productos del array.
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            //Devolvemos 0 para terminar la ejecución de esta función
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            //Esta funcion ordena de forma alfabética descendente con su nombre todos los productos del array.
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SoldCount){
        result = array.sort(function(a, b) {
            //Esta funcion ordena de forma descendente con su precio todos los productos del array.
            let acount = parseInt(a.soldCount);
            let bcount = parseInt(b.soldCount);

            if ( acount > bcount ){ return -1; }
            if ( acount < bcount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//Esta función muestra en la página todos los productos de la categoría seleccionada
function printProducts(productos){
    let htmlContentToAppend="";
    productos.forEach(product => {
        //Aqui filtramos mediante el rango de precio establecido por el usuario
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
            //Agregamos cada producto a la variable con el formato deseado en html
        htmlContentToAppend+=
        `
            <li id="product.id" onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-md-6 col-sm-12 col-lg-4">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - <span class="productCost">${product.currency}-${product.cost}</span></h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </li>
            `
}});
    //Insertamos la variable con todos los productos a la página
    productsContainer.innerHTML=htmlContentToAppend;
    categoryNameH2.innerHTML=catName;
}
document.addEventListener("DOMContentLoaded",async ()=>{
    //Guardamos el id de la categoría almacenada en localStorage para utilizarla posteriormente
    let catID=localStorage.getItem("catID");
    //Hacemos la petición con la función getJSONData y así guardarla en la variable catProducts
    let catProducts= await getJSONData(PRODUCTS_URL+catID);
    //Guardamos los específicamente los productos en el array en la variable
     productsArray=catProducts.data.products;
     //Guardamos el específicamente el nombre de la categoría en la variable
     catName=catProducts.data.catName
     //Buscador en tiempo real
     searchTxt.addEventListener("input",()=>{
        filtrarArray(productsArray);
     })
     //Funcionalidad del botón para ordenar de forma alfabética ascendente
    sortAscBtn.addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST,productsArray);
    });
    //Funcionalidad del botón para ordenar de forma alfabética descendente
    sortDescBtn.addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST,productsArray);
    });
    //Funcionalidad de ordenar por precio de forma ascendente
    sortByRelBtn.addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SoldCount,productsArray);
        
    });
    //Limpiamos los campos de filtros e imprimimos nuevamente todos los productos pero sin los filtros de precios
    clearRangeFilterBtn.addEventListener("click", function(){
        rangeFilterCostMin.value = "";
        rangeFilterCostMax.value = "";

        minCost = undefined;
        maxCost = undefined;

        printProducts(productsArray);
    });
    //Funcionalidad de los filtros, para que al darle click, actualice la lista de productos pero con el limite que le hayamos indicado
    rangeFilterCost.addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = rangeFilterCostMin.value;
        maxCost = rangeFilterCostMax.value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        printProducts(productsArray);
    });
    //Ejecutamos la funcion para imprimir los productos en pantalla de forma inicial
    printProducts(productsArray);
})
