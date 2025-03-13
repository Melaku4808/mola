const products = [
  { id: 1, name: "Borehole Drill", price: 100000, description: "Long-lasting durability drilling machine.", image: "borholedrill.jpeg", category: "Machines" },
  { id: 2, name: "Solar Well Pump", price: 999.99, description: "Affordable and reliable.", image: "images.jpeg", category: "Pumps" },
  { id: 3, name: "Solar Panel", price: 199.99, description: "Long Durability Time.", image: "solar panel.jpg", category: "Electronics" },
  { id: 4, name: "Solar Street Pole", price: 899.99, description: "Includes new Technologies.", image: "solar street pole.jpeg", category: "Lighting" },
  { id: 5, name: "Water Pump", price: 1000.99, description: "Long-lasting durability.", image: "water pump.jpeg", category: "Pumps" },
  { id: 6, name: "Adcon Telemetry", price: 1299.99, description: "Good and solves water management Problems.", image: "AdconTelemetry.jpeg", category: "Electronics" }
];

let cart = [];

// Function to render products (either filtered or all)
function renderProducts(filteredProducts = products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = ''; // Clear existing product list

  // Loop through the filtered products array (or all products)
  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    productDiv.setAttribute('role', 'button');
    productDiv.setAttribute('tabindex', '0');
    productDiv.setAttribute('aria-label', `View details for ${product.name}`);
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="viewProductDetails(${product.id})">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(productDiv);
  });
}

// Function to search products by name or category
function searchProducts() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  
  // Filter products by search term (name or category)
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts); // Render the filtered products
}

// Function to show product details in a modal
function viewProductDetails(id) {
  const product = products.find(p => p.id === id);
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-price').textContent = product.price;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-detail-modal').style.display = 'flex';
}

// Close the product detail modal
function closeProductDetail() {
  document.getElementById('product-detail-modal').style.display = 'none';
}

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.id === product.id);

  if (!existingProduct) {
    cart.push(product); // Add the product if it's not already in the cart
  }
  
  updateCart(); // Update cart display
}

// Function to update the cart display
function updateCart() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length; // Update cart item count
  
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = ''; // Clear existing cart items
  let totalPrice = 0;
  
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(listItem);
    totalPrice += item.price; // Add the product price to the total
  });
  
  document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`; // Update total price
}

// Function to clear the cart
function clearCart() {
  cart = []; // Empty the cart array
  updateCart(); // Update cart display
}

// Function to toggle the cart modal visibility
function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

// Function to open the checkout modal
function openCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.style.display = 'flex';
}

// Function to close the checkout modal
function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.style.display = 'none';
}

// Function to validate the checkout form
function validateCheckoutForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  if (!name || !email || !address) {
    alert("Please fill out all fields.");
    return false; // Prevent form submission if fields are empty
  }

  // Simulate successful order
  alert("Order placed successfully!");
  closeCheckoutModal();
  cart = []; // Clear the cart after successful order
  updateCart();
  return false; // Prevent form submission
}

// Initialize by rendering all products by default
window.onload = () => {
  renderProducts(); // This ensures that all products are shown by default when the page loads
};
