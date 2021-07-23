// API :
// http://localhost:3000/api/cameras

// Auto-called func when loads
(async function () {
  const articles = await getArticles();

  for (article of articles) {
    displayArticle(article);
  }
})();

async function getArticles() {
  // fetch the API url
  return (
    fetch("http://localhost:3000/api/cameras")
      // translating data into a json file
      .then(function (httpBodyResponse) {
        return httpBodyResponse.json();
      })
      // using data from the 1st then to return the articles
      .then(function (articles) {
        return articles;
      })
      // if error => catch
      .catch(function (error) {
        // alert("La connexion au serveur n'a pas pu être effectué.");
        let articlesContainer = document.querySelector(".section__dyn");
        articlesContainer.classList.add("fetching__error");
        articlesContainer.innerHTML =
          "An error has occurred, we couldn't display our goods.<br>Please start the local server (port 3000).<br>If the problem doesn't go away, please contact us!";
        articlesContainer.style.textAlign = "center";
        articlesContainer.style.padding = "30vh 0";
      })
  );
}

function displayArticle(article) {
  // get template
  const templateElt = document.getElementById("templateArticle");

  // clone template
  const cloneElt = document.importNode(templateElt.content, true);

  // fetching & displaying <img> of Article
  let img = cloneElt.querySelector(".article__image--result img");
  img.setAttribute("src", article.imageUrl);

  // fetching & displaying <name> of Article
  cloneElt.getElementById("article__name").textContent = article.name;

  // fetching & displaying <price> of Article
  // 1st way :
  // cloneElt.getElementById("article__price").textContent = `${
  //   article.price / 100
  // }.00 €`;

  // fetching & displaying <price> of Article
  // 2nd way :
  article.price = article.price / 100;
  cloneElt.getElementById("article__price").innerHTML = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(article.price);

  // fetching & displaying <description> of Article
  cloneElt.getElementById("article__description").textContent =
    article.description;

  // fetching & displaying <lens> of Article
  let i = 0;
  let select = cloneElt.querySelector(".article__lens");
  // Default lens opt
  let optionDefault = document.createElement("option");
  optionDefault.innerHTML = `Please choose a lens`;
  select.appendChild(optionDefault);

  for (lens of article.lenses) {
    let option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = lens;
    select.appendChild(option);

    i++;
  }
  // creating dyanmic links to product page
  cloneElt.getElementById("article__link").href += `?id=${article._id}`;

  // display Template
  // + creates element as child of .section__dyn--wrapper
  document.getElementById("section__dyn--wrapper").appendChild(cloneElt);
}
