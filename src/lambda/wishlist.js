// Load any configured environment-specific variables.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

var spreadsheetId = process.env.GATSBY_GOOGLE_SHEET_ID;
var worksheetTitle = process.env.GATSBY_GOOGLE_SHEET_TAB_NAME;
var creds = JSON.parse(process.env.GATSBY_GOOGLE_SERVICE_ACCOUNT_CREDS);
var itemCount = 10; // NOTE(dabrady) Hardcoded for efficiency, assumes no more than 10 items on list

var { GoogleSpreadsheet } = require("google-spreadsheet");

async function fetchDoc() {
  var doc = new GoogleSpreadsheet(spreadsheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  return doc;
}

async function fetchData(worksheet) {
  // TODO How to determine how much to load?
  await worksheet.loadCells(`A2:D${itemCount}`);
  await worksheet.loadHeaderRow();
  var { loaded } = worksheet.cellStats;
  var columnCount = worksheet.headerValues.length;
  var rowCount = loaded / columnCount;

  console.info(worksheet.cellStats);
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
  console.info(
    `[brady] updating wishlist item: item ${itemId}, donating ${amount}`
  );
  // NOTE(dabrady) Using row ids as item ids
  var cellLocation = `D${itemId}`;
  await worksheet.loadCells(cellLocation);
  var cell = worksheet.getCellByA1(cellLocation);
  cell.value = cell.value + amount;
  await worksheet.saveUpdatedCells();
  return cell.value;
}

export async function handler(event, context) {
  console.debug(event, context);
  var { httpMethod, body } = event;
  var doc = await fetchDoc();
  var worksheet = doc.sheetsByIndex[0];

  switch (httpMethod) {
    case "GET":
      console.info("[brady] fetching wishlist data");
      var data = await fetchData(worksheet);

      console.info(`[brady] data:`, data);
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
