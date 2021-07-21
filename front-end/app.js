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

function displayArticle() {
  // get template
  const templateElt = document.getElementById("templateArticle");

  // clone template
  const cloneElt = document.importNode(templateElt.content, true);

  // fetching & displaying <img> of Article
  cloneElt.getElementById(
    "image--result"
  ).innerHTML = `<img src=${article.imageUrl} class="article__image--custom" alt="appareil photo" />`;

  // fetching & displaying <name> of Article
  cloneElt.getElementById("article__name").textContent = article.name;

  // fetching & displaying <price> of Article
  cloneElt.getElementById("article__price").textContent =
    article.price / 100 + ",00 €";

  // fetching & displaying <description> of Article
  cloneElt.getElementById("article__description").textContent =
    article.description;

  // fetching & displaying <lens> of Article
  /////
  for (lens of article.lenses) {
    console.log(lens);

    cloneElt.getElementById("article__lens").innerHTML = `
    <option value="empty">Please choose an option</option>
    <option value="${article.lenses[0]}">${article.lenses[0]}</option>
    <option value="${article.lenses[1]}">${article.lenses[1]}</option>
    <option value="${article.lenses[2]}">${article.lenses[2]}</option>
    `;
  }

  // // fetching & displaying <lens> of Article
  // /////
  // for (lens of article.lenses) {
  //   console.log(lens);

  //   cloneElt.getElementById("article__lens").innerHTML = `
  //   <option value="empty">Please choose an option</option>
  //   <option value="${article.lenses[0]}">${article.lenses[0]}</option>
  //   `;
  // }

  // display Template
  // + creates element as child of .section__dyn--wrapper
  document.getElementById("section__dyn--wrapper").appendChild(cloneElt);
}
