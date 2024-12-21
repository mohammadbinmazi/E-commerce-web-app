// This ensures the JavaScript code runs only after the DOM is fully loaded. It prevents issues where the script tries to access elements that don’t exist yet.
document.addEventListener("DOMContentLoaded", () => {
  // product details will be stored here
  const products = [
    { id: 1, name: "product 1", price: 29.99 },
    { id: 2, name: "product 2", price: 19.99 },
    { id: 3, name: "product 3", price: 59.99 },
  ];
  // html element get through there id and assign to variable,local storage used to store cart

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");
  const removeLastBtn = document.getElementById("remove-last-btn");

  // this used to create html list with button in productlist dynamically through loop

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });
  // this is a button add to cart which add product in cart which iterate through product id and it use target event to click on button
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart(product);
      }
    }
  });
  // this function help to add the product add in the cart array
  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
  // the savecart function help to add cart items in local storage and help for persistent of webpage

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  // it do four functionality clear the cart display also help to show the message it is empty or not iterate through cart to display product and total the all prices.
  function renderCart() {
    cartItems.innerText = "";
    let total_price = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item) => {
        total_price += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}

        `;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `${total_price.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "$0.00";
    }
  }
  // it help to remove the last element from the product
  if (removeLastBtn) {
    removeLastBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        cart.pop();
        saveCart();
        renderCart();
      } else {
        alert("The cart is already empty");
      }
    });
  }
  // it clear the all the cart and remove all details

  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", () => {
      cart.length = 0;
      saveCart();
      renderCart();
      alert("check out succesfully");
    });
  }
  renderCart();
});
