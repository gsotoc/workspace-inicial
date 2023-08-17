// voy a hacer que el boton de iniciar sesión lleve al inicio
const recordarmeChkBox=document.getElementById("recordarme");
const userTxt=document.getElementById("user");
const passwordTxt=document.getElementById("pasw");
const loginForm = document.getElementById("loginForm");

document.addEventListener("DOMContentLoaded", function(){
    loginForm.addEventListener("submit", (event)=> {
      event.preventDefault();    
      if (recordarmeChkBox.checked) {
        localStorage.setItem("user",userTxt.value);
      }
      if (userTxt.value!=""&&passwordTxt.value!="") {
        sessionStorage.setItem("user",userTxt.value);
        alert("Ha iniciado sesión con éxito")
        setTimeout(()=>{
            
          location.replace("index.html")
        },1000)
      } 
    });
});
