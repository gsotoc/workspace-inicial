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
});
//Desafíate: Usamos sessionStorage para ver si el usuario se loggeo previamente y de esta manera lo redirigimos
//en el caso contrario

document.addEventListener("DOMContentLoaded", function() {
    user=sessionStorage.getItem("user");
    contenedor=document.getElementById("welcomeMessage");
    if (user!=null) {
    } else {
        location.replace("login.html")
    }
    
    
  });