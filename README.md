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

## Handlers (`workLogHandler.js`)

Handlers are the functions that run when a button is clicked. They read the page, then call the manager to change data. They never touch `entryList` or `counter` directly, except to read them.

**Imports from the manager:** `setCounter`, `pushEntryList`, `counter`, `insertWL_entryList`, `entryList`

| Export | Attached to | Purpose |
|---|---|---|
| `logEntryHandler(e)` | `#logEntryBtn` | Validates the inputs, then builds, stores, and renders a new entry |
| `copyEntryHandler(e)` | `#copyEntryBtn` | Copies `entryList` to the clipboard as formatted JSON |

**Private helper (not exported):**

| Function | Purpose |
|---|---|
| `dateFormatter(date)` | Turns the date input's `"2026-10-21"` into `"10 / 21 / 2026"` with `split("-")`, avoiding `new Date()` time zone shifts |

### `logEntryHandler` flow

1. Read `#workLogDate` and `#workLogEntryBox`.
2. If either is empty (or the description is only whitespace), `throw new Error(...)`. The `catch` shows it with `alert(error.message)`.
3. Format the date with `dateFormatter`.
4. Build the entry HTML, numbered `counter + 1`.
5. `setCounter(counter + 1)`, `pushEntryList({ date, desc })`, then `insertWL_entryList(html)`.

### `copyEntryHandler` flow

1. `JSON.stringify(entryList, null, 4)` for readable, 4-space-indented JSON.
2. `navigator.clipboard.writeText(...)` to copy it. This needs `localhost` or HTTPS, so it works under live-server.
3. Alert to confirm the copy.

### Wiring (in `app.js`)

Handlers are passed **by reference**, without parentheses. The browser calls them on click and passes in `e`:

```js
copyEntryBtn.addEventListener("click", copyEntryHandler);
logEntryBtnElement.addEventListener("click", logEntryHandler);
```

## Running It

ES modules and JSON imports need a local server. Opening `index.html` from `file://` won't work.

Double-click `start.bat`, or run each script in its own terminal:

```
npm run serve          # live-server
npm run compile:sass   # watches and compiles SCSS
```

Run `npm install` first on a fresh clone. `start.bat` is git-ignored, so a fresh clone won't include it. Use the npm scripts instead.

## Notes

- Imports need the full relative path and the `.js` extension, for example `./workLogManager.js`.
- `loadPage()` replaces everything inside `<main>`. Select elements **after** it runs, or inside the functions that use them. Elements selected earlier belong to the old page.
- Validation checks the raw input values **before** `dateFormatter`, because an empty date formats to `"undefined / undefined / "`.
- The `try`/`catch` in `logEntryHandler` only catches errors thrown inside its own `try` block.

## To-Do

- Edit, Save, Delete, and Exit model for entries
- Copy buttons formatted for Discord and Google Docs
- Polish Code
- Add Comments for future work
