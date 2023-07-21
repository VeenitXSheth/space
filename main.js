import { app as firebase } from "./firebase-config.js";

if(!localStorage.getItem("darkMode")) localStorage.setItem("darkMode", "false") 

let toBool = str => { return str == "true" ? true : false }

let isDark = toBool(localStorage.getItem("darkMode"));
let root = document.querySelector(":root");
const toggle = document.getElementById("toggle");

if(isDark){
    root.style.setProperty("--background", "black");
    root.style.setProperty("--text", "white");
    toggle.innerText = 'light_mode';
}

toggle.addEventListener("click", () => {
    if(isDark){
        root.style.setProperty("--background", "white");
        root.style.setProperty("--text", "black");
        isDark = false;
        toggle.innerText = 'dark_mode';
        localStorage.setItem("darkMode", "false");
    } else {
        root.style.setProperty("--background", "#0f0f0f");
        root.style.setProperty("--text", "white");
        isDark = true;
        toggle.innerText = 'light_mode';
        localStorage.setItem("darkMode", "true");
    }
})

console.log(firebase);
