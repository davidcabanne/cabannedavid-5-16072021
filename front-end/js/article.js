(async function () {
  const articleId = getArticleId();
  const articleData = await getArticleData(articleId);
  displayArticle(articleData);
})();

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

function getArticleData(articleId) {
  // fetch the API url
  return (
    fetch(`http://localhost:3000/api/cameras/${articleId}`)
      // translating data into a json file
      .then(function (httpBodyResponse) {
        return httpBodyResponse.json();
      })
      // using data from the 1st then to return the articles
      .then(function (article) {
        return article;
      })
      // if error => catch
      .catch(function (error) {
        alert("La connexion au serveur n'a pas pu être effectué.");
      })
  );
}

function displayArticle(articleData) {
  //fetching & displaying <img> of Article
  let imgArticle = articleData.imageUrl;
  document
    .querySelector(".article__image--custom")
    .setAttribute("src", imgArticle);
  // fetching & displaying <name> of Article
  document.getElementById("article__name").textContent = articleData.name;
  // fetching & displaying <price> of Article
  document.getElementById("article__price").textContent = `${
    articleData.price / 100
  }.00 €`;
  // fetching & displaying <description> of Article
  document.getElementById("article__description").textContent =
    articleData.description;

  // fetching & displaying <lens> of Article
  let i = 0;
  let select = document.querySelector(".article__lens");
  // Default lens opt
  let optionDefault = document.createElement("option");
  optionDefault.innerHTML = `Please choose a lens`;
  select.appendChild(optionDefault);

  for (lens of articleData.lenses) {
    let option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = lens;
    select.appendChild(option);

    i++;
  }
}
