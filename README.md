# Online Shop - E-Commerce Website

A modern, responsive e-commerce website built with HTML, CSS, and JavaScript.

## 📋 Features

- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Product Catalog** - Browse 12+ products with images and descriptions
- ✅ **Search & Filter** - Search products by name, filter by category, sort by price
- ✅ **Shopping Cart** - Add/remove items, update quantities
- ✅ **Checkout System** - Complete checkout process with form validation
- ✅ **Local Storage** - Cart and order data persisted in browser
- ✅ **Modern UI** - Clean, professional design with smooth animations
- ✅ **Mobile Friendly** - Optimized navigation and touch-friendly buttons

## 🏗️ Project Structure

```
online-shop/
├── index.html              # Home page
├── products.html           # Products listing page
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout page
├── css/
│   ├── style.css          # Main styles
│   └── responsive.css     # Mobile responsive styles
├── js/
│   ├── main.js            # Main application logic
│   ├── products.js        # Products data and filtering
│   ├── cart.js            # Cart management functions
│   └── checkout.js        # Checkout and payment processing
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)
- Live Server extension (optional, for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ibraheem1109/onlinr-shop.git
   cd onlinr-shop
   ```

2. **Open the project**
   - Using VS Code: Right-click `index.html` → "Open with Live Server"
   - Or simply double-click `index.html` to open in your browser

3. **Start exploring**
   - Open http://localhost:5500 (or your local server URL)
   - Browse products, add items to cart, and checkout

## 📄 Pages Overview

### Home Page (`index.html`)
- Hero section with call-to-action
- Featured products showcase
- Navigation to other pages

### Products Page (`products.html`)
- Full product catalog
- Search functionality
- Filter by category (Electronics, Clothing, Home, Sports)
- Sort options (Price, Name)
- Add to cart buttons

### Cart Page (`cart.html`)
- View all cart items
- Adjust quantities
- Remove items
- Order summary with taxes and shipping
- Proceed to checkout button

### Checkout Page (`checkout.html`)
- Billing information form
- Shipping address form
- Payment information form
- Order summary
- Form validation and order placement

## 🛒 Products Included

1. Wireless Headphones - $79.99
2. Smart Watch - $199.99
3. Laptop Stand - $34.99
4. USB-C Cable - $12.99
5. Yoga Mat - $29.99
6. Coffee Mug - $14.99
7. Running Shoes - $89.99
8. T-Shirt - $19.99
9. Desk Lamp - $44.99
10. Jeans - $59.99
11. Backpack - $49.99
12. Phone Case - $16.99

## 💻 Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - No frameworks or dependencies
- **Local Storage API** - Client-side data persistence

## 🎨 Styling Features

- Clean, modern color scheme
- Smooth animations and transitions
- Fully responsive grid layouts
- Mobile-first design approach
- Professional typography

## 🔧 JavaScript Functions

### Products (`js/products.js`)
- `renderProductCard()` - Creates product card HTML
- `displayProducts()` - Renders products to the page
- `getFeaturedProducts()` - Gets first 6 products
- `filterProducts()` - Filters and sorts products
- `getProductById()` - Retrieves single product

### Cart (`js/cart.js`)
- `getCart()` - Retrieves cart from localStorage
- `saveCart()` - Saves cart to localStorage
- `addToCart()` - Adds item to cart
- `removeFromCart()` - Removes item from cart
- `updateQuantity()` - Updates item quantity
- `calculateTotals()` - Calculates order totals
- `displayCart()` - Renders cart items

### Checkout (`js/checkout.js`)
- `validateForm()` - Validates checkout form
- `processCheckout()` - Processes the order
- `generateOrderNumber()` - Creates unique order ID

### Main (`js/main.js`)
- `setupFilters()` - Initializes filter functionality
- `showNotification()` - Displays alert messages
- `viewProduct()` - Handles product viewing

## 💾 Data Storage

The application uses browser's Local Storage API:
- **Cart data** - Stored in `cart` key
- **Order data** - Stored in `orders` key
- **Data persists** - Even after closing the browser

## 🧪 Testing the Site

1. **Add to Cart**
   - Click "Add to Cart" on any product
   - Check the cart count in the header

2. **Search Products**
   - Type in the search box
   - Products filter in real-time

3. **Filter by Category**
   - Select a category
   - Only matching products display

4. **Checkout Process**
   - Add items to cart
   - Go to Cart page
   - Click "Proceed to Checkout"
   - Fill in all required fields
   - Click "Place Order"

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multiple payment methods
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
- [ ] Social media integration

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **Ibraheem1109**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@onlineshop.com or open an issue in the repository.

---

**Happy Shopping! 🛍️**