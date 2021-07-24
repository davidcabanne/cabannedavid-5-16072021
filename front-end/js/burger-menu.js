// Burger Menu //
const nav = document.querySelector(".nav-container");
const burger = document.querySelector(".burger");
const links = nav.querySelectorAll("a");
const header = document.querySelector("header");
const menufix = document.querySelector(".section__menufix");
const disablescroll = document.querySelector("body");
const animLink = document.querySelectorAll(".nav__link");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
  header.classList.toggle("fixed-header");
  menufix.classList.toggle("mobile-menu-fix");
  disablescroll.classList.toggle("mobile-menu-scroll");
  animLink[0].classList.toggle("link__toggled");
  animLink[1].classList.toggle("link__toggled");
  animLink[2].classList.toggle("link__toggled");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
    header.classList.toggle("fixed-header");
    menufix.classList.toggle("mobile-menu-fix");
    disablescroll.classList.toggle("mobile-menu-scroll");
    animLink[0].classList.toggle("link__toggled");
    animLink[1].classList.toggle("link__toggled");
    animLink[2].classList.toggle("link__toggled");
  });
});

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
previewLink();
