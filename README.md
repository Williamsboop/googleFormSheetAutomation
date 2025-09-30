# Google Form + Sheet Automations

This repository contains reusable Google Apps Script projects for automating workflows involving Google Forms, Google Sheets, Calendar events, and emails. Each project can be adapted for similar use cases.

---

## **1. Programmatic Response Acquisition (v1)**

- **Location:** `Programmatic Response Acquisition v1/Sheet Scripts`
- **Files:** `globalFunctions.js`, `globalVars.js`, `main.js`
- **Purpose:** Provides a template for programmatically collecting and accessing response data from a Google Form + Sheet setup.
- **Key Features:**
  - `globalVars.js`: defines structured indices for response data
  - `globalFunctions.js`: `getResponse()` helper function for standardized data retrieval
  - `main.js`: entry point to collect responses on form submit
  - Includes example/test data (`FAKE_DATA`) for local testing before deployment

---

## **2. Timeslot Automation (v2)**

- **Location:** `Timeslot Automation v2`
- **Files:** 

  ### Form Scripts
  - `updateDays.js` – dynamically updates day choices and section routing for the form

  ### Sheet Scripts
  - `dailyCheck.js` – resets available time slots and updates form choices
  - `globalFunctions.js` – helper functions for parsing responses, defining event/email content, and updating slots
  - `globalVars.js` – defines form, sheet, calendar references, recipients, and default slots
  - `makeEvent.js` – creates Google Calendar events with guests and notifications
  - `makeMail.js` – sends notification emails to corporate recipients
  - `updateForm.js` – updates form slot choices based on submitted data
  - `wrapper.js` – sequentially runs form update, calendar event creation, and email notifications on form submit

- **Purpose:** Automates scheduling, slot availability, calendar event creation, and notifications for a structured form + sheet setup.
- **Key Features:**
  - Automatically removes booked slots from the form
  - Creates calendar events with start/end times and guest invites
  - Sends customized email notifications with meeting details and user interests
  - Handles dynamic day/slot assignment and routing

---

## **Notes**

- Remove or comment out `import/export` statements when moving to Google Apps Script editor.
- `FAKE_DATA` in v1 is for local testing and demonstration only.
- Adjust time zone using `Session.getScriptTimeZone()`.
- Replace placeholder IDs in `globalVars.js`:
   - `CALENDAR_ID`
   - `FORM_ID`
- Set default slots and corporate recipients.
