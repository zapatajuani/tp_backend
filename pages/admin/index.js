/* const mainContainer = document.querySelector("#main-container")

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
});


fetch("http://127.0.0.1:8000/pedidos")
    .then(data => data.text())
    .then((data) => {
        for (const item of JSON.parse(data)) {
            console.log(item.uuid)
        }
    })
 */