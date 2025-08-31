const products = [
    { id: 1, name: "Monitor 27'' 4K", price: 1500000, image: "https://via.placeholder.com/400x300.png?text=Monitor+4K" },
    { id: 2, name: "Teclado Mecánico RGB", price: 350000, image: "https://via.placeholder.com/400x300.png?text=Teclado+RGB" },
    { id: 3, name: "Mouse Gaming Inalámbrico", price: 280000, image: "https://via.placeholder.com/400x300.png?text=Mouse+Gaming" },
    { id: 4, name: "Webcam Full HD", price: 180000, image: "https://via.placeholder.com/400x300.png?text=Webcam+HD" },
    { id: 5, name: "Audífonos con Micrófono", price: 250000, image: "https://via.placeholder.com/400x300.png?text=Audifonos" },
];

const productGallery = document.getElementById('galeria');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutButton = document.getElementById('checkout-button');

let cart = [];

function renderProducts() {
    productGallery.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toLocaleString('es-CO')}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
            </div>
        `;
        productGallery.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);
            if (productToAdd) {
                addToCart(productToAdd);
            }
        });
    });
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                <button class="remove-item-btn" data-id="${item.id}">Quitar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
    }

    cartTotal.textContent = total.toLocaleString('es-CO');
    cartCount.textContent = cart.length;

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const confirmation = confirm(`Vas a pagar $${total.toLocaleString('es-CO')} con Nequi. ¿Deseas continuar?`);
        if (confirmation) {
            alert("Redirigiendo a la pasarela de Nequi... (Esta es una simulación). ¡Gracias por tu compra!");
            cart = [];
            updateCart();
        }
    } else {
        alert("Tu carrito está vacío. ¡Agrega productos para comprar!");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});
