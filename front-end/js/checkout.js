(function () {
  updateCartNotification();
  displayCart();

  const btnSendForm = document.querySelector(".checkoutForm__btn");

  btnSendForm.addEventListener("click", handleClickCheckout);

  // fetches localStorage content, injects into each form input
  let formValues = JSON.parse(localStorage.getItem("formValues"));

  if (formValues !== null) {
    document.querySelector("#inputFirstName").value = formValues.firstName;
    document.querySelector("#inputLastName").value = formValues.lastName;
    document.querySelector("#inputAddress").value = formValues.address;
    document.querySelector("#inputCity").value = formValues.city;
    document.querySelector("#inputEmail").value = formValues.email;
  }
})();

// - - - - -  CHECKOUT FORM starts here  - - - - - //

function handleClickCheckout(e) {
  e.preventDefault();

  // fetches checkout form values from input
  const formValues = {
    firstName: document.querySelector("#inputFirstName").value,
    lastName: document.querySelector("#inputLastName").value,
    address: document.querySelector("#inputAddress").value,
    city: document.querySelector("#inputCity").value,
    email: document.querySelector("#inputEmail").value,
  };

  const formIsValid = validateForm(formValues);

  if (formIsValid === true) {
    // 1_ sends object <formValues> => to localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));

    // 2_ if all inputs are approved by Regex, then submits values => to API
    submitToApi(formValues);
  } else {
    // 3_ if form is invalid => alert user
    displayErr();
  }
}

function validateForm(formValues) {
  // handles approval of form before sending in localStorage
  if (
    firstNameControlInput(formValues.firstName) &&
    lastNameControlInput(formValues.lastName) &&
    addressControlInput(formValues.address) &&
    cityControlInput(formValues.city) &&
    emailControlInput(formValues.email)
  ) {
    return true;
  } else {
    return false;
  }
}

// Form control inputs & approval
function firstNameControlInput(firstName) {
  if (regExNameCity(firstName)) {
    requiredTextRemove("requiredInfo__firstName");
    requiredBorderFailureRemove("inputFirstName");
    requiredBorderSuccessAdd("inputFirstName");
    return true;
  } else {
    requiredTextAdd("requiredInfo__firstName");
    requiredBorderFailureAdd("inputFirstName");
    requiredBorderSuccessRemove("inputFirstName");
    return false;
  }
}

function lastNameControlInput(lastName) {
  if (regExNameCity(lastName)) {
    requiredTextRemove("requiredInfo__lastName");
    requiredBorderFailureRemove("inputLastName");
    requiredBorderSuccessAdd("inputLastName");
    return true;
  } else {
    requiredTextAdd("requiredInfo__lastName");
    requiredBorderFailureAdd("inputLastName");
    requiredBorderSuccessRemove("inputLastName");
    return false;
  }
}

function addressControlInput(address) {
  if (regExAddress(address)) {
    requiredTextRemove("requiredInfo__address");
    requiredBorderFailureRemove("inputAddress");
    requiredBorderSuccessAdd("inputAddress");
    return true;
  } else {
    requiredTextAdd("requiredInfo__address");
    requiredBorderFailureAdd("inputAddress");
    requiredBorderSuccessRemove("inputAddress");
    return false;
  }
}

function cityControlInput(city) {
  if (regExNameCity(city)) {
    requiredTextRemove("requiredInfo__city");
    requiredBorderFailureRemove("inputCity");
    requiredBorderSuccessAdd("inputCity");
    return true;
  } else {
    requiredTextAdd("requiredInfo__city");
    requiredBorderFailureAdd("inputCity");
    requiredBorderSuccessRemove("inputCity");
    return false;
  }
}
function emailControlInput(email) {
  if (regExEmail(email)) {
    requiredTextRemove("requiredInfo__email");
    requiredBorderFailureRemove("inputEmail");
    requiredBorderSuccessAdd("inputEmail");
    return true;
  } else {
    requiredTextAdd("requiredInfo__email");
    requiredBorderFailureAdd("inputEmail");
    requiredBorderSuccessRemove("inputEmail");
    return false;
  }
}

// REGEX options
function regExNameCity(value) {
  return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
}
function regExEmail(value) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}
function regExAddress(value) {
  return /^[A-Za-z0-9\s]{5,50}$/.test(value);
}

// required Text functions
function requiredTextRemove(selector) {
  document.querySelector(`.${selector}`).textContent = "";
}
function requiredTextAdd(selector) {
  document.querySelector(`.${selector}`).textContent = "Required";
}
// border Failure
function requiredBorderFailureRemove(selector) {
  document
    .querySelector(`#${selector}`)
    .classList.remove("checkoutForm__required--failure");
}
function requiredBorderFailureAdd(selector) {
  document
    .querySelector(`#${selector}`)
    .classList.add("checkoutForm__required--failure");
}
// border Success
function requiredBorderSuccessRemove(selector) {
  document
    .querySelector(`#${selector}`)
    .classList.remove("checkoutForm__required--success");
}
function requiredBorderSuccessAdd(selector) {
  document
    .querySelector(`#${selector}`)
    .classList.add("checkoutForm__required--success");
}

function submitToApi(contact) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const products = [];

  for (let i = 0; i < cart.length; i++) {
    // const cartItem = cart[i];
    // const cartIdName = cart[i].articleName;
    // const cartIdlens = cart[i].lensOption;
    // const cartIdQty = cart[i].quantity;

    // let productCart = {
    //   productId: cartIdProducts,
    //   productName: cartIdName,
    //   productLens: cartIdlens,
    //   productQty: cartIdQty,
    // };

    products.push(cart[i].articleId);
  }

  let data = {
    contact,
    products,
  };

  var param = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  // Grabs the API's url
  const API_ORDER_URL = "http://localhost:3000/api/cameras/order";

  (async function () {
    const response = await fetch(API_ORDER_URL, param);
    const order = await response.json();
    try {
      const orderIDResponse = order;
      console.log(orderIDResponse);
      displayId(order);
      return orderIDResponse;
    } catch (err) {
      console.error(err);
    }
  })();
}

function displayId(order) {
  const displayIdContainer = document.getElementById("section__displayId");

  const displayIdWrapper = document.createElement("div");
  const displayNotification = document.createElement("div");
  const displayTotalPrice = document.createElement("div");
  const displayId = document.createElement("div");
  const closeDisplayId = document.createElement("div");

  displayIdContainer.appendChild(displayIdWrapper);
  displayIdWrapper.appendChild(displayNotification);
  displayIdWrapper.appendChild(displayTotalPrice);
  displayIdWrapper.appendChild(displayId);
  displayIdWrapper.appendChild(closeDisplayId);

  displayIdWrapper.classList.add("displayId__Wrapper");

  displayNotification.innerHTML = `Thanks <span class="displayId_name">${order.contact.firstName}</span> <span class="displayId_name">${order.contact.lastName}</span>, your order has been successfully processed and you will shortly receive an email from CAM&RAS confirming your transaction!`;
  displayNotification.classList.add("displayId__text");

  // YOYOYOYOYYO
  displayTotalPrice.innerHTML = `Total Price : <span class="displayId__orderId">${order.contact.firstName}</span>`;
  displayTotalPrice.classList.add("displayId__nbr");
  displayTotalPrice.classList.add("displayId__totalPrice");
  // YOYOYOYOYYO
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart.length > 0) {
    const totalPricesOrder = [];

    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];

      const cartPrices = cart[i].articlePrice * cart[i].quantity;

      totalPricesOrder.push(cartPrices);
    }
    totalPriceReducerOrder(totalPricesOrder);
  }
  // YOYOYOYO

  displayId.innerHTML = `Your order ID is:</br> <span class="displayId__orderId">${order.orderId}</span>`;
  displayId.classList.add("displayId__nbr");

  closeDisplayId.innerHTML = `<i class="fas fa-times displayId__exit"></i>`;

  displayIdContainer.classList.add("section__displayId--success");

  closeDisplayId.addEventListener("click", function () {
    const displayIdExitOut = document.querySelector(".displayId__exit");
    displayIdContainer.classList.add("section__displayId--out");
    displayIdExitOut.classList.add("displayId__exit--anim-out");

    setTimeout(function () {
      displayIdContainer.classList.remove("section__displayId--success");
      displayIdContainer.classList.remove("section__displayId--out");
      displayIdExitOut.classList.remove("displayId__exit--anim-out");
    }, 300);
  });
}

function displayErr() {
  const displayIdContainer = document.getElementById("section__displayError");

  const displayIdWrapper = document.createElement("div");
  const displayNotification = document.createElement("div");
  const closeDisplayId = document.createElement("div");

  displayIdContainer.appendChild(displayIdWrapper);
  displayIdWrapper.appendChild(displayNotification);
  displayIdWrapper.appendChild(closeDisplayId);

  displayIdWrapper.classList.add("displayId__Wrapper");

  displayNotification.innerHTML = `Please fill the form thoroughly, all fields are required !`;
  displayNotification.classList.add("displayId__text");

  closeDisplayId.innerHTML = `<i class="fas fa-times displayId__exit"></i>`;

  displayIdContainer.classList.add("section__displayId--success");

  closeDisplayId.addEventListener("click", function () {
    const displayIdExitOut = document.querySelector(".displayId__exit");
    displayIdContainer.classList.add("section__displayId--out");
    displayIdExitOut.classList.add("displayId__exit--anim-out");

    setTimeout(function () {
      displayIdContainer.classList.remove("section__displayId--success");
      displayIdContainer.classList.remove("section__displayId--out");
      displayIdExitOut.classList.remove("displayId__exit--anim-out");
    }, 300);
  });
}

// - - - - -  CHECKOUT FORM ends here  - - - - - //

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const totalPriceContainer = document.querySelector(".totalPrice__result");

  if (cart === null) {
    cart = [];

    totalPriceContainer.innerHTML = "0 €";
  }

  const cartTemplateContainer = document.getElementById(
    "section__orderSummary--templateContainer"
  );
  cartTemplateContainer.innerHTML = "";

  if (cart.length === 0) {
    console.log("the cart is empty");

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

function renderItem(cartItem) {
  const template = document.getElementById("Template__orderSummary");
  const node = document.importNode(template.content, true);

  const img = node.querySelector(".orderSummary__img img");
  img.setAttribute("src", cartItem.articleImg);

  const cartItemName = node.querySelector(".orderSummary__name");
  cartItemName.textContent = cartItem.articleName;

  const cartItemLensOpt = node.querySelector(
    ".orderSummary__option--selectOpt"
  );
  cartItemLensOpt.textContent = cartItem.lensOption;

  const cartItemQtyContainer = node.querySelector(".orderSummary__qty--select");
  cartItemQtyContainer.textContent = cartItem.quantity;

  // Price formatter & result
  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const price = node.querySelector(".orderSummary__price");
  const priceResult = cartItem.articlePrice * cartItem.quantity;
  price.innerHTML = currencyFormatter.format(priceResult / 100);

  return node;
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

function totalPriceReducerOrder(totalPricesOrder) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = totalPricesOrder.reduce(reducer, 0);

  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const totalPriceContainerOrder = document.querySelector(
    ".displayId__orderId"
  );

  totalPriceContainerOrder.innerHTML = currencyFormatter.format(
    totalPrice / 100
  );

  return;
}
