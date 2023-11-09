const nombreTxt=document.getElementById("nombre");
const nombre2Txt=document.getElementById("segundo_nombre");
const apellidoTxt=document.getElementById("apellido");
const apellido2Txt=document.getElementById("segundo_apellido");
const emailTxt=document.getElementById("emailUser");
const telefonoTxt=document.getElementById("telefono");
const imgFile=document.getElementById("profileImg");
const imagenMostrada=document.getElementById("imagenMostrada");
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation() 
          }else{
            event.preventDefault()
            guardarDatosFormulario()
            setTimeout(() => {
                alert("Cambios guardados correctamente.")
            }, 3000);
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()
//Obtengo el mail usado por el usuario para precargarlo en my-profile.html
document.addEventListener("DOMContentLoaded", ()=>{
    cargarDatosUsuarioEnForm()
});
function cargarDatosUsuarioEnForm() {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    document.getElementById("emailUser").setAttribute("value", user);
    let objUsuario=JSON.parse(localStorage.getItem("userInfo"))||{}
    if (objUsuario[user]) {
        nombreTxt.value=objUsuario[user].nombre
        nombre2Txt.value=objUsuario[user].nombre2
        apellidoTxt.value=objUsuario[user].apellido
        apellido2Txt.value=objUsuario[user].apellido2
        telefonoTxt.value=objUsuario[user].telefono
        if (objUsuario[user].imagen!="") {
          imagenMostrada.src=objUsuario[user].imagen
          imagenMostrada.style.display="block";
        }
    }
}
function guardarDatosFormulario(){
    const user=localStorage.getItem("user") || sessionStorage.getItem("user");
    let objUsuario=JSON.parse(localStorage.getItem("userInfo"))||{}
    objUsuario[user]={
        nombre:nombreTxt.value,
        nombre2:nombre2Txt.value,
        apellido:apellidoTxt.value,
        apellido2:apellido2Txt.value,
        telefono:telefonoTxt.value,
        imagen:imagenMostrada.src
    }
    if (emailTxt.value!=user) {
        objUsuario[emailTxt.value]=objUsuario[user]
        delete objUsuario[user];
    }
    localStorage.setItem("user",emailTxt.value)
    localStorage.setItem("userInfo",JSON.stringify(objUsuario))
}

function convertirIMGB64() {
  var input = document.getElementById('profileImg');
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          var base64Image = e.target.result;
          var image = new Image();

          image.onload = function() {
              // Crear un canvas y reescalar la imagen a 100x100 píxeles
              var canvas = document.createElement('canvas');
              canvas.width = 100;
              canvas.height = 100;
              var ctx = canvas.getContext('2d');
              ctx.drawImage(image, 0, 0, 100, 100);

              // Convertir el canvas a una cadena Base64
              var resizedBase64Image = canvas.toDataURL('image/jpeg');
              // Mostrar la imagen reescalada en la página
              imagenMostrada.src = resizedBase64Image;
              imagenMostrada.style.display="block"
              
          };

          image.src = base64Image;
          
      };

      reader.readAsDataURL(input.files[0]);
  }
}
