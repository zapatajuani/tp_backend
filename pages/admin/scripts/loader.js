const mainContainer = document.querySelector("#main-container")

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        loader.classList.add("loader--hidden");
    });

});
