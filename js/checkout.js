const validators = {
    firstName: (value) => value.trim().length >= 2,
    lastName: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^\d{10,}$/.test(value.replace(/\D/g, '')),
    address: (value) => value.trim().length >= 5,
    city: (value) => value.trim().length >= 2,
    state: (value) => value.trim().length >= 2,
    zip: (value) => /^\d{5,}/.test(value.trim()),
    country: (value) => value.trim().length >= 2,
    cardName: (value) => value.trim().length >= 3,
    cardNumber: (value) => /^\d{13,19}$/.test(value.replace(/\s/g, '')),
    expiry: (value) => /^\d{2}\/\d{2}$/.test(value),
    cvv: (value) => /^\d{3,4}$/.test(value)
};

const errorMessages = {
    firstName: 'First name must be at least 2 characters',
    lastName: 'Last name must be at least 2 characters',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    address: 'Please enter a valid street address',
    city: 'City must be at least 2 characters',
    state: 'State must be at least 2 characters',
    zip: 'Please enter a valid zip/postal code',
    country: 'Country must be at least 2 characters',
    cardName: 'Cardholder name must be at least 3 characters',
    cardNumber: 'Please enter a valid card number',
    expiry: 'Please use MM/YY format',
    cvv: 'Please enter a valid CVV'
};

function validateField(fieldName, value) {
    if (!validators[fieldName]) return true;
    return validators[fieldName](value);
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorEl = field ? field.parentElement.querySelector('.error-message') : null;

    if (field && errorEl) {
        field.classList.add('error');
        errorEl.textContent = message;
    }
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorEl = field ? field.parentElement.querySelector('.error-message') : null;

    if (field && errorEl) {
        field.classList.remove('error');
        errorEl.textContent = '';
    }
}

function validateForm() {
    let isValid = true;
    const fieldNames = [
        'firstName', 'lastName', 'email', 'phone',
        'address', 'city', 'state', 'zip', 'country',
        'cardName', 'cardNumber', 'expiry', 'cvv'
    ];

    fieldNames.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            const value = field.value;
            if (!validateField(fieldName, value)) {
                showFieldError(fieldName, errorMessages[fieldName]);
                isValid = false;
            } else {
                clearFieldError(fieldName);
            }
        }
    });

    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    if (termsCheckbox && !termsCheckbox.checked) {
        if (termsError) {
            termsError.textContent = 'You must agree to the terms and conditions';
        }
        isValid = false;
    } else if (termsError) {
        termsError.textContent = '';
    }

    return isValid;
}

function generateOrderNumber() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

function processCheckout(formData) {
    const orderNumber = generateOrderNumber();
    const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        items: getCart(),
        totals: calculateTotals(),
        shipping: formData,
        status: 'confirmed'
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('cart');
    updateCartCount();

    const modal = document.getElementById('successModal');
    const orderNumberEl = document.getElementById('orderNumber');

    if (modal && orderNumberEl) {
        orderNumberEl.textContent = orderNumber;
        modal.style.display = 'flex';
    }

    return orderNumber;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!validateField(input.id, input.value)) {
                showFieldError(input.id, errorMessages[input.id]);
            } else {
                clearFieldError(input.id);
            }
        });

        input.addEventListener('focus', () => {
            clearFieldError(input.id);
        });
    });

    const cardNumberField = document.getElementById('cardNumber');
    if (cardNumberField) {
        cardNumberField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formatted;
        });
    }

    const expiryField = document.getElementById('expiry');
    if (expiryField) {
        expiryField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
                country: document.getElementById('country').value
            };

            processCheckout(formData);
        } else {
            showNotification('Please fix the errors in the form', 'error');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupCheckoutForm();
});