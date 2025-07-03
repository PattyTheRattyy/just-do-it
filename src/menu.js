
export function menuPage() {
    const content = document.querySelector("#content");

    const mainHeader = document.createElement("h1");
    mainHeader.textContent = "Wow look at this menu!";
    
    const menu = document.createElement("ul");
    const menuItemOne = document.createElement("li");
    menuItemOne.textContent = "Serving a dynamically rendered menu!";
    const menuItemTwo = document.createElement("li");
    menuItemTwo.textContent = "Wow, that's amazing!";

    menu.appendChild(menuItemOne);
    menu.appendChild(menuItemTwo);



    content.appendChild(mainHeader);
    content.appendChild(menuItemOne);
    content.appendChild(menuItemTwo);
}
