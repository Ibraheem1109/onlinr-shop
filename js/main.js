function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.zIndex = '999';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing!', 'success');
            form.reset();
        }
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function trackPageView() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    console.log(`Page view: ${page}`);
}

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

function checkCartAndCheckout() {
    const cart = getCart();
    const checkoutBtn = document.getElementById('checkout-btn');

    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = 'Cart is Empty';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Proceed to Checkout';
        }
    }
}

function setupModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

function setupNetworkDetection() {
    window.addEventListener('online', () => {
        showNotification('You are back online!', 'success');
    });

    window.addEventListener('offline', () => {
        showNotification('You are offline. Changes will be saved locally.', 'error');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupSmoothScroll();
    setupNewsletterForm();
    setupModals();
    setupNetworkDetection();
    trackPageView();
    checkCartAndCheckout();

    updateCartCount();
});

window.addEventListener('beforeunload', () => {
    const cart = getCart();
    if (cart.length > 0) {
        console.log('Cart saved with', cart.length, 'items');
    }
});

window.formatCurrency = formatCurrency;
window.showNotification = showNotification;
window.getCart = getCart;
window.updateCartCount = updateCartCount;