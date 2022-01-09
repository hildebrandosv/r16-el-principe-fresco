// Definición de constantes
const URL_PRODUCTOS = 'http://localhost:4001/tbProducts/'
const idContenedorTarjetasProd= document.getElementById('idContenedorTarjetasProd');

// Módulo PRINCIPAL del programa
//
// Cargar las tarjetas de los productos al cargar la página
window.addEventListener('DOMContentLoaded', fnGetProductos())

// Definición de funciones
// Función para "Petición GET", o sea para sólo traer los datos de la tabla.
async function fnGetProductos() {
   const respuesta = await fetch(URL_PRODUCTOS);
   const data = await respuesta.json();
   data.forEach(element => {
      idContenedorTarjetasProd.innerHTML += `
            <div class="card m-2" style="width: 13rem;">
               <img src="${element.imagen_url}" class="card-img-top">
               <div class="card-body">
                  <h5 class="card-title">${element.nombre}</h5>
                  <p class="card-text">$${element.precio}</p>
                  <a href="#" class="btn btn-primary w-100">Agregar</a>
               </div>
            </div>
         `
   });
}