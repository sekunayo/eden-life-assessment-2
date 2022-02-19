const modalTl = gsap.timeline({ defaults: { duration: 0.4 } });
const imgTl = gsap.timeline({ defaults: { duration: 0.4 } });

const button = document.querySelector("#viewMeals");
const closeButton = document.querySelector(".modal__close");
const img = document.querySelectorAll(".modal__content-item-img");
const imgModal = document.querySelector(".modal__content-modal");
const imgContainer = document.querySelector(".modal__content");
const imgContainerOverlay = document.querySelector(".modal__content-overlay");

button.addEventListener("click", showModal);
closeButton.addEventListener("click", () => {
  modalTl.reverse();
  imgTl.reverse();
});
img.forEach((img) => img.addEventListener("click", expandImage));
imgContainerOverlay.addEventListener("click", () => imgTl.reverse());

function showModal() {
  modalTl.clear();
  modalTl.play();
  modalTl.set(".modal", { opacity: 1, zIndex: 1 });

  modalTl
    .to(".modal__container", { top: "20%", height: "80vh", padding: 0 })
    .to(
      ".modal",
      {
        backgroundColor: "rgba(0,0,0,0.9)",
      },
      0
    );
}

function expandImage() {
  imgTl.clear();
  imgTl.play();
  let rect = this.getBoundingClientRect();
  const imgUrl = this.querySelector("img").getAttribute("src");

  imgModal.querySelector("img").setAttribute("src", imgUrl);

  imgTl.to(".modal__content-overlay", { autoAlpha: 1 }).fromTo(
    ".modal__content-modal",
    {
      top: this.offsetTop,
      height: rect.height,
      width: rect.width,
      left: this.offsetLeft,
      autoAlpha: 0,
      backgroundColor: "none",
      zIndex: -1,
    },
    {
      top: 0,
      left: 0,
      height: "100vw",
      width: "100vw",
      zIndex: 2,
      autoAlpha: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    0
  );
}

