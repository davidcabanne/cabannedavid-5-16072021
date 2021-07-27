// Product page animation

const previewLink = document.querySelector(".article__preview--button");
const previewLinkContainer = document.querySelector(
  ".article__preview--button--container__anim"
);
const previewLinkCta = document.querySelector(
  ".article__preview--button--container"
);
const previewIcon = document.querySelector(".article__preview--icon");
const previewProduct = document.querySelector(".section__dyn");

previewLink.addEventListener("click", function () {
  previewLinkContainer.classList.toggle(
    "article__preview--button--container__toggle"
  );
  previewLinkCta.classList.toggle(
    "article__preview--button--container__toggle--cta"
  );
  previewIcon.classList.toggle("article__preview--icon__toggle");
  previewProduct.classList.toggle("section__dyn__toggle");
});
