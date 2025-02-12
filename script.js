document.addEventListener("DOMContentLoaded", function () {
  // Improved Add to Cart Functionality
  var addToCartButton = document.getElementById("adCardButton");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Option 2b: Prevent further click events

      var productName = document.querySelector(".single-pro-details h4").innerText.trim();
      var productPriceText = document.getElementById("adPrice").innerText.trim();
      var productQuantityInput = document.getElementById("quantity");

      // Error Handling for Quantity
      if (!productQuantityInput || isNaN(productQuantityInput.value) || productQuantityInput.value <= 0) {
        alert("Please enter a valid quantity (greater than 0).");
        return;
      }

      var productPrice = parseFloat(productPriceText);
      var productQuantity = parseInt(productQuantityInput.value);

      if (isNaN(productPrice) || isNaN(productQuantity)) {
        alert("Invalid product price or quantity. Please check your inputs.");
        return;
      }

      var subtotal = productPrice * productQuantity;

      var cartItem = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        subtotal: subtotal
      };

      // Efficient Cart Item Management (Optional check)
      var cartItems = getCartItemsFromStorage() || [];
      var existingItem = cartItems.find(function(item) {
        return item.name === productName;
      });

      if (!existingItem) {
        cartItems.push(cartItem);
      } else {
        console.warn("Item already exists in the cart.");
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      window.location.href = "cart.html";

      // Option 1a: Disable button temporarily
      // this.disabled = true;
    });
  } else {
    console.warn("addToCartButton element not found. Add to Cart functionality disabled.");
  }

  // Enhanced Cart Item Removal
  var cartItemsContainer = document.getElementById('cart-items');
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-item')) {
        var row = event.target.closest('tr');
        if (row) {
          var itemId = row.id;
        } else {
          console.warn("Could not find row element for removal.");
          return;
        }

        var cartItems = getCartItemsFromStorage();
        cartItems = cartItems.filter(function (item) {
          return item.name !== itemId;
        });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        row.remove();
      }
    });
  } else {
    console.warn("cart-items element not found. Cart item removal functionality disabled.");
  }
});

// Helper Function for Cart Items
function getCartItemsFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch (error) {
    console.warn("Error parsing cart items from localStorage:", error);
    return [];
  }
}

var  l=document.getElementsByClassName('pro');
for(let i=0;i<l.length;i++)
{
    l[i].addEventListener("click",()=>{navigateProduct(i)})
}
const navigateProduct = (i)=>{
    let productcontainer=document.getElementsByClassName('pro');
    let htag=productcontainer[i].getElementsByTagName('h5')[0].innerHTML;
    var data={'htag':htag}
    let encodeuri=Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
    window.location.href="sproduct.html?"+encodeuri;
}
