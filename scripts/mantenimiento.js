// Definición de constantes
let formulario = document.querySelector('.formulario')
let btnNombre = document.getElementById('btnNombre')
let btnEditar = document.getElementById('btnEditar')
let btnEliminar = document.getElementById('btnEliminar')

const URL_PRODUCTOS = 'http://localhost:4001/tbProducts/'
const ul = document.querySelector('.lista-productos');

document.getElementById('inputId').style.display = 'none';
document.getElementById('inputId').readOnly = true

let email = document.getElementById('inputNombre')

email.addEventListener('input', () => {
    document.getElementById('inputId').style.display = 'none'
})

// Petición GET - Mostrar lista productos en Pantalla
const listarProductos = async () => {

    const respuesta = await fetch(URL_PRODUCTOS);
    const data = await respuesta.json();
    data.forEach(element => {
        const { id, nombre, imagen_url, precio} = element;
        ul.innerHTML += `
       <li class="list-group-item">
            <img src=${imagen_url} width="50px"></img>
            <span class="lead">${nombre}</span>
            <span class="lead"><b>Precio:</b>$ ${precio}</span>
            <button id=${id} class="btn btn-dark btm-sm float-end ">
                Borrar
            </button>
        </li>
        `
    });

}

// Invocacion de funcion para listar elementos
window.addEventListener('DOMContentLoaded', listarProductos)

// Petición POST - Crear un nuevo Producto
formulario.addEventListener('submit', async e => {
    e.preventDefault()
    let name = document.getElementById('inputNombre').value
    let url_image = document.getElementById('inputUrl').value
    let price = document.getElementById('inputPrecio').value

    let resp = await fetch(URL_PRODUCTOS, {
        method: 'POST',
        body: JSON.stringify({
            nombre: name,
            imagen_url: url_image,
            precio: price
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

// Buscar por el Nombre del Producto

btnNombre.addEventListener('click', async () => {

    document.getElementById('inputId').style.display = 'block';

    const idContenedorTarjetasProd= document.getElementById('idContenedorTarjetasProd');
    let name = document.getElementById('inputNombre').value;

    const resp = await fetch(URL_PRODUCTOS);
    const lista = await resp.json()
    const elementoBuscado = lista.find(u => u.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    idContenedorTarjetasProd.innerHTML =''
    if (elementoBuscado !== undefined) {
        const { id, nombre, imagen_url, precio } = elementoBuscado;
        document.getElementById('inputNombre').value = nombre;
        document.getElementById('inputUrl').value = imagen_url;
        document.getElementById('inputPrecio').value = precio;
        document.getElementById('inputId').value = id;

        idContenedorTarjetasProd.innerHTML += `
            <div class="m-2 row justify-content-center" style="width: 20rem;">
               <img src="${imagen_url}" class="card-img-top">
               <div class="card-bod">
                  <h5 class="card-title text-center">${nombre}</h5>
                  <p class="card-text text-center">$${precio}</p>
               </div>
            </div>
         `


    } else {
        alert('Nombre no encontrado')
    }
})

// Petición PUT - Modificar la búsqueda realizada

btnEditar.addEventListener('click', async () => {

    let nombreModificado = document.getElementById('inputNombre').value
    let url_Modificada = document.getElementById('inputUrl').value
    let precioModificado = document.getElementById('inputPrecio').value
    let idModificado = document.getElementById('inputId').value

    let urlNueva = URL_PRODUCTOS + `${idModificado}`

    let resp = await fetch(urlNueva, {
        method: 'PUT',
        body: JSON.stringify({
            id: idModificado,
            nombre: nombreModificado,
            imagen_url: url_Modificada,
            precio: precioModificado
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

// Petición DELETE - Eliminar un producto desde el listado desplegado
ul.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-dark');

    if (btnEliminar === true) {
        const id = e.target.id;
        let urlNueva = URL_PRODUCTOS + `${id}`

        let resp = await fetch(urlNueva, {
            method: 'DELETE'
        })
    }

})