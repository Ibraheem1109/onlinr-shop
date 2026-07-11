// Cart Management Functions

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    showNotification(`${product.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCart();
}

// Update item quantity
function updateQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
            displayCart();
        }
    }
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

// Calculate totals
function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = 10; // Fixed shipping cost
    const total = subtotal + tax + shipping;

    return {
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: total
    };
}

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartDiv = document.getElementById('empty-cart');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        updateCartTotals();
        return;
    }

    if (emptyCartDiv) emptyCartDiv.style.display = 'none';

    let html = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 2rem;">${item.image}</span>
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                           onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </td>
            </tr>
        `;
    });

    cartItemsContainer.innerHTML = html;
    updateCartTotals();
}

// Update totals display
function updateCartTotals() {
    const totals = calculateTotals();
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${totals.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

    // Update checkout page totals
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');

    if (summarySubtotal) summarySubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (summaryTax) summaryTax.textContent = `$${totals.tax.toFixed(2)}`;
    if (summaryShipping) summaryShipping.textContent = `$${totals.shipping.toFixed(2)}`;
    if (summaryTotal) summaryTotal.textContent = `$${totals.total.toFixed(2)}`;
}

// Display checkout order summary
function displayCheckoutSummary() {
    const cart = getCart();
    const summaryItemsContainer = document.getElementById('summary-items');
    
    if (!summaryItemsContainer) return;

    let html = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="summary-item-row">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    summaryItemsContainer.innerHTML = html;
    updateCartTotals();
}

// Clear cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}