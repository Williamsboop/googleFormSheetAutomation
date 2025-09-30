//IMPORTS and EXPORTS aren't needed for Google Apps Script, Remove these in Google Apps Script editor.//
import { DATA_INDEX } from "./globalVars.js";
//IMPORTS and EXPORTS aren't needed for Google Apps Script, Remove these in Google Apps Script editor.//



// TESTING VARIABLES //
const FAKE_DATA  = {
  values: [
    "Ad Campaign #52",
    "test.user@example.com",
    "Monday - October 6, 2025",
    "9:00 AM - 10:00 AM",
    "Digital Advertising, Print Advertising"
  ]
};
// TESTING VARIABLES //



//REMOVE export FROM ALL GLOBAL VARS & FUNCTIONS WHEN TRANSFER CODE TO GOOGLE APPS SCRIPT EDITOR.//
// Returns an array of all response data using global DATA_INDEX for accurate data acquisition. //
function getResponse(data) {
    return [...data.values];
}
//REMOVE export FROM ALL GLOBAL VARS & FUNCTIONS WHEN TRANSFER CODE TO GOOGLE APPS SCRIPT EDITOR.//



// TEST FUNCTIONS //
function responseTest() {
  let responseData = getResponse(FAKE_DATA)
  console.log(`User's Email: ${responseData[DATA_INDEX['email']]}`)
  console.log(`User is interested in: ${responseData[DATA_INDEX['interests']]}`)
}
responseTest()
// TEST FUNCTIONS //