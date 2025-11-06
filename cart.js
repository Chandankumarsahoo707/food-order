// 🛒 Load and display cart items
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  const placeOrderBtn = document.getElementById("place-order");
  const clearBtn = document.getElementById("clear-cart");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalDiv.textContent = "";
    placeOrderBtn.style.display = "none";
    clearBtn.style.display = "none";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <h4>${item.name}</h4>
      <div class="cart-controls">
        <button class="qty-btn decrease" data-index="${index}">−</button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn increase" data-index="${index}">+</button>
      </div>
      <p class="price">₹${item.price * item.quantity}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalDiv.textContent = `Total: ₹${total}`;

  // Show buttons when cart has items
  placeOrderBtn.style.display = "inline-block";
  clearBtn.style.display = "inline-block";

  attachCartEvents();
}

// ➕➖ Handle quantity and remove buttons
function attachCartEvents() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Increase quantity
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });

  // Decrease quantity
  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });

  // Remove item
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });
}

// 🧹 Clear all items
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
});

// ✅ Place Order button
document.getElementById("place-order").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orderSummary = "🧾 Your Order:\n\n";
  let total = 0;

  cart.forEach(item => {
    orderSummary += `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    total += item.price * item.quantity;
  });

  orderSummary += `\nTotal Amount: ₹${total}\n\nThank you for your order! 🍽️`;

  alert(orderSummary);

  // Clear cart after order placed
  localStorage.removeItem("cart");
  loadCart();
});

// Load cart initially
loadCart();
