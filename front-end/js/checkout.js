(function () {
  updateCartNotification();
  displayCart();
})();

// - - - - -  CHECKOUT FORM starts here  - - - - - //
//
const btnSendForm = document.querySelector(".checkoutForm__btn");

btnSendForm.addEventListener("click", function (e) {
  handleSendToCart(e);
});

function handleSendToCart(e) {
  e.preventDefault();

  let cart = JSON.parse(localStorage.getItem("cart"));

  // fetches checkout form values from input
  const formValues = {
    firstName: document.querySelector("#inputFirstName").value,
    lastName: document.querySelector("#inputLastName").value,
    address: document.querySelector("#inputAddress").value,
    city: document.querySelector("#inputCity").value,
    email: document.querySelector("#inputEmail").value,
  };

  // sends data obj <cart> & <formValues> = > to server
  const submitDataToServer = {
    cart,
    formValues,
  };

  handleRegex(formValues);
}

// fetches localStorage content, injects into each form input
let formData = localStorage.getItem("formValues");
let formDataObj = JSON.parse(formData);

if (formData === null) {
  formData = [];
}

if (formData.length > 0) {
  const firstNameData = (document.querySelector("#inputFirstName").value =
    formDataObj.firstName);
  const lastNameData = (document.querySelector("#inputLastName").value =
    formDataObj.lastName);
  const addressData = (document.querySelector("#inputAddress").value =
    formDataObj.address);
  const cityData = (document.querySelector("#inputCity").value =
    formDataObj.city);
  const emailData = (document.querySelector("#inputEmail").value =
    formDataObj.email);
}

function handleRegex(formValues) {
  // REGEX options
  const regExNameCity = function (value) {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };
  const regExEmail = function (value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  const regExAddress = function (value) {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  // required Text functions
  function requiredTextRemove(querySelectorId) {
    document.querySelector(`.${querySelectorId}`).textContent = "";
  }
  function requiredTextAdd(querySelectorId) {
    document.querySelector(`.${querySelectorId}`).textContent = "Required";
  }
  // border Failure
  function requiredBorderFailureRemove(querySelectorIdB) {
    document
      .querySelector(`#${querySelectorIdB}`)
      .classList.remove("checkoutForm__required--failure");
  }
  function requiredBorderFailureAdd(querySelectorIdB) {
    document
      .querySelector(`#${querySelectorIdB}`)
      .classList.add("checkoutForm__required--failure");
  }
  // border Success
  function requiredBorderSuccessRemove(querySelectorIdB) {
    document
      .querySelector(`#${querySelectorIdB}`)
      .classList.remove("checkoutForm__required--success");
  }
  function requiredBorderSuccessAdd(querySelectorIdB) {
    document
      .querySelector(`#${querySelectorIdB}`)
      .classList.add("checkoutForm__required--success");
  }

  // Form control inputs & approval
  function firstNameControlInput() {
    const controlFirstNameInput = formValues.firstName;

    if (regExNameCity(controlFirstNameInput)) {
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

  function lastNameControlInput() {
    const controlLastNameInput = formValues.lastName;

    if (regExNameCity(controlLastNameInput)) {
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

  function addressControlInput() {
    const controlAddressInput = formValues.address;

    if (regExAddress(controlAddressInput)) {
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

  function cityControlInput() {
    const controlCityInput = formValues.city;

    if (regExNameCity(controlCityInput)) {
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
  function emailControlInput() {
    const controlEmailInput = formValues.email;

    if (regExEmail(controlEmailInput)) {
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

  // handles approval of form before sending in localStorage
  if (
    firstNameControlInput() &&
    lastNameControlInput() &&
    addressControlInput() &&
    cityControlInput() &&
    emailControlInput()
  ) {
    // 1_ sends object <formValues> => to localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));

    // 2_ if all inputs are approved by Regex, then submits values => to API
    submitToApi(formValues);
  } else {
    // 1_ if form is invalid => alert user
    alert("Please fill the form");
  }
}

function submitToApi(formValues) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const products = [];

  for (let i = 0; i < cart.length; i++) {
    // const cartItem = cart[i];
    // const cartIdName = cart[i].articleName;
    // const cartIdlens = cart[i].lensOption;
    // const cartIdQty = cart[i].quantity;
    const cartIdProducts = cart[i].articleId;

    // let productCart = {
    //   productId: cartIdProducts,
    //   productName: cartIdName,
    //   productLens: cartIdlens,
    //   productQty: cartIdQty,
    // };

    products.push(cartIdProducts);
  }

  let contact = {
    firstName: `${formValues.firstName}`,
    lastName: `${formValues.lastName}`,
    address: `${formValues.address}`,
    city: `${formValues.city}`,
    email: `${formValues.email}`,
  };

  let data = {
    contact,
    products,
  };

  var param = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:3000/api/cameras/order", param)
    .then((response) => response.json())
    // .then((order) => console.log(order));
    .then(function (order) {
      console.log(order);
      displayId(order);
    });
}

function displayId(order) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const displayIdContainer = document.getElementById("section__displayId");
  const body = document.body;

  const displayIdWrapper = document.createElement("div");
  const displayNotification = document.createElement("div");
  const displayId = document.createElement("div");
  const closeDisplayId = document.createElement("div");

  displayIdContainer.appendChild(displayIdWrapper);
  displayIdWrapper.appendChild(displayNotification);
  displayIdWrapper.appendChild(displayId);
  displayIdWrapper.appendChild(closeDisplayId);

  displayIdWrapper.classList.add("displayId__Wrapper");

  displayNotification.innerHTML = `Your order has been successfully processed and you will shortly receive an email from CAM&RAS confirming your transaction!`;
  displayNotification.classList.add("displayId__text");

  displayId.innerHTML = `Your order ID is:</br> <span class="displayId__orderId">${order.orderId}</span>`;
  displayId.classList.add("displayId__nbr");

  closeDisplayId.innerHTML = `<i class="fas fa-times displayId__exit"></i>`;

  displayIdContainer.classList.add("section__displayId--success");

  closeDisplayId.addEventListener("click", function (e) {
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

  console.log(cart);

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
    //
    // create a section for Empty cart
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

function renderItem(cartItem, cart, index) {
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
