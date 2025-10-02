# Google Forms + Sheets Automation Suite

A collection of Google Apps Script projects for automating workflows with Google Forms, Sheets, Calendar, and Gmail. These modular scripts can be adapted for various scheduling and data collection use cases.

---

## Projects

### 1. Programmatic Response Acquisition (v1.0.0)

**Purpose:** A foundational template for programmatically collecting and processing Google Form responses.

**Location:** `Programmatic Response Acquisition v1/Sheet Scripts`

**Components:**

- `globalVars.js` — Defines structured indices for accessing response data fields

- `globalFunctions.js` — Core helper function (`getResponse()`) for standardized data retrieval

- `main.js` — Entry point that runs on form submission to collect responses

**Features:**

- Structured data indexing system for reliable field access
- Built-in test data (`FAKE_DATA`) for local development and testing
- Clean, reusable architecture for form response handling

---

### 2. Timeslot Automation (v2.5.0)

**Purpose:** Complete automation system for appointment scheduling with dynamic slot management, calendar integration, and email notifications.

**Location:** `Timeslot Automation v2`

#### Form Scripts

- `updateDays.js` — Dynamically generates available days for the next business week and configures form section routing

#### Sheet Scripts

- `wrapper.js` — Main entry point that orchestrates all automation on form submission

- `globalVars.js` — Central configuration for form, sheet, and calendar references

- `globalFunctions.js` — Utility functions for parsing data, generating content, and managing slots

- `updateForm.js` — Removes booked time slots from form choices in real-time

- `makeEvent.js` — Creates Google Calendar events with meeting details and guest invitations

- `makeMail.js` — Sends notification emails to designated recipients

- `dailyCheck.js` — Daily maintenance script that resets available time slots

**Key Features:**

- **Dynamic Slot Management** — Automatically removes booked slots from the form as responses come in

- **Calendar Integration** — Creates events with proper start/end times and sends invitations to participants

- **Email Notifications** — Sends detailed meeting confirmations including participant interests

- **Smart Day Selection** — Generates the next 5 business days while respecting excluded dates

- **Daily Reset** — Scheduled function to refresh slot availability each day

- **Flexible Configuration** — Easy customization of default slots, recipients, and excluded dates

---

### 3. Programmatic Array Display (v1.0.0)

**Purpose:** Utility for formatting array data into natural language strings.

**File:** `programmaticArrayDisplay.js`

**Features:**
- Converts arrays into grammatically correct sentences
- Handles proper comma placement and conjunctions
- Used within the timeslot automation for formatting user interests

---

## Setup Instructions

### Initial Configuration

1. **Copy the scripts** to your Google Apps Script project (Tools > Script Editor in your Google Sheet)

2. **Remove import/export statements** — Google Apps Script doesn't support ES6 modules, so comment out or delete any `import` and `export` statements

3. **Configure `globalVars.js`** with your specific IDs:
   ```javascript
   const CALENDAR_ID = 'your-calendar-id@group.calendar.google.com';
   const FORM_ID = 'your-form-id';
   const RECIPIENTS = ['email1@example.com', 'email2@example.com'];
   const DEFAULT_SLOTS = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '1:00 PM - 2:00 PM'];
   ```

4. **Set up DATA_INDEX** to match your form questions:
   ```javascript
   const DATA_INDEX = {
     'timestamp': 0,
     'name': 1,
     'email': 2,
     'day': 3,
     'Monday': 4,
     'Tuesday': 5,
     // Add indices for your specific form fields
   };
   ```

### Triggers Setup

For **Timeslot Automation v2**:

1. **Form Submit Trigger:**
   - Function: `wrapper`
   - Event source: From form
   - Event type: On form submit

2. **Daily Reset Trigger:**
   - Function: `dailyCheck`
   - Event source: Time-driven
   - Type: Day timer
   - Time of day: 12am to 1am (or your preference)

3. **Update Days Trigger (optional):**
   - Function: `updateDays`
   - Event source: Time-driven
   - Type: Day timer
   - Time of day: 12am to 1am

---

## Usage Notes

- **Time Zone:** Scripts automatically use `Session.getScriptTimeZone()` for proper date/time handling

- **Testing:** Use the `FAKE_DATA` object in v1 to test your data parsing logic before connecting to live forms

- **Excluded Dates:** Add holidays or blackout dates to the `EXCLUDED_DATES` array in `updateDays.js` using `YYYY-MM-DD` format

- **Email Sender:** Configure the `name` and `from` fields in `makeMail.js` for proper email attribution

- **Last Year Cleanup:** Use `clearLastYear()` function to delete old calendar events if needed

---

## Requirements

- Google Workspace account with access to:
  - Google Forms
  - Google Sheets
  - Google Calendar
  - Gmail

- Apps Script permissions for the above services

---

## License

MIT License - See [LICENSE](LICENSE) file for details

---

## Version History

- **v2.5.0** — Timeslot Automation with full calendar and email integration

- **v1.0.0** — Initial programmatic response acquisition template

---

## Support

For issues, questions, or contributions, please refer to the repository's issue tracker.