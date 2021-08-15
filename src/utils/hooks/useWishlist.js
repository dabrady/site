import { useEffect, useState } from "react";

export default function useWishlist({ onFirstLoad } = {}) {
  var [wishlist, setWishlist] = useState([]);

  useEffect(
    function loadWishlist() {
      console.info("[brady] loading wishlist!");

      fetch("/.netlify/functions/wishlist", {
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (!response.ok) {
            console.error(`badness: these are the things`);
            var spreadsheetId = process.env.GATSBY_GOOGLE_SHEET_ID;
            var worksheetTitle = process.env.GATSBY_GOOGLE_SHEET_TAB_NAME;
            var rawCreds = process.env.GATSBY_GOOGLE_SERVICE_ACCOUNT_CREDS;
            console.log(spreadsheetId, worksheetTitle, rawCreds);
            console.log(rawCreds.replace(/\n/g, "\\n"));

            var creds = JSON.parse(
              /* Gotta escape those newlines */
              process.env.GATSBY_GOOGLE_SERVICE_ACCOUNT_CREDS.replace(
                /\n/g,
                "\\n"
              )
            );
            console.log(creds);

            throw new Error(
              `Error fetching wishlist: ${response.status} -- ${
                response.statusText
              }`
            );
          }
          return response.json();
        })
        .then(wishlist => {
          // NOTE(dabrady) Opting to filter out 'completed' items, as I don't
          // currently wish to display them.
          wishlist = wishlist.filter(item => item.price != item.balance);
          setWishlist(wishlist);
          onFirstLoad && onFirstLoad(wishlist);
        })
        .catch(console.error);
    },
    [onFirstLoad]
  );

  return [
    wishlist,
    async function updateItemBalance(itemId, amount) {
      console.debug(`[brady] updating item '${itemId}' by $${amount}`);
      var { balance } = await (await fetch("/.netlify/functions/wishlist", {
        method: "PUT",
        body: JSON.stringify({ itemId, amount })
      })).json();

      console.debug("[brady] updating local balance");
      setWishlist(
        wishlist.map(function updateLocalBalance(item) {
          if (item.item_id != itemId) return { ...item };
          return {
            ...item,
            balance
          };
        })
      );
    }
  ];
}
