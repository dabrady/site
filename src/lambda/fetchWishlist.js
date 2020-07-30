// Load any configured environment-specific variables.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

var spreadsheetId = process.env.GATSBY_GOOGLE_SHEET_ID;
var worksheetTitle = process.env.GATSBY_GOOGLE_SHEET_TAB_NAME;
var creds = JSON.parse(process.env.GATSBY_GOOGLE_SERVICE_ACCOUNT_CREDS);

var { GoogleSpreadsheet } = require("google-spreadsheet");

async function fetchDoc() {
  var doc = new GoogleSpreadsheet(spreadsheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  return doc;
}

export async function handler(event, context) {
  console.debug(event, context);
  var { httpMethod, body } = event;
  var doc = await fetchDoc();
  var worksheet = doc.sheetsByIndex[0];

  switch (httpMethod) {
    case "GET":
      console.info("[brady] fetching wishlist data");
      // TODO How to determine how much to load?
      await worksheet.loadCells("A1:D2");
      await worksheet.loadHeaderRow();
      var { loaded } = worksheet.cellStats;
      var columnCount = worksheet.headerValues.length;
      var rowCount = loaded / columnCount;

      console.info(worksheet.cellStats);
      var data = [];
      for (let r = 1; r < rowCount; r++) {
        var row = {};
        for (let c = 0; c < columnCount; c++) {
          row[worksheet.headerValues[c]] = worksheet.getCell(
            r,
            c
          ).formattedValue;
        }
        data.push(row);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
      break;
    case "PUT":
      var { amountToDonate } = JSON.parse(body);
      console.info("[brady] updating wishlist data:", amountToDonate);
      return {
        statusCode: 200,
        body: JSON.stringify({})
      };
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `unsupported request method: ${httpMethod}`
        })
      };
      break;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({})
  };
}
