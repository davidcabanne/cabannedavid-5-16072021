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
        let articlesContainer = document.querySelector(".section__dyn");
        articlesContainer.classList.add("fetching__error");
        articlesContainer.innerHTML =
          "An error has occurred, we couldn't display our goods.<br>Please start the local server (port 3000).<br>If the problem doesn't go away, please contact us!";
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
  // document.getElementById("article__price").textContent = `${
  //   articleData.price / 100
  // }.00 €`;
  articleData.price = articleData.price / 100;
  document.getElementById("article__price").innerHTML = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(articleData.price);

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
    option.classList.add("article__lens__option");
    option.setAttribute("value", lens);
    // option.setAttribute("value", i);
    option.innerHTML = lens;
    select.appendChild(option);
    i++;
  }

  // ************************************** //
  // ******** Cart functionalities ******** //
  // ************************************** //
  //
  // fetching datas selected by the user & sending to cart

  const selectLensId = document.querySelector(".article__lens");
  const btnSendToCart = document.querySelector("#send-to-cart");

  btnSendToCart.addEventListener("click", (e) => {
    e.preventDefault();

    const userSelectedValue = selectLensId.value;

    if (userSelectedValue === "Please choose a lens") {
      let cartErrorContainerClose = document.getElementById(
        "cartError__section--icon"
      );
      let cartErrorContainer = document.querySelector(".cartError__section");
      let cartErrorContainerText = document.querySelector(
        ".cartError__section--text"
      );

      cartErrorContainerText.innerHTML =
        "Please choose a lens before proceeding to checkout!";

      cartErrorContainer.classList.add("cartError__section--display");

      cartErrorContainerClose.addEventListener("click", function () {
        cartErrorContainer.classList.add("cartError__section--display--out");

        function cartAnimationOut() {
          cartErrorContainer.classList.remove("cartError__section--display");
          cartErrorContainer.classList.remove(
            "cartError__section--display--out"
          );
        }

        setTimeout(cartAnimationOut, 500);
        // clearTimeout(cartAnimationOut);
      });
    } else {
      const cartNotification = document.querySelector(
        ".nav__cart__notification"
      );
      cartNotification.classList.add("nav__cart__notification--display");

      let optionProduct = {
        nameProduct: articleData.name,
        idProduct: articleData._id,
        optionProduct: userSelectedValue,
        quantity: 1,
        price: articleData.price,
      };
      // console.log(optionProduct);

      // ************************************** //
      // *********** LOCAL STORAGE ************ //
      // ************************************** //
      //

      // convert localStorage data from JSON format => JavaScript Object
      let productsStoredInLocalStorage = JSON.parse(
        localStorage.getItem("toCartProduct")
      );
      // alternate popup Function
      // const popupConfirm = () => {
      //   if (
      //     window.confirm(`${articleData.name} option: ${userSelectedValue} was successfully added to cart
      //   Go to cart OK or keep shopping CANCEL`)
      //   ) {
      //     window.location.href = "cart.html";
      //   } else {
      //     window.location.href = "index.html";
      //   }
      // };
      function popupConfirm() {
        const cartSuccessSection = document.querySelector(
          ".cartSuccess__section"
        );
        cartSuccessSection.classList.add("cartSuccess__section--display");
      }

      const cartSuccessSectionContainer = document.querySelector(
        ".cartSuccess__section__container"
      );

      const createNameProductDiv = document.createElement("div");
      cartSuccessSectionContainer.appendChild(createNameProductDiv);
      createNameProductDiv.classList.add("cartSuccess__section--productName");
      createNameProductDiv.textContent = `${articleData.name}`;

      const createOptProductDiv = document.createElement("div");
      cartSuccessSectionContainer.appendChild(createOptProductDiv);
      createOptProductDiv.classList.add("cartSuccess__section--productOpt");
      createOptProductDiv.innerHTML = `Lens: <span class="cartSuccess__section--productOpt--link">${userSelectedValue}</span>`;

      const createTextProductDiv = document.createElement("div");
      cartSuccessSectionContainer.appendChild(createTextProductDiv);
      createTextProductDiv.classList.add("cartSuccess__section--productText");
      createTextProductDiv.textContent = `was successfully added to cart`;

      const createExitProductDiv = document.createElement("div");
      cartSuccessSectionContainer.appendChild(createExitProductDiv);
      createExitProductDiv.classList.add("cartSuccess__section--productExit");
      createExitProductDiv.innerHTML = `Go to <a class="cartSuccess__section--productExit--link" href="cart.html">cart</a> or <span class="cartSuccess__section--productExit--link cartSuccess__section--productExit--link__cta">keep shopping</span>`;

      const exitCartPopup = document.querySelector(
        ".cartSuccess__section--productExit--link__cta"
      );
      exitCartPopup.addEventListener("click", function () {
        const cartSuccessSection = document.querySelector(
          ".cartSuccess__section"
        );

        cartSuccessSection.classList.add("cartSuccess__section--display--out");

        function cartAnimationOut() {
          cartSuccessSection.classList.remove("cartSuccess__section--display");
          cartSuccessSection.classList.remove(
            "cartSuccess__section--display--out"
          );
        }

        setTimeout(cartAnimationOut, 500);
        // clearTimeout(cartAnimationOut);
      });

      const addProductToLocalStorage = () => {
        // adding to array the object with values choosen by user
        productsStoredInLocalStorage.push(optionProduct);
        // convert from Javascript object => JSON format
        // sending the "key" of "toCartProduct" => localStorage
        localStorage.setItem(
          "toCartProduct",
          JSON.stringify(productsStoredInLocalStorage)
        );
      };

      // if products are already stored in LocalStorage
      if (productsStoredInLocalStorage) {
        addProductToLocalStorage();
        popupConfirm();
      }
      //
      // if LocalStorage is empty
      else {
        productsStoredInLocalStorage = [];
        addProductToLocalStorage();
        popupConfirm();
      }
    }

    // end of Event Listenner
  });
}
