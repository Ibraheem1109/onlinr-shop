// Sample Products Database
const PRODUCTS = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        category: "electronics",
        description: "High-quality wireless headphones with noise cancellation",
        image: "🎧",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        description: "Feature-rich smartwatch with health tracking",
        image: "⌚",
        rating: 4.3,
        reviews: 95
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 34.99,
        category: "home",
        description: "Ergonomic aluminum laptop stand",
        image: "💻",
        rating: 4.7,
        reviews: 203
    },
    {
        id: 4,
        name: "USB-C Cable",
        price: 12.99,
        category: "electronics",
        description: "Durable 6ft USB-C charging cable",
        image: "🔌",
        rating: 4.4,
        reviews: 542
    },
    {
        id: 5,
        name: "Yoga Mat",
        price: 29.99,
        category: "sports",
        description: "Non-slip yoga mat with carrying strap",
        image: "🧘",
        rating: 4.6,
        reviews: 156
    },
    {
        id: 6,
        name: "Coffee Mug",
        price: 14.99,
        category: "home",
        description: "Premium stainless steel coffee mug",
        image: "☕",
        rating: 4.2,
        reviews: 89
    },
    {
        id: 7,
        name: "Running Shoes",
        price: 89.99,
        category: "sports",
        description: "Comfortable running shoes with cushioning",
        image: "👟",
        rating: 4.5,
        reviews: 234
    },
    {
        id: 8,
        name: "T-Shirt",
        price: 19.99,
        category: "clothing",
        description: "Comfortable 100% cotton t-shirt",
        image: "👕",
        rating: 4.3,
        reviews: 178
    },
    {
        id: 9,
        name: "Desk Lamp",
        price: 44.99,
        category: "home",
        description: "LED desk lamp with adjustable brightness",
        image: "💡",
        rating: 4.4,
        reviews: 112
    },
    {
        id: 10,
        name: "Jeans",
        price: 59.99,
        category: "clothing",
        description: "Classic blue jeans with perfect fit",
        image: "👖",
        rating: 4.5,
        reviews: 267
    },
    {
        id: 11,
        name: "Backpack",
        price: 49.99,
        category: "clothing",
        description: "Durable backpack with multiple compartments",
        image: "🎒",
        rating: 4.4,
        reviews: 198
    },
    {
        id: 12,
        name: "Phone Case",
        price: 16.99,
        category: "electronics",
        description: "Protective phone case with premium material",
        image: "📱",
        rating: 4.3,
        reviews: 421
    }
];

// Function to render product card
function renderProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">⭐ ${product.rating} (${product.reviews} reviews)</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-secondary btn-small" onclick="viewProduct(${product.id})">View</button>
                </div>
            </div>
        </div>
    `;
}

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('products-grid') || document.getElementById('featured-products');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found.</p>';
        return;
    }

    container.innerHTML = products.map(product => renderProductCard(product)).join('');
}

// Function to get featured products (first 6)
function getFeaturedProducts() {
    return PRODUCTS.slice(0, 6);
}

// Function to filter products
function filterProducts(searchTerm, category, sortBy) {
    let filtered = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });

    // Sort products
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
}

// Function to get product by ID
function getProductById(id) {
    return PRODUCTS.find(product => product.id === id);
}