// voy a hacer que el boton de iniciar sesión lleve al inicio
const btninicio = document.getElementById("inicio");
const username = document.getElementById("user");
const pasword = document.getElementById("pasw");


btninicio.addEventListener("click", (e)=>{
    e.preventDefault()
    const data = {
        username: username.value,
        pasword: pasword.value,
    }
    if (username.value.length === 0){
        return alert("Debes ingresar un usuario.");
    }  else if (pasword.value.length === 0) {
        return alert("Debes agregar una contraseña.")
    } else {
        alert("Loggeado correctamente")
        setTimeout(function (){
            location.href = "index.html";
        }, 100)
        
    }
    
});