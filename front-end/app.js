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
        alert("La connexion au serveur n'a pas pu être effectué.");
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
  cloneElt.getElementById("article__price").textContent = `${
    article.price / 100
  }.00 €`;

  // fetching & displaying <description> of Article
  cloneElt.getElementById("article__description").textContent =
    article.description;

  // fetching & displaying <lens> of Article
  let i = 0;
  let select = cloneElt.querySelector(".article__lens");
  for (lens of article.lenses) {
    console.log(article.lenses);

    let option = document.createElement("option");
    option.setAttribute("value", i);

    option.innerHTML = lens;

    select.appendChild(option);
    i++;
    console.log(i);
  }

  // display Template
  // + creates element as child of .section__dyn--wrapper
  document.getElementById("section__dyn--wrapper").appendChild(cloneElt);
}
