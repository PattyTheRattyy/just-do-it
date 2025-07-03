
export function homePage() {
    const content = document.querySelector("#content");

    const mainHeader = document.createElement("h1");
    mainHeader.textContent = "Wow, pizza is fantastic!";
    content.appendChild(mainHeader);
}
