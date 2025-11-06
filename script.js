// Simple cart array to store selected items
let cart = [];

// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Loop through each button and attach click event
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.getAttribute('data-name');
    const itemPrice = parseInt(button.getAttribute('data-price'));

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCartDisplay();
  });
});

// Function to show cart contents
function updateCartDisplay() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = ''; // Clear old list

  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  const cartList = document.createElement('ul');

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} — ₹${item.price * item.quantity}`;
    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement('p');
  totalDiv.innerHTML = `<strong>Total: ₹${total}</strong>`;

  cartDiv.appendChild(cartList);
  cartDiv.appendChild(totalDiv);
}
