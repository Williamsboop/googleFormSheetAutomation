const CALENDAR_ID = ''; // Put Calendar ID here.
const FORM_ID = ''; // Put Form ID here.
const CALENDAR = CalendarApp.getCalendarById(CALENDAR_ID);
const FORM = FormApp.openById(FORM_ID);
const SHEET = SpreadsheetApp.getActiveSheet();

const ALIAS = ''; // Put gmail alias here.
const RECIPIENTS = [/*'name@domain.com',*/];

const TIMEZONE = Session.getScriptTimeZone();

const DATA_INDEX = {
  /*'dataName' : dataIndex,*/
};

const DATE_COL = 3;
const MONTHS = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12
};

const DEFAULT_SLOTS = [/*"10:00 AM - 12:00 PM",*/];