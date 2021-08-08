(function () {
  updateCartNotification();
  // displayCart();
})();

/******* Form *******/
const btnSendForm = document.querySelector(".checkoutForm__btn");

btnSendForm.addEventListener("click", function (e) {
  handleSendToCart(e);
});

function handleSendToCart(e) {
  e.preventDefault();

  let cart = JSON.parse(localStorage.getItem("cart"));

  // fetches checkout form values from input
  const checkoutFormValues = {
    firstName: document.querySelector("#inputFirstName").value,
    lastName: document.querySelector("#inputLastName").value,
    address: document.querySelector("#inputAddress").value,
    city: document.querySelector("#inputCity").value,
    email: document.querySelector("#inputEmail").value,
  };

  // sends data objects to server
  const sendToServer = {
    cart,
    checkoutFormValues,
  };
  //   console.log("sendToServer");
  //   console.log(sendToServer);

  handleFetchToServer(sendToServer, checkoutFormValues);

  handleRegex(checkoutFormValues);
}

// ****************************************************************** //
// fetches localStorage content, injects into the form's inputs
const formData = localStorage.getItem("checkoutFormValues");
const formDataObj = JSON.parse(formData);

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
// ****************************************************************** //

function handleRegex(checkoutFormValues) {
  const textAlert = function (value) {
    return `${value}: number + symb unauthorized \n Please no less than 3ch, no more than 20 ch`;
  };
  const requiredInfoAlert = function (value) {
    return `${value}: number + symb unauthorized \n Please no less than 3ch, no more than 20 ch`;
  };

  // REGEX options
  const regExNameCity = function (value) {
    // return /^[A-Za-z]{3,20}$/.test(value);
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };
  const regExEmail = function (value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  const regExAddress = function (value) {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  // required text function
  function requiredEmpty(querySelectorId) {
    document.querySelector(`.${querySelectorId}`).textContent = "";
  }
  function requiredText(querySelectorId) {
    document.querySelector(`.${querySelectorId}`).textContent = "Required";
  }

  // Form control inputs & approval
  function firstNameControlInput() {
    const controlFirstNameInput = checkoutFormValues.firstName;

    if (regExNameCity(controlFirstNameInput)) {
      requiredEmpty("requiredInfo__firstName");
      return true;
    } else {
      requiredText("requiredInfo__firstName");
      return false;
    }
  }
  function lastNameControlInput() {
    const controlLastNameInput = checkoutFormValues.lastName;

    if (regExNameCity(controlLastNameInput)) {
      requiredEmpty("requiredInfo__lastName");
      return true;
    } else {
      requiredText("requiredInfo__lastName");
      return false;
    }
  }
  function cityControlInput() {
    const controlCityInput = checkoutFormValues.city;

    if (regExNameCity(controlCityInput)) {
      requiredEmpty("requiredInfo__city");
      return true;
    } else {
      requiredText("requiredInfo__city");
      return false;
    }
  }
  function emailControlInput() {
    const controlEmailInput = checkoutFormValues.email;

    if (regExEmail(controlEmailInput)) {
      requiredEmpty("requiredInfo__email");
      return true;
    } else {
      requiredText("requiredInfo__email");
      return false;
    }
  }
  function addressControlInput() {
    const controlAddressInput = checkoutFormValues.address;

    if (regExAddress(controlAddressInput)) {
      requiredEmpty("requiredInfo__address");
      return true;
    } else {
      requiredText("requiredInfo__address");
      return false;
    }
  }

  // handles approval of form before sending in localStorage
  if (
    firstNameControlInput() &&
    lastNameControlInput() &&
    cityControlInput() &&
    emailControlInput() &&
    addressControlInput()
  ) {
    // object <checkoutFormValues> send to localStorage
    localStorage.setItem(
      "checkoutFormValues",
      JSON.stringify(checkoutFormValues)
    );
  } else {
    alert("err, please fill the form folks");
  }
}

function handleFetchToServer(checkoutFormValues) {
  let contact = {
    firstName: `${checkoutFormValues.firstName}`,
    lastName: `${checkoutFormValues.lastName}`,
    address: `${checkoutFormValues.address}`,
    city: `${checkoutFormValues.city}`,
    email: `${checkoutFormValues.email}`,
  };

  let data = {
    contact,
    products: [],
  };

  var param = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:3000/api/cameras/order", param)
    .then((response) => response.json())
    .then((order) => console.log(order));
}
