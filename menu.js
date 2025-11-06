// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));

    // Get existing cart or create new
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Simple confirmation
    alert(`${name} added to cart 🛒`);
  });
});
