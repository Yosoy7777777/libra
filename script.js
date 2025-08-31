
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoSpan = document.getElementById('total-carrito');
    let total = 0;

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const nombre = e.target.getAttribute('data-nombre');
            const precio = parseFloat(e.target.getAttribute('data-precio'));

            const nuevoItem = document.createElement('li');
            nuevoItem.textContent = `${nombre} - $${precio.toFixed(2)}`;
            listaCarrito.appendChild(nuevoItem);

            total += precio;
            totalCarritoSpan.textContent = `$${total.toFixed(2)}`;
        });
    });
});
