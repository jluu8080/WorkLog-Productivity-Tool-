/* 

*/
import workLogEntryData from "../../data/worklogEntries.json" with {type:"json"};

const workLogEntryListElement = document.querySelector("#workLogEntriesList");

export const entryList = [];
export let counter = 0;

export const insertWL_entryList = (itemElment) =>
{
    workLogEntryListElement.insertAdjacentHTML("beforeend", itemElment);
}

export const setCounter = (c) =>
{
    counter = c;
}

export const pushEntryList = (item) =>
{
    entryList.push(item);
}

export const workLogDataLoad = () =>
{
    // console.log(workLogEntryData);

    for (const entry of workLogEntryData)
    {
        console.log(entry.date);
        console.log(entry.desc);

        let workLogEntry = `
            <div class="workLogEntry">
                <p class="entryNum">Work Log Entry: ${counter+1}</p>
                <p id="entryDate">${entry.date}</p>
                <p id="entryDesc">${entry.desc}</p>
            </div>
        `;

        workLogEntryListElement.insertAdjacentHTML("beforeend", workLogEntry);

        counter++;

        const listItem = 
        {
            date: entry.date,
            desc: entry.desc
        }

        entryList.push(listItem);
    }
}