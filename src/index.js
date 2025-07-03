import "./styles.css";
import { homePage } from "./homepage.js";
import { menuPage } from "./menu.js";
import { aboutPage } from "./about.js";

homePage();



const content = document.querySelector("#content");

// buttons
const homeBtn = document.querySelector("#home");
const menuBtn = document.querySelector("#menu");
const aboutBtn = document.querySelector("#about");

homeBtn.addEventListener("click", () => {
    content.replaceChildren();
    homePage(); 
});
menuBtn.addEventListener("click", () => {
    content.replaceChildren();
    menuPage(); 
});
aboutBtn.addEventListener("click", () => {
    content.replaceChildren();
    aboutPage(); 
});

