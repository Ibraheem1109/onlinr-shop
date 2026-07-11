// Products Database
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        category: 'Electronics',
        description: 'Premium wireless headphones with noise cancellation',
        icon: '🎧'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        category: 'Electronics',
        description: 'Advanced smartwatch with health tracking features',
        icon: '⌚'
    },
    {
        id: 3,
        name: 'Laptop Stand',
        price: 34.99,
        category: 'Home',
        description: 'Adjustable laptop stand for better ergonomics',
        icon: '💻'
    },
    {
        id: 4,
        name: 'USB-C Cable',
        price: 12.99,
        category: 'Electronics',
        description: 'High-speed USB-C charging and data cable',
        icon: '🔌'
    },
    {
        id: 5,
        name: 'Yoga Mat',
        price: 29.99,
        category: 'Sports',
        description: 'Non-slip yoga mat for workouts and fitness',
        icon: '🧘'
    },
    {
        id: 6,
        name: 'Coffee Mug',
        price: 14.99,
        category: 'Home',
        description: 'Ceramic coffee mug with heat-resistant design',
        icon: '☕'
    },
    {
        id: 7,
        name: 'Running Shoes',
        price: 89.99,
        category: 'Sports',
        description: 'Comfortable running shoes with cushioned sole',
        icon: '👟'
    },
    {
        id: 8,
        name: 'T-Shirt',
        price: 19.99,
        category: 'Clothing',
        description: 'Premium cotton t-shirt in various colors',
        icon: '👕'
    },
    {
        id: 9,
        name: 'Desk Lamp',
        price: 44.99,
        category: 'Home',
        description: 'LED desk lamp with adjustable brightness',
        icon: '💡'
    },
    {
        id: 10,
        name: 'Jeans',
        price: 59.99,
        category: 'Clothing',
        description: 'Classic denim jeans with comfortable fit',
        icon: '👖'
    },
    {
        id: 11,
        name: 'Backpack',
        price: 49.99,
        category: 'Home',
        description: 'Durable backpack with multiple compartments',
        icon: '🎒'
    },
    {
        id: 12,
        name: 'Phone Case',
        price: 16.99,
        category: 'Electronics',
        description: 'Protective phone case with stylish design',
        icon: '📱'
    }
];

function getAllProducts() {
    return products;
}

function getFeaturedProducts() {
    return products.slice(0, 6);
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function renderProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function displayFeaturedProducts() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const featured = getFeaturedProducts();
    container.innerHTML = featured.map(product => renderProductCard(product)).join('');
}

function displayAllProducts(productsToShow = getAllProducts()) {
    const container = document.getElementById('products-grid');
    const noProducts = document.getElementById('no-products');
    const productCount = document.getElementById('productCount');

    if (!container) return;

    if (productsToShow.length === 0) {
        container.innerHTML = '';
        noProducts.style.display = 'block';
    } else {
        container.innerHTML = productsToShow.map(product => renderProductCard(product)).join('');
        noProducts.style.display = 'none';
    }

    productCount.textContent = productsToShow.length;
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter:checked');
    const priceRange = document.getElementById('priceRange');
    const sortSelect = document.getElementById('sortSelect');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategories = Array.from(categoryFilters).map(input => input.value);
    const maxPrice = priceRange ? parseFloat(priceRange.value) : 500;

    let filtered = getAllProducts().filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategories.includes('all') || selectedCategories.includes(product.category);
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch(sortValue) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }

    displayAllProducts(filtered);
}

function clearAllFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceRange = document.getElementById('priceRange');
    const sortSelect = document.getElementById('sortSelect');

    if (searchInput) searchInput.value = '';
    
    categoryFilters.forEach(input => {
        input.checked = input.value === 'all';
    });

    if (priceRange) priceRange.value = 500;
    if (sortSelect) sortSelect.value = 'default';

    filterProducts();
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceRange = document.getElementById('priceRange');
    const sortSelect = document.getElementById('sortSelect');
    const priceValue = document.getElementById('priceValue');

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            const allFilter = document.querySelector('input[value="all"]');
            if (filter.value === 'all') {
                categoryFilters.forEach(f => f.checked = filter.checked);
            } else {
                allFilter.checked = false;
            }
            filterProducts();
        });
    });

    if (priceRange) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = priceRange.value;
            filterProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }

    displayAllProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    setupFilters();
});