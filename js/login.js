// voy a hacer que el boton de iniciar sesión lleve al inicio
const recordarmeChkBox=document.getElementById("recordarme");
const userTxt=document.getElementById("usuario");
const passwordTxt=document.getElementById("contraseña");
const loginForm = document.getElementById("loginForm");
async function CargarProducto() {
 let precarga = await fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`).then(response=>{
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
    
  })
  precarga=precarga.articles[0]
  user=userTxt.value.trim()
  if(localStorage.getItem('carritos')){
    let carritoLocalStorage=JSON.parse(localStorage.getItem('carritos'));
    let carritoUsuario={};
    if (carritoLocalStorage[user]) {
    } else {
    carritoUsuario[precarga.id]={
          name:precarga.name,
          count:precarga.count,
          unitCost:precarga.unitCost,
          currency:precarga.currency,
          image:precarga.image
    }
    carritoLocalStorage[user]=carritoUsuario
    localStorage.setItem('carritos',JSON.stringify(carritoLocalStorage))
    }
  }else{
    const carritoUsuario={            
      [precarga.id]:{
        name:precarga.name,
        count:precarga.count,
        unitCost:precarga.unitCost,
        currency:precarga.currency,
        image:precarga.image
  }
    }
    let carritoLocalStorage={
      [user]:carritoUsuario
    }
    localStorage.setItem('carritos',JSON.stringify(carritoLocalStorage))
    }
}
document.addEventListener("DOMContentLoaded", function(){
  //Agregamos el evento submit al formulario de inicio de sesión
    loginForm.addEventListener("submit", async (event)=> {
      event.preventDefault();    
      if (recordarmeChkBox.checked) {
        //En caso de que el checkbox esté checkeado, se guardará el usuario en localStorage, de esta manera se mantendrá iniciada la
        //sesión en caso de que se cierre el navegador.
        localStorage.setItem("user",userTxt.value);
      }
        //Una vez haya ingresado el usuario y contraseña, ya que tiene
        //el atributo required, guardamos en sessionStorage para que pueda navegar por la página con el usuario
        sessionStorage.setItem("user",userTxt.value);
        await CargarProducto();
        alert("Ha iniciado sesión con éxito")
        setTimeout(()=>{
          //Redirigimos al ususario a la página principal una vez haya ingresado sesión
          location.replace("index.html")
        },1000)
      
    });

});
