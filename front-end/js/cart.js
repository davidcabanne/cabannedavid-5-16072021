(function () {
  updateCartNotification();
  displayCart();
})();

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const totalPriceContainer = document.querySelector(
    ".cartPage__totalCheckout--price"
  );

  // disable <checkout> if cart is empty
  disableCheckout(cart);

  if (cart === null) {
    cart = [];

    totalPriceContainer.innerHTML = "0 €";
  }

  const cartTemplateContainer = document.getElementById(
    "section__cartPage--templateContainer"
  );
  cartTemplateContainer.innerHTML = "";

  cartBagItems(cart);

  if (cart.length === 0) {
    //
    // create a section for Empty cart
    console.log("the cart is empty");

    renderEmptyBagNotification();

    totalPriceContainer.innerHTML = "0 €";
  }

  if (cart.length > 0) {
    console.log("the cart has some items");

    const totalPricesArray = [];

    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];

      const cartItemNode = renderItem(cartItem, cart, i);
      cartTemplateContainer.appendChild(cartItemNode);

      const cartPrices = cart[i].articlePrice * cart[i].quantity;

      totalPricesArray.push(cartPrices);
    }

    totalPriceReducer(totalPriceContainer, totalPricesArray);
  }
}

function cartBagItems(cart) {
  const cartBagItems = document.querySelector(".cartPage__NbrOfItem");

  const totalQtyArray = [];

  for (let i = 0; i < cart.length; i++) {
    let itemsQties = cart[i].quantity;
    itemsQties = parseInt(itemsQties, 10);

    totalQtyArray.push(itemsQties);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalItemsReduced = totalQtyArray.reduce(reducer, 0);

  // front-end implementation
  if (totalItemsReduced === 0) {
    cartBagItems.innerHTML = `${totalItemsReduced} item`;
  }
  if (totalItemsReduced === 1) {
    cartBagItems.innerHTML = `${totalItemsReduced} item`;
  }
  if (totalItemsReduced > 1) {
    cartBagItems.innerHTML = `${totalItemsReduced} items`;
  }
}

function renderEmptyBagNotification() {
  const emptyCartNotificationContainer = document.querySelector(
    ".emptyCartNotificationContainer"
  );
  emptyCartNotificationContainer.innerHTML = "";
  createDiv = document.createElement("div");
  emptyCartNotificationContainer.appendChild(createDiv);
  createDiv.classList.add("emptyCartNotification__content");
  emptyCartNotificationContainer.classList.remove(
    "emptyCartNotificationContainer--disabled"
  );
  createDiv.innerText = "It looks like your bag is empty!";
}

function renderItem(cartItem, cart, index) {
  const template = document.getElementById("Template__cartItem");
  const node = document.importNode(template.content, true);

  const img = node.querySelector(".cartItem__img img");
  img.setAttribute("src", cartItem.articleImg);

  const cartItemName = node.querySelector(".cartItem__name");
  cartItemName.textContent = cartItem.articleName;

  const cartItemLensOpt = node.querySelector(".cartItem__option--selectOpt");
  cartItemLensOpt.textContent = cartItem.lensOption;

  // Qty selection
  let defaultQty = cartItem.quantity;
  let qtySelected = node.querySelectorAll("option");
  let i = 1;

  for (let option of qtySelected) {
    if (i == defaultQty) {
      option.setAttribute("selected", "true");
    }
    i++;
  }

  const cartItemQtyContainer = node.querySelector(".cartItem__qty--select");
  cartItemQtyContainer.dataset.indexNumber = index;

  cartItemQtyContainer.addEventListener("change", function (e) {
    handleQtyCart(e, cart, cartItemQtyContainer);
  });

  // Price formatter & result
  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const price = node.querySelector(".cartItem__price");
  const priceResult = cartItem.articlePrice * cartItem.quantity;
  price.innerHTML = currencyFormatter.format(priceResult / 100);

  // Remove Item <btn>
  const removeBtn = node.querySelector(".cartItem__btn--remove");
  removeBtn.dataset.index = index;

  removeBtn.addEventListener("click", function (e) {
    handleRemoveFromCart(e, cart);
  });

  // Clear Cart <cta>
  const clearCartBtn = document.querySelector(".cartPage__btn--cleartCart");

  clearCartBtn.addEventListener("click", function (e) {
    handleClearCartCta(e);
  });

  return node;
}

// handle clicks on button remove

function handleRemoveFromCart(e, cart) {
  e.preventDefault();

  const itemIndex = e.target.dataset.index;

  removeFromCart(itemIndex);
  updateCartNotification();
  displayCart();

  return;
}

function removeFromCart(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  cart.splice(itemIndex, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
}

function totalPriceReducer(totalPriceContainer, totalPricesArray) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = totalPricesArray.reduce(reducer, 0);

  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  totalPriceContainer.innerHTML = currencyFormatter.format(totalPrice / 100);

  return;
}

// **** Quantity section **** //

function handleQtyCart(e, cart, cartItemQtyContainer) {
  e.preventDefault();

  const qtyIndex = e.target.dataset.indexNumber;

  changeItemQuantity(qtyIndex, cartItemQtyContainer);
  disableCheckout();
  displayCart();

  return;
}

function changeItemQuantity(qtyIndex, cartItemQtyContainer) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  cart[qtyIndex].quantity = cartItemQtyContainer.value;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function handleClearCartCta(e) {
  e.preventDefault();

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartNotification();
  displayCart();

  return;
}

function disableCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const btnCheckoutLink = document.querySelector(
    ".cartPage__btn--checkout-link"
  );
  const btnCheckoutContainer = document.querySelector(
    ".cartPage__btn--checkout"
  );

  if (cart.length === 0) {
    btnCheckoutLink.classList.remove("cartPage__btn--checkout-link--enabled");
    btnCheckoutContainer.classList.remove("cartPage__btn--checkout--enabled");
  }

  if (cart.length > 0) {
    btnCheckoutLink.classList.add("cartPage__btn--checkout-link--enabled");
    btnCheckoutContainer.classList.add("cartPage__btn--checkout--enabled");
  }
}
