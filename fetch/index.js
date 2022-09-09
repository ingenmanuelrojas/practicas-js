
const cards = document.querySelector("#card-dinamica");
const templateCard = document.querySelector("#template-card").content;

const getData = async () => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character/");
        const data = await response.json();

        pintarDatos(data);

    } catch (error) {
        console.log(error);
    } finally {
        loading_data(false);
    }

}

const pintarDatos = (data) => {
    const fragment = document.createDocumentFragment();

    cards.textContent = "";

    data.results.forEach((item) => {
        const clone = templateCard.cloneNode(true);
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector("p").textContent = item.species;
        clone.querySelector("img").setAttribute("src", item.image);

        //guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
};

const loading_data = (estado) => {
    const loading = document.getElementById("loading");
    if (estado) {
        loading.classList.remove("d-none");
    } else {
        loading.classList.add("d-none");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getData();
});