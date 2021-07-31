let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

if (cart === null) {
  // cart = [];
  console.log("the cart is empty");
}
if (cart.length > 0) {
  console.log("the cart is full");
}
