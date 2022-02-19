// let viewMeals = document.querySelector("#viewMeals");
// let mealContainer = document.querySelector(".meal__menu-main");
// let closeIcon = document.querySelector(".meal__menu-header-icon");
// let header = document.querySelector(".meal__menu-header");

// viewMeals.addEventListener("click", (e) => {
//   const tl = gsap.timeline();
//   tl.to(".meal__menu-modal",{
//     opacity: 1,
//     zIndex: 1,
//     duration: 0.3
//   }).to(".meal__menu-modal-container", {
//     top: "10%"
//   }).to(".meal__menu-header",{
//     opacity: 1
//   },0.3).to(".meal__menu-main", {
//     height: "100%",
//     opacity: 1,
//   });

//   // setTimeout(() => {
//   //   mealContainer.classList.add("meal-active");
//   // }, 1000);
// });

// closeIcon.addEventListener("click", () => {
//   let modal = viewMeals.nextElementSibling;
//   mealContainer.classList.remove("meal-active");
//   // setTimeout(() => {
//   //   modal.style.display = "none";
//   // }, 1000);
// });

// //images animation

// let images = document.querySelectorAll(".meal__menu-box-image");

// for (let i = 0; i < images.length; i++) {
//   images[i].addEventListener("click", (e) => {
//     let parent = e.target.parentElement;
//     if (!isTweening && index !== 0) return;

//     //Get card dimensions
//     let rect = parent.current.getBoundingClientRect();
//     let initialY = rect.height - rect.y + 24;
//     let x = rect.x - 24;
//     let finalY = window.innerHeight / 2 - rect.top - rect.height / 2;

//     //Set dummy div with the dimensions, position and background image of clicked card
//     gsap.set("#route-image", {
//       x,
//       y: initialY,
//       zIndex: 2,
//       width: rect.width,
//       height: rect.height,
//       backgroundImage: `url('${image}')`,
//       backgroundSize: "cover",
//       backgroundRepeat: "no-repeat",
//       ease: "ease.inOut",
//     });

//     //Move dummy image to desired position
//     gsap.to("#route-image", {
//       y: finalY,

//       onStart: () => {
//         handleDimensions();
//         setIsTweening(true);
//         gsap.to(["#card__container", ".hero"], {
//           opacity: 0,
//           duration: 0.9,
//           ease: "expo.inOut",
//         });
//       },
//       delay: 0.3,
//       duration: 1.5,
//       ease: "expo.inOut",
//     });
//   });
// }




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

