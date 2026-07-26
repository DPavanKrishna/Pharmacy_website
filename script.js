// Script.js - A2Z Pharmacy Interactive Logic

document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  initAddToCartButtons();
  initCartPage();
  initSearchAndFilter();
});

// Helper: Toast Notification
function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  
  const icon = type === "success" ? '<i class="fas fa-check-circle" style="color: #10B981;"></i>' : '<i class="fas fa-exclamation-circle" style="color: #EF4444;"></i>';
  toast.innerHTML = `${icon} <span>${message}</span>`;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Get Cart Items from LocalStorage
function getCartItemsFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
}

// Save Cart Items
function saveCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
  updateCartBadge();
}

// Update Cart Badge Counter in Navigation
function updateCartBadge() {
  const items = getCartItemsFromStorage();
  const totalCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(badge => {
    badge.innerText = totalCount;
    badge.style.display = totalCount > 0 ? "flex" : "none";
  });
}

// Add Item to Cart
function addToCart(product) {
  let items = getCartItemsFromStorage();
  const existingIndex = items.findIndex(item => item.name === product.name);
  
  if (existingIndex > -1) {
    items[existingIndex].quantity += product.quantity || 1;
    items[existingIndex].subtotal = items[existingIndex].quantity * items[existingIndex].price;
  } else {
    items.push({
      id: product.id || Date.now(),
      name: product.name,
      price: product.price,
      image: product.image || 'imgs/products/napa.svg',
      quantity: product.quantity || 1,
      subtotal: (product.quantity || 1) * product.price
    });
  }
  
  saveCartItems(items);
  showToast(`Added "${product.name}" to cart!`);
}

// Initialize Add to Cart Buttons across catalog
function initAddToCartButtons() {
  document.addEventListener("click", function(e) {
    const btn = e.target.closest(".btn-cart-add");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      
      const proCard = btn.closest(".pro");
      if (proCard) {
        const name = proCard.querySelector("h5")?.innerText.trim() || "Product";
        const priceText = proCard.querySelector(".price")?.innerText.replace(/[^0.0-9]/g, "") || "25";
        const image = proCard.querySelector("img")?.getAttribute("src") || "imgs/products/napa.svg";
        
        addToCart({
          name: name,
          price: parseFloat(priceText) || 25,
          image: image,
          quantity: 1
        });
      }
    }
  });
  
  // Single Product Page Add To Cart button
  const singleAddBtn = document.getElementById("adCardButton");
  if (singleAddBtn) {
    singleAddBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.querySelector(".single-pro-details h4")?.innerText.trim() || "Medicine";
      const priceText = document.getElementById("adPrice")?.innerText.replace(/[^0.0-9]/g, "") || "24";
      const quantityInput = document.getElementById("quantity");
      const qty = parseInt(quantityInput?.value) || 1;
      const img = document.getElementById("MainImg")?.getAttribute("src") || "imgs/products/napa.svg";

      if (qty <= 0) {
        showToast("Please enter a valid quantity", "error");
        return;
      }

      addToCart({
        name: name,
        price: parseFloat(priceText) || 24,
        image: img,
        quantity: qty
      });
    });
  }
}

// Initialize Cart Page
function initCartPage() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;
  
  renderCart();
  
  cartContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-item") || e.target.closest(".remove-item")) {
      const row = e.target.closest("tr");
      const name = row?.getAttribute("data-name");
      if (name) {
        let items = getCartItemsFromStorage();
        items = items.filter(item => item.name !== name);
        saveCartItems(items);
        renderCart();
        showToast("Item removed from cart");
      }
    }
  });
}

// Render Cart Table and Subtotal
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const grandTotalEl = document.getElementById("cart-grandtotal");
  if (!cartContainer) return;
  
  const items = getCartItemsFromStorage();
  
  if (items.length === 0) {
    cartContainer.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.5;"></i>
          <p style="font-size: 1.1rem; font-weight: 600;">Your shopping cart is empty.</p>
          <a href="Shop.html" class="btn-primary" style="margin-top: 16px; padding: 10px 24px;">Explore Pharmacy Shop</a>
        </td>
      </tr>
    `;
    if (subtotalEl) subtotalEl.innerText = "Rs 0.00";
    if (taxEl) taxEl.innerText = "Rs 0.00";
    if (grandTotalEl) grandTotalEl.innerText = "Rs 0.00";
    return;
  }
  
  let html = "";
  let subtotal = 0;
  
  items.forEach(item => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    subtotal += itemTotal;
    
    html += `
      <tr data-name="${item.name}">
        <td><i class="far fa-times-circle remove-item" title="Remove item"></i></td>
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td style="font-weight: 700; color: var(--text-heading);">${item.name}</td>
        <td style="font-weight: 600;">Rs ${item.price.toFixed(2)}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" class="cart-qty-input" 
                 onchange="updateItemQuantity('${item.name}', this.value)" style="width: 70px; text-align: center;">
        </td>
        <td style="font-weight: 800; color: var(--primary);">Rs ${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  });
  
  cartContainer.innerHTML = html;
  
  const tax = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal + tax;
  
  if (subtotalEl) subtotalEl.innerText = `Rs ${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.innerText = `Rs ${tax.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.innerText = `Rs ${grandTotal.toFixed(2)}`;
}

// Update Item Quantity in Cart
window.updateItemQuantity = function(name, newQty) {
  const qty = parseInt(newQty);
  if (isNaN(qty) || qty <= 0) return;
  
  let items = getCartItemsFromStorage();
  const item = items.find(i => i.name === name);
  if (item) {
    item.quantity = qty;
    item.subtotal = item.price * qty;
    saveCartItems(items);
    renderCart();
  }
};

// Search & Category Filter for Shop Page
function initSearchAndFilter() {
  const searchInput = document.getElementById("searchProducts");
  const filterPills = document.querySelectorAll(".filter-pill");
  const products = document.querySelectorAll(".pro-container .pro");

  if (!searchInput && filterPills.length === 0) return;

  function filterCatalog() {
    const query = searchInput?.value.toLowerCase().trim() || "";
    const activeCategory = document.querySelector(".filter-pill.active")?.getAttribute("data-category") || "all";

    products.forEach(product => {
      const title = product.querySelector("h5")?.innerText.toLowerCase() || "";
      const brand = product.querySelector(".brand")?.innerText.toLowerCase() || "";
      const category = product.getAttribute("data-category") || "all";

      const matchesSearch = title.includes(query) || brand.includes(query);
      const matchesCategory = activeCategory === "all" || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterCatalog);
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", function() {
      filterPills.forEach(p => p.classList.remove("active"));
      this.classList.add("active");
      filterCatalog();
    });
  });
}

