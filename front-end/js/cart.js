// convert localStorage data from JSON format => JavaScript Object
let productsStoredInLocalStorage = JSON.parse(
  localStorage.getItem("toCartProduct")
);

lastItem =
  productsStoredInLocalStorage[productsStoredInLocalStorage.length - 1];
