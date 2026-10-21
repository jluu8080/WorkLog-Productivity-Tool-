import home from "../pages/home.js";

export function loadPage(pageID)
{

    const main =document.querySelector("main");

    switch(pageID)
    {
        case "home":
            main.innerHTML = home;
        break;
    }
}