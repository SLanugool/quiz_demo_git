function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).evaluate().getContent();
}

/**
 * Serves the login HTML page when a GET request is received.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

/**
 * Checks the provided login credentials against the data in the spreadsheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {boolean} True if credentials match, false otherwise.
 */
function checkLogin(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('1-lAs2-ly3e4HtTrM_XNjSGnT8s2AiFHyFcSkm-JTAlE');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('userlogin');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();

  // Loop through the data to find a matching email and password
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == email && data[i][1] == password) {
      return true; // Match found
    }
  }
  return false; // No match found
}

/**
 * Retrieves the HTML content for the menu page.
 * @return {HtmlOutput} The HTML content of the menu page.
 */
function getMenuPage() {
  return HtmlService.createHtmlOutputFromFile('main').getContent();
}

/**
 * Retrieves the HTML content for the registration page.
 * @return {HtmlOutput} The HTML content of the registration page.
 */
function getRegistrationPage() {
  return HtmlService.createHtmlOutputFromFile('registration').getContent();
}

/**
 * Retrieves the HTML content for the login page.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function getLoginPage() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

/**ผู้ใช้ลงทะเบียนใหม่*/ 

function registerNewUser(obj){
  var ss = SpreadsheetApp.openById('1-lAs2-ly3e4HtTrM_XNjSGnT8s2AiFHyFcSkm-JTAlE').getSheetByName('userlogin')
  var header = ss.getRange(1,1,1,ss.getLastColumn()).getValues()[0]
  var row = []
  Object.keys(obj).forEach(key=>{
    row[header.indexOf(key)] = obj[key]
  })
  ss.appendRow(row)
  return true
}






