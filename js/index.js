const contenedorTarjetas = document.getElementById("productos-container");

//Tarjetas de productos
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoReloj = document.createElement("div");
    nuevoReloj.classList = "tarjeta-producto"
    nuevoReloj.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Reloj 1">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevoReloj);
    nuevoReloj.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(relojes);