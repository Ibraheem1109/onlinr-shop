// Checkout Functionality

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }

    // Display checkout summary on page load
    displayCheckoutSummary();
});

// Validate form
function validateForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return true;

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value.trim();
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Basic validation
    if (!firstName || !lastName || !email || !phone) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }

    if (!address || !city || !state || !zip || !country) {
        showNotification('Please complete the shipping address', 'error');
        return false;
    }

    if (!cardName || !cardNumber || !expiry || !cvv) {
        showNotification('Please fill in all payment details', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Card number validation (simple check - 13-19 digits)
    const cardNumberClean = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cardNumberClean)) {
        showNotification('Please enter a valid card number', 'error');
        return false;
    }

    // Expiry validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        showNotification('Expiry date must be in MM/YY format', 'error');
        return false;
    }

    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
        showNotification('Please enter a valid CVV', 'error');
        return false;
    }

    return true;
}

// Process checkout
function processCheckout() {
    if (!validateForm()) {
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // Simulate payment processing
    const processButton = document.querySelector('button[type="submit"]');
    const originalText = processButton.textContent;
    processButton.disabled = true;
    processButton.textContent = 'Processing...';

    setTimeout(() => {
        // Simulate successful payment
        const order = {
            orderNumber: generateOrderNumber(),
            date: new Date().toLocaleDateString(),
            items: cart,
            totals: calculateTotals(),
            customer: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
                country: document.getElementById('country').value
            }
        };

        // Save order to localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        clearCart();

        // Show success message
        showNotification('Order placed successfully!', 'success');

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

        processButton.disabled = false;
        processButton.textContent = originalText;
    }, 2000);
}

// Generate order number
function generateOrderNumber() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i += 4) {
                formattedValue += value.slice(i, i + 4) + ' ';
            }
            e.target.value = formattedValue.trim();
        });
    }

    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }
});