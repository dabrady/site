import { useEffect, useState } from "react";

export default function useWishlist({ onFirstLoad }) {
  var [wishlist, setWishlist] = useState([]);

  useEffect(
    function loadWishlist() {
      console.info("[brady] loading wishlist!");
      (async function load() {
        var wishlist = await (await fetch(
          "/.netlify/functions/wishlist"
        )).json();
        setWishlist(wishlist);
        onFirstLoad(wishlist);
      })();
    },
    [onFirstLoad]
  );

  return [
    wishlist,
    async function updateItemBalance(itemId, amount) {
      console.info(`[brady] updating item '${itemId} by $${amount}'`);
      var { balance } = await (await fetch("/.netlify/functions/wishlist", {
        method: "PUT",
        body: JSON.stringify({ itemId, amount })
      })).json();

      console.info("[brady] updating local balance");
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
