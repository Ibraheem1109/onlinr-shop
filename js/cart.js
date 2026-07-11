const CART_STORAGE_KEY = 'cart';
const SHIPPING_COST = 10;
const TAX_RATE = 0.10;

function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCart();
}

function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    if (quantity <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = quantity;
        saveCart(cart);
        displayCart();
    }
}

function calculateTotals(cart = getCart()) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
}

function displayCart() {
    const container = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = '';
        if (emptyCart) emptyCart.style.display = 'flex';
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        if (shippingEl) shippingEl.textContent = '$0.00';
        if (taxEl) taxEl.textContent = '$0.00';
        if (totalEl) totalEl.textContent = '$0.00';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    container.innerHTML = cartHTML;

    const totals = calculateTotals(cart);
    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${totals.shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

function displayCheckoutItems() {
    const container = document.getElementById('checkout-items');
    if (!container) return;

    const cart = getCart();
    const itemsHTML = cart.map(item => `
        <div class="checkout-item">
            <span class="checkout-item-name">${item.name}</span>
            <span class="checkout-item-qty">x${item.quantity}</span>
            <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    container.innerHTML = itemsHTML;

    const totals = calculateTotals(cart);
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${totals.shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCart();
    displayCheckoutItems();
});