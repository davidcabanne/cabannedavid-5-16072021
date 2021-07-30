// IIFE function ( (Immediately Invoked Function Expression))
// = > self-executing Anonymous function (doesn't have name / calls itself up)

(async function () {
  updateCartNotification();

  try {
    // Fetches articles from API (reference to common.js)
    const articles = await fetchArticles();

    // Render & display articles
    const containerWrapper = document.getElementById("section__dyn--wrapper");
    articles.forEach(function (article) {
      const articleNode = renderArticle(article);
      containerWrapper.appendChild(articleNode);
    });
  } catch (err) {
    console.error(err);

    //in case of API error, display an error msg
    const container = document.querySelector(".section__dyn");
    container.classList.add("fetching__error");
    container.innerHTML =
      "An error has occurred, we couldn't display our goods.<br>Please start the local server (port 3000).<br>If the problem doesn't go away, please contact us!";
  }
})();

// Renders an article object to a DOM node
function renderArticle(article) {
  const template = document.getElementById("templateArticle");
  const node = document.importNode(template.content, true);

  const img = node.querySelector(".article__image--result img");
  img.setAttribute("src", article.imageUrl);

  const name = node.getElementById("article__name");
  name.textContent = article.name;

  const currencyFormatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const price = node.getElementById("article__price");
  price.innerHTML = currencyFormatter.format(article.price / 100);

  const description = node.getElementById("article__description");
  description.textContent = article.description;

  // <Lenses options>
  const lenses = node.querySelector(".article__lens");

  // creates a defaultOption for the lenses' select > option
  const defaultOption = renderOption("empty", "Please choose a lens");
  lenses.appendChild(defaultOption);

  // Loop: for each lens of article.lesens
  article.lenses.forEach(function (value, index) {
    // = > render the option through func renderOption
    const option = renderOption(index, value);
    // = > create an <option>
    lenses.appendChild(option);
  });

  // Grab the article's id & add to each article__link
  const link = node.getElementById("article__link");
  link.href += `?id=${article._id}`;

  // Return the node to async func !important
  return node;
}

// Renders a value and a string to an option node
function renderOption(value, text) {
  const option = document.createElement("option");
  option.setAttribute("value", value);
  option.innerHTML = text;

  return option;
}
