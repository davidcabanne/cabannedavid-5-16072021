(function () {
  updateCartNotification();
  displayCart();
})();

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  const cartTemplateContainer = document.getElementById(
    "section__cartPage--templateContainer"
  );
  cartTemplateContainer.innerHTML = "";

  cartBagItems(cart);

  if (cart.length === 0) {
    //
    // create a section for Empty cart
    // console.log(cart);
    console.log("the cart is empty");

    renderEmptyBagNotification();
  }

  if (cart.length > 0) {
    // console.log(cart);
    console.log("the cart has some items");

    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];

      const cartItemNode = renderItem(cartItem, cart, i);
      cartTemplateContainer.appendChild(cartItemNode);
    }
  }
}

function cartBagItems(cart) {
  const cartBagItems = document.querySelector(".cartPage__NbrOfItem");
  const nbrOfBagItems = cart.length;
  if (nbrOfBagItems === 0) {
    cartBagItems.innerHTML = `${nbrOfBagItems} item`;
  }
  if (nbrOfBagItems === 1) {
    cartBagItems.innerHTML = `${nbrOfBagItems} item`;
  }
  if (nbrOfBagItems > 1) {
    cartBagItems.innerHTML = `${nbrOfBagItems} items`;
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

  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const price = node.querySelector(".cartItem__price");
  price.innerHTML = currencyFormatter.format(cartItem.articlePrice / 100);

  const removeBtn = node.querySelector(".cartItem__btn--remove");
  removeBtn.dataset.index = index;

  removeBtn.addEventListener("click", function (e) {
    handleRemoveFromCart(e, cart);
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
