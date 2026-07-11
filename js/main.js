// Main Application Logic

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load featured products on home page
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        const featured = getFeaturedProducts();
        displayProducts(featured);
    }

    // Load all products on products page
    const productsGridContainer = document.getElementById('products-grid');
    if (productsGridContainer) {
        displayProducts(PRODUCTS);
    }

    // Display cart on cart page
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        displayCart();
    }

    // Setup filters on products page
    setupFilters();
});

// Setup filter functionality
function setupFilters() {
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (!searchInput || !categoryFilter || !sortFilter) return;

    function applyFilters() {
        const searchTerm = searchInput.value;
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;

        const filtered = filterProducts(searchTerm, category, sortBy);
        displayProducts(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
}

// Show notification
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.minWidth = '300px';

    document.body.appendChild(alertDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// View product (can be expanded to show product details page)
function viewProduct(productId) {
    const product = getProductById(productId);
    if (product) {
        // For now, just show a notification
        // In a real app, you could navigate to a product details page
        showNotification(`Viewing ${product.name}`, 'info');
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Log application version
console.log('Online Shop v1.0 loaded successfully');