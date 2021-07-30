// Grabs the API's url
const API_URL = "http://localhost:3000/api";

// Fetches the list of items from API
async function fetchArticles() {
  // await can be executed only in async functions
  // async function, waits for promise to resolve and sends API's data
  const response = await fetch(API_URL + "/cameras");
  const articles = await response.json();
  return articles;
}

// Fetch an article from the API given its ID
async function fetchArticle(articleId) {
  const response = await fetch(API_URL + `/cameras/${articleId}`);
  const article = response.json();
  return article;
}

function updateCartNotification() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  if (cart.length > 0) {
    const notification = document.querySelector(".nav__cart__notification");
    notification.classList.add("nav__cart__notification--display");
  }
}
