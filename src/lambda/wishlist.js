// Load any configured environment-specific variables.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

var itemCount = 10; // NOTE(dabrady) Hardcoded for efficiency, assumes no more than 10 items on list
var spreadsheetId = process.env.GOOGLE_SHEET_ID;
var worksheetTitle = process.env.GOOGLE_SHEET_TAB_NAME;
var creds = JSON.parse(
  /* Gotta escape those newlines */
  process.env.GOOGLE_SERVICE_ACCOUNT_CREDS.replace(/\n/g, "\\n")
);
var { GoogleSpreadsheet } = require("google-spreadsheet");

async function fetchDoc() {
  var doc = new GoogleSpreadsheet(spreadsheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  return doc;
}

// TODO(dabrady) camelCase column names
async function fetchData(worksheet) {
  // TODO How to determine how much to load?
  await worksheet.loadCells(`A2:D${itemCount}`);
  await worksheet.loadHeaderRow();
  var { loaded } = worksheet.cellStats;
  var columnCount = worksheet.headerValues.length;
  var rowCount = loaded / columnCount;

  console.log(worksheet.cellStats);
  var data = [];
  rowLoop: for (let r = 1; r < rowCount; r++) {
    var row = {};
    for (let c = 0; c < columnCount; c++) {
      var cell = worksheet.getCell(r, c).formattedValue;
      if (cell === null) {
        break rowLoop;
      }
      row[worksheet.headerValues[c]] = cell;
    }
    data.push(row);
  }

  return data;
}

async function updateItem({ worksheet, itemId, amount }) {
  console.log(
    `[brady] updating wishlist item: item ${itemId}, donating ${amount}`
  );
  // NOTE(dabrady) Using row ids as item ids
  var cellLocation = `D${itemId}`;
  await worksheet.loadCells(cellLocation);
  var cell = worksheet.getCellByA1(cellLocation);
  cell.value = parseFloat(cell.value) + amount;
  await worksheet.saveUpdatedCells();
  return cell.value;
}

export async function handler(event, context) {
  console.log(`[brady] handling wishlist request`, body);
  console.log(event, context);

  var { httpMethod, body } = event;
  try {
    var doc = await fetchDoc();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error
      })
    };
  }

  var worksheet = doc.sheetsByIndex[0];

  switch (httpMethod) {
    case "GET":
      console.log("[brady] fetching wishlist data");
      var data = await fetchData(worksheet);

      console.log(`[brady] data:`, data);
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
      break;
    case "PUT":
      var { itemId, amount } = JSON.parse(body);
      var balance = await updateItem({ worksheet, itemId, amount });
      return {
        statusCode: 200,
        body: JSON.stringify({
          itemId,
          balance
        })
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
