const cuentaCarritoElement = document.getElementById("cuenta-carrito");

//Producto con ID para agregar a carrito
function agregarAlCarrito(producto){
  //Confirma si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("relojes"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("relojes",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(reloj => reloj.id === producto.id)
    const nuevaMemoria = memoria;
    //Si el producto no está en el carrito lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {      Toastify({
      text: "Se ha duplicado el producto",
      
      duration: 3000
      
      }).showToast();
      //Si el producto está en el carrito le agrego 1 a la cantidad
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("relojes",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

//Resta de productos en carrito
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("relojes"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(reloj => reloj.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("relojes",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

//Suma cantidad a producto
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

//Actualiza cantidad item en carrito de header
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("relojes"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

//Reinicio de carrito
function reiniciarCarrito(){
  localStorage.removeItem("relojes");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();