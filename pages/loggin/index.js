const form = document.querySelector("#loggin-form")
const user = document.querySelector("#user")
const pass = document.querySelector("#password")
const errM = document.querySelector("#input-error")
const mainContainer = document.querySelector("#loggin-container")

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        loader.classList.add("loader--hidden");
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!errM.classList.contains("hide")) {
        errM.classList.toggle("hide")
    }

    const formData = new FormData(form)
    mainContainer.classList.toggle("waiting")

    fetch('http://127.0.0.1:8000/test_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: formData.get("user"),pass: formData.get("password")})
    })
    .then(response => response.text())
    .then(data => {

        const res = JSON.parse(data)

        if (res.code == 401 && errM.classList.contains("hide")) {
            errM.classList.toggle("hide")
            mainContainer.classList.toggle("waiting")
        } else if (res.code == 200) {
            errM.classList.toggle("hide")
            mainContainer.classList.toggle("waiting")
            window.location.href = res.redirect
        }
    })
})
