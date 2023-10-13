// hago el fetch a la api para obtener los productos del carrito del usuario 25801 - pauta 1
document.addEventListener("DOMContentLoaded", async () => {
    let htmlcontentToAppend = `<div  class="list-group-item list-group">     
    <h2 class"center"> Mi carrito de compras </h2>    
    
    <table class="table table-striped">
    <thead>
    <tr>
        <th scope="col"></th>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Costo</th>
        <th scope="col">Subtotal</th>
    </tr>
    </thead>
    <tbody>`
    let user = sessionStorage.getItem("user") || localStorage.getItem('user');
    let carritoLocalStorage = JSON.parse(localStorage.getItem('carritos'));
    let carritoUsuario = carritoLocalStorage[user]
    for (const producto in carritoUsuario) {
        const prod = carritoUsuario[producto];
        let subtotal = prod.count * prod.unitCost;
        console.log(prod);
        htmlcontentToAppend += `<tr>
                                <td><img src="${prod.image}" width="100"></td>
                                <td>${prod.name}</td>
                                <td><input type="number" value="${prod.count}"></input></td>
                                <td>${prod.currency} ${prod.unitCost} </td>
                                <td>${prod.currency} ${subtotal}</td>
                                </tr>`;
    }
    htmlcontentToAppend += `</tbody>
</table>
</div>`
    document.getElementById('shoppingCart').innerHTML = htmlcontentToAppend
});