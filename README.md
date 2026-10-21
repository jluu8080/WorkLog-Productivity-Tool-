# Work Log

A standalone web app for logging daily work. Each entry gets a number, a date, and a description. Entries are seeded from a JSON file, and the current list can be copied to the clipboard as JSON.

Updated: 10/21/2026

## Features

- **Log Entry:** adds an entry from the date picker and description box
- **Copy Entry:** copies all entries to the clipboard as formatted JSON
- **Seeded data:** loads starting entries from `data/worklogEntries.json` on page load
- **Validation:** alerts if the date or description is empty

## File Structure

```
workLog/
├── index.html
├── start.bat                    ← double-click to run the dev scripts
├── package.json
├── css/                         ← compiled styles (generated from scss/)
├── scss/                        ← source styles
├── icons/
├── pages/                       ← page HTML strings used by loadPage()
├── data/
│   └── worklogEntries.json      ← starting entries
└── src/
    ├── app.js                   ← orchestrator: loads the page, starts the work log, attaches listeners
    ├── model.js                 ← loadPage(): swaps page HTML into <main>
    └── worklog/
        ├── workLogManager.js    ← owns the data: entryList, counter, rendering, loading JSON
        └── workLogHandler.js    ← click handlers: logEntryHandler, copyEntryHandler
```

### How the pieces connect

- **`app.js`** imports from the manager and handler, calls `workLogDataLoad()`, and connects the buttons to their handlers.
- **`workLogManager.js`** holds the state. Other files change it only through its exported functions.
- **`workLogHandler.js`** reads the inputs, validates them, and calls the manager to add and render entries.

## Data Format

`data/worklogEntries.json` is an array of entry objects:

```json
[
    { "date": "10/20/2026", "desc": "Rebuilt ticket system" },
    { "date": "10/21/2026", "desc": "Ported edit/delete model" }
]
```

It's loaded with a static JSON import:

```js
import workLogEntryData from "../../data/worklogEntries.json" with { type: "json" };
```

The import is **read-only at the file level**. New entries live in memory and reset on reload. Use **Copy Entry** to grab the JSON and paste it into the file to keep it.

## Manager API (`workLogManager.js`)

| Export | Type | Purpose |
|---|---|---|
| `entryList` | `const` array | All entries as `{ date, desc }` objects |
| `counter` | `let` number | Number of entries logged, used for entry numbering |
| `setCounter(c)` | function | Sets `counter`, since importers can't reassign it |
| `pushEntryList(item)` | function | Adds an entry object to `entryList` |
| `insertWL_entryList(html)` | function | Adds an entry's HTML to the end of the list |
| `workLogDataLoad()` | function | Renders and stores every entry from the JSON file |

## Running It

ES modules and JSON imports need a local server. Opening `index.html` from `file://` won't work.

Double-click `start.bat`, or run each script in its own terminal:

```
npm run serve          # live-server
npm run compile:sass   # watches and compiles SCSS
```

Run `npm install` first on a fresh clone.

## Notes

- Imports need the full relative path and the `.js` extension, for example `./workLogManager.js`.
- `loadPage()` replaces everything inside `<main>`. Select elements **after** it runs, or inside the functions that use them. Elements selected earlier belong to the old page.
- Validation checks the raw input values **before** `dateFormatter`, because an empty date formats to `"undefined / undefined / "`.

## To-Do

- Edit, Save, Delete, and Exit model for entries
- Copy buttons formatted for Discord and Google Docs
- Polish the code
- Add Comments for future work
