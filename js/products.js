
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COST = "Cost.";
let productsArray=[];
let catName="";
let currentproductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function setProductID(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined){
        
        currentproductsArray = productsArray;
    }
   
    currentproductsArray = sortProducts(currentSortCriteria, currentproductsArray);

    //Muestro las categorías ordenadas
    printProducts();
}
function sortProducts(criteria, array){
    
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);

            if ( acost > bcost ){ return -1; }
            if ( acost < bcost ){ return 1; }
            return 0;
        });
    }

    return result;
}
async function printProducts(){
    const productsContainer=document.getElementById("productsContainer");
    let htmlContentToAppend="";
    productsArray.forEach(product => {
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
        htmlContentToAppend+=
        `
            <div id="product.id" onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
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
            </div>
            `
}});
    productsContainer.innerHTML=htmlContentToAppend;
    document.getElementById("categoryName").innerHTML=catName;
}
document.addEventListener("DOMContentLoaded",async ()=>{
    let catID=localStorage.getItem("catID");
    let catProducts= await getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`);
     productsArray=catProducts.data.products;
     catName=catProducts.data.catName
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME,productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME,productsArray);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COST,productsArray);
        
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        printProducts();
    });
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

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

        printProducts();
    });
    printProducts();
})
