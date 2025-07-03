
export function aboutPage() {
    const content = document.querySelector("#content");

    const mainHeader = document.createElement("h1");
    mainHeader.textContent = "About";

    const aboutParagraph = document.createElement("p");
    aboutParagraph.textContent = "thats about it."
    aboutParagraph.classList.add("aboutP");

    content.appendChild(mainHeader);
    content.appendChild(aboutParagraph);
}
