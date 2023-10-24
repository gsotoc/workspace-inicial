document.addEventListener("DOMContentLoaded",() => {
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
    user = sessionStorage.getItem("user") || localStorage.getItem('user');
    let carritoLocalStorage = JSON.parse(localStorage.getItem('carritos'));
    let carritoUsuario = carritoLocalStorage[user]
    let subtotal = 0;
    let costoEnvio = 0;
    let envio = 0.15;

    for (const producto in carritoUsuario) {
        const prod = carritoUsuario[producto];
        let prodSubtotal = prod.count * prod.unitCost;
        htmlcontentToAppend += `<tr id="${producto}">
                                <td><img src="${prod.image}" width="100"></td>
                                <td>${prod.name}</td>
                                <td><input type="number" value="${prod.count}" min="1"></input></td>
                                <td>${prod.currency} ${prod.unitCost} </td>
                                <td>${prod.currency} <span>${prodSubtotal}</span></td>
                                </tr>`;
    
        //Creo el contenido a ser ingresado en el total
        subtotal += prodSubtotal;
        costoEnvio = subtotal*envio;
        let total = costoEnvio+subtotal;

        let datosCarrito = {
            subtotal: `${subtotal}`,
            costoEnvio: `${costoEnvio}`,
            total: `${total}`
        }
        localStorage.setItem('datosCarrito', JSON.stringify(datosCarrito));

        htmlTotalContentToAppend = `<h4 class="mt-3">Total</h4>
                                    <div class="row border d-flex">
                                        <h5 class="d-inline-flex pt-1">Subtotal</h5>
                                        <span class="text-end"">USD ${subtotal}</span>
                                    </div>
                                    <div class="row border" id="costoEnvio">
                                        <h5 class="d-inline-flex pt-1">Costo de envío</h5>
                                        <span class="text-end">USD ${costoEnvio}</span>
                                    </div>
                                    <div class="row border">
                                        <h5 class="d-inline-flex pt-1">Total</h5>
                                        <span class="text-end">USD ${total}</span>
                                    </div>`;
        document.getElementById("total").innerHTML = htmlTotalContentToAppend   
    }
    document.getElementById('shoppingCart').innerHTML = htmlcontentToAppend;


    for (const producto in carritoUsuario) {
        const prod = carritoUsuario[producto];
        let prodHTML=document.getElementById(producto)
        const inputProd=prodHTML.getElementsByTagName('input')[0]
        inputProd.addEventListener('input',()=>{
            prodHTML.getElementsByTagName('span')[0].innerHTML=parseInt(inputProd.value)*parseInt(prod.unitCost);
            carritoUsuario[producto].count=parseInt(inputProd.value);
            carritoLocalStorage[user]=carritoUsuario;
            localStorage.setItem('carritos',JSON.stringify(carritoLocalStorage));

            // Funcionalidad del total
            let carritoTotalLocalStorage = JSON.parse(localStorage.getItem('carritos'));
            let carritoTotal = carritoTotalLocalStorage[user];
            subtotalProducto=0;
            for (const producto in carritoTotal){
                const totalProd = carritoTotal[producto];
                subtotalProducto += totalProd.unitCost*totalProd.count;
                costoEnvio = Math.round(subtotalProducto*envio);
                total = subtotalProducto + costoEnvio;
            }
            totalContentToAppend = `<h4 class="mt-3">Total</h4>
                                    <div class="row border d-flex">
                                        <h5 class="d-inline-flex pt-1">Subtotal</h5>
                                        <span class="text-end">${subtotalProducto}</span>
                                    </div>
                                    <div id="costoEnvio" class="row border">
                                        <h5 class="d-inline-flex pt-1">Costo de envío</h5>
                                        <span class="text-end">${costoEnvio}</span>
                                    </div>
                                    <div class="row border">
                                        <h5 class="d-inline-flex pt-1">Total</h5>
                                        <span class="text-end">${total}</span>
                                    </div>`;
            document.getElementById("total").innerHTML = totalContentToAppend;
        })  
        
        let shippingCart = JSON.parse(localStorage.getItem('datosCarrito'));
        let botonesRadio = document.querySelectorAll('[name="flexRadioDefault"]');
        botonesRadio.forEach(boton => boton.addEventListener("click",(e)=>{
        document.getElementById("costoEnvio").innerHTML = "";
        envio = e.target.value;
        shippingCost = Math.round(shippingCart.subtotal*envio);
        document.getElementById("costoEnvio").innerHTML = `<h5 class="d-inline-flex pt-1">Costo de envío</h5>
                                                            <span class="text-end">USD ${shippingCost}</span>`;        
    }));
}});