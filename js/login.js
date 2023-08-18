// voy a hacer que el boton de iniciar sesión lleve al inicio
const recordarmeChkBox=document.getElementById("recordarme");
const userTxt=document.getElementById("user");
const passwordTxt=document.getElementById("pasw");
const loginForm = document.getElementById("loginForm");

document.addEventListener("DOMContentLoaded", function(){
  //Agregamos el evento submit al formulario de inicio de sesión
    loginForm.addEventListener("submit", (event)=> {
      event.preventDefault();    
      if (recordarmeChkBox.checked) {
        //En caso de que el checkbox esté checkeado, se guardará el usuario en localStorage, de esta manera se mantendrá iniciada la
        //sesión en caso de que se cierre el navegador.
        localStorage.setItem("user",userTxt.value);
      }
        //Una vez haya ingresado el usuario y contraseña, ya que tiene
        //el atributo required, guardamos en sessionStorage para que pueda navegar por la página con el usuario
        sessionStorage.setItem("user",userTxt.value);
        alert("Ha iniciado sesión con éxito")
        setTimeout(()=>{
          //Redirigimos al ususario a la página principal una vez haya ingresado sesión
          location.replace("index.html")
        },1000)
      
    });
});
