// voy a hacer que el boton de iniciar sesión lleve al inicio
document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();    
      if (document.getElementById("user")!=""&&document.getElementById("pasw")!="") {
        localStorage.setItem("user",document.getElementById("user").value);
        alert("Ha iniciado sesión con éxito")
        setTimeout(()=>{
          location.replace("index.html")
        },1000)
      } 
    });

});
