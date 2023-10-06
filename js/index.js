document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    document.getElementById("btncart").addEventListener("click",()=>{
        let shoppingList = JSON.parse(localStorage.getItem("cart"));
        console.log(carrito.data)
        let contentToAppend =       `<div  class="list-group-item list-group">        

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
                                </div>
                                <div>
                                    <a href="cart.html"><button type="button" class="btn btn-success">Ir a mi carrito</button></a>
                                </div>`;
    
    document.getElementById("carrito").innerHTML = contentToAppend;
    });
});
    
    






