//Obtengo el mail usado por el usuario para precargarlo en my-profile.html
document.addEventListener("DOMContentLoaded", ()=>{
    const email = localStorage.getItem("user") || sessionStorage.getItem("user");
    document.getElementById("emailUser").setAttribute("value", email);
});
