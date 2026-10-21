///workLogManager Imports//
import { setCounter, pushEntryList, counter, insertWL_entryList, entryList } from "./workLogManager.js";


//////////////Handler Helper Functions/////////////
const dateFormatter = (date) => {
    const [year, month, day] = date.split("-");
    
    date = `${month} / ${day} / ${year}`;

    return date;
};



//////////////Handlers/////////////
export const copyEntryHandler = (e) =>
{
    // console.log(JSON.stringify(entryList));


    //.writeText(string)
    navigator.clipboard.writeText(JSON.stringify(entryList, null, 4));

    // Alert the copied text
    alert("Copied the Data");
}

//I'm going to need a Edit, Save, Delete, and Exit Model here
//Might be simpler to reproduce?
export const logEntryHandler = (e) =>
{
    console.log("hi");
    // workLogEntryListElement = document.querySelector("#workLogEntriesList");
    try
    {
        let logCounter = counter+1;
        console.log(logCounter);

        let workLogDate = document.querySelector("#workLogDate").value;

        //Formats the date to: month/day/year
        workLogDate = dateFormatter(workLogDate);
        console.log(workLogDate);

        let workLogDesc = document.querySelector("#workLogEntryBox").value;

        if (workLogDate == "" || workLogDesc.trim()=="")
        {
            throw new Error("One of the Worklog Entry Fields are empty");
            
        }

        console.log(workLogDesc);

        let workLogEntry = `
            <div class="workLogEntry">
                <p class="entryNum">Work Log Entry: ${logCounter}</p>
                <p id="entryDate">${workLogDate}</p>
                <p id="entryDesc">${workLogDesc}</p>
            </div>
        `;
        setCounter(logCounter);
        
        const listItem = 
        {
            date: workLogDate,
            desc: workLogDesc
        }
        pushEntryList(listItem);

        insertWL_entryList(workLogEntry);
    }
    catch(error)
    {
        alert(error.message);
        console.log(error.stack);
    }
}