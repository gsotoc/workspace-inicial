// hago el fetch a la api para obtener los productos del carrito del usuario 25801 - pauta 1
document.addEventListener("DOMContentLoaded", async ()=>{
    let cart = await getJSONData(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
    let subtotal = cart.data.articles[0].count * cart.data.articles[0].unitCost;
    let contentToAppend =       `<div  class="list-group-item list-group">     
                                    <h2 class"center"> Mi carrito de compras </h2>    

                                    <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Costo</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Subtotal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><img src="${cart.data.articles[0].image}" width="100"></td>
                                        <td>${cart.data.articles[0].name}</td>
                                        <td>${cart.data.articles[0].currency}  ${cart.data.articles[0].unitCost}</td>
                                        <td>${cart.data.articles[0].count}</td>
                                        <td>${cart.data.articles[0].currency} ${subtotal}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>`;

    document.getElementById("shoppingCart").innerHTML = contentToAppend;
    localStorage.setItem("cart", JSON.stringify(cart.data.articles[0]))
});