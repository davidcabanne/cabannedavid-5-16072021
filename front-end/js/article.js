(async function () {
  updateCartNotification();

  const url = new URL(location.href);
  const articleId = url.searchParams.get("id");

  try {
    const article = await fetchArticle(articleId);
    updateArticle(article);
  } catch (err) {
    console.error(err);

    // In case of API error, display an error message
    const container = document.querySelector(".section__cartPage--wrapper");
    container.classList.add("fetching__error");
    container.innerHTML =
      "An error has occurred, we couldn't display our goods.<br>Please start the local server (port 3000).<br>If the problem doesn't go away, please contact us!";
  }
})();

// Updates an article object to a DOM node
function updateArticle(article) {
  const img = document.querySelector(".article__image--custom");
  img.setAttribute("src", article.imageUrl);

  const name = document.getElementById("article__name");
  name.textContent = article.name;

  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const price = document.getElementById("article__price");
  price.innerHTML = currencyFormatter.format(article.price / 100);

  const description = document.getElementById("article__description");
  description.textContent = article.description;

  // <Lenses options>
  const lenses = document.querySelector(".article__lens");

  // creates a defaultOption for the lenses' select > option
  const defaultOption = renderOption("empty", "Available lenses");
  lenses.appendChild(defaultOption);

  // Loop: for each lens of article.lesens
  article.lenses.forEach(function (value, index) {
    // = > render the option through func renderOption
    const option = renderOption(index, value);
    // = > create an <option>
    lenses.appendChild(option);
  });

  const button = document.querySelector("#send-to-cart");

  button.addEventListener("click", function (e) {
    handleAddToCart(e, article);
  });
}

function handleAddToCart(e, article) {
  const lenses = document.querySelector(".article__lens");

  if (lenses.value == "empty") {
    const error = renderError(
      "Please choose a lens before proceeding to checkout!"
    );
    const notifications = document.querySelector(".notifications");
    notifications.innerHTML = "";
    notifications.appendChild(error);
    return;
  }

  lensOption = article.lenses[lenses.value];

  let entry = {
    articleId: article._id,
    articleName: article.name,
    articlePrice: article.price,
    lensOption: lensOption,
    articleImg: article.imageUrl,
    quantity: 1,
  };

  addToCart(entry);
  updateCartNotification();

  const confirm = renderConfirm(entry);
  const notifications = document.querySelector(".notifications");
  notifications.innerHTML = "";
  notifications.appendChild(confirm);
}

// Add an entry to the localStorage shopping cart
function addToCart(entry) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }

  cart.push(entry);

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Renders a value and a string to an option node
function renderOption(value, text) {
  const option = document.createElement("option");
  option.setAttribute("value", value);
  option.innerHTML = text;

  return option;
}

function renderConfirm(entry) {
  const template = document.getElementById("templateConfirm");
  const node = document.importNode(template.content, true);

  const section = node.querySelector(".cartSuccess__section");
  const sectionContainer = node.querySelector(
    ".cartSuccess__section__container"
  );
  const articleName = node.querySelector(".cartSuccess__section--productName");
  const lensOption = node.querySelector(".cartSuccess__section--productOpt");
  const confirmMessage = node.querySelector(
    ".cartSuccess__section--productText"
  );
  const close = node.querySelector(
    ".cartSuccess__section--productExit--link__cta"
  );

  articleName.classList.add("cartSuccess__section--productName");
  articleName.textContent = `${entry.articleName}`;

  lensOption.classList.add("cartSuccess__section--productOpt");
  lensOption.innerHTML = `Lens option: <span class="cartSuccess__section--productOpt--link">${entry.lensOption}</span>`;

  confirmMessage.classList.add("cartSuccess__section--productText");
  confirmMessage.textContent = `Your item was successfully added to cart`;

  close.addEventListener("click", handleCloseConfirm);

  return node;
}

function renderError(error) {
  const template = document.getElementById("templateError");
  const node = document.importNode(template.content, true);

  const close = node.getElementById("cartError__section--icon");
  const text = node.querySelector(".cartError__section--text");

  text.innerHTML = error;

  close.addEventListener("click", handleCloseError);

  return node;
}

function handleCloseConfirm(e) {
  console.log("handleCloseConfirm");

  const section = document.querySelector(".cartSuccess__section");

  section.classList.add("cartSuccess__section--display--out");

  setTimeout(function () {
    section.classList.remove("cartSuccess__section--display");
    section.classList.remove("cartSuccess__section--display--out");
  }, 500);
}

function handleCloseError(e) {
  const container = document.querySelector(".cartError__section");

  container.classList.add("cartError__section--display--out");

  setTimeout(function () {
    container.classList.remove("cartError__section--display");
    container.classList.remove("cartError__section--display--out");
  }, 500);
}
