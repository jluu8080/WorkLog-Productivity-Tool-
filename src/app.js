//Depreciated
import {loadPage} from "./model.js";

import {workLogDataLoad} from "./worklog/workLogManager.js";
import {copyEntryHandler, logEntryHandler } from "./worklog/workLogHandler.js";

//Depreciated
function changeRoute()
{
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#","");

    console.log(pageID);
    loadPage(pageID);
}

//Depreciated
function initApp()
{
    loadPage("home");
    window.addEventListener("hashchange", changeRoute);
}

// initApp();

workLogDataLoad();

const logEntryBtnElement = document.querySelector("#logEntryBtn");
const copyEntryBtn = document.querySelector("#copyEntryBtn");

copyEntryBtn.addEventListener("click", copyEntryHandler);

logEntryBtnElement.addEventListener("click", logEntryHandler);