/**
 * KitchenProof Waitlist — Google Apps Script
 *
 * SETUP INSTRUCTIONS
 * ──────────────────
 * 1. Go to https://sheets.new  →  create a new Google Sheet
 * 2. Name it "KitchenProof Waitlist"
 * 3. Add these headers in Row 1:
 *    A: Timestamp  |  B: Name  |  C: Email  |  D: Kitchen  |  E: Locations
 *
 * 4. Open Extensions → Apps Script
 * 5. Delete the placeholder code and paste the entire contents of this file
 * 6. Click Save (Ctrl+S)
 *
 * 7. Click "Deploy" → "New deployment"
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click Deploy → Authorize when prompted
 *
 * 8. Copy the Web app URL (looks like https://script.google.com/macros/s/ABC.../exec)
 * 9. Paste it into index.html as the value of APPS_SCRIPT_URL
 *
 * That's it — every waitlist submission will appear as a new row in your Sheet.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getActiveSheet();

    const params = e.parameter || {};

    sheet.appendRow([
      params.timestamp  || new Date().toISOString(),
      params.name       || '',
      params.email      || '',
      params.kitchen    || '',
      params.locations  || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allows CORS pre-flight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'alive' }))
    .setMimeType(ContentService.MimeType.JSON);
}
