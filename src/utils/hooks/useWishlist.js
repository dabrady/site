import { useEffect, useState } from "react";

export default function useWishlist({ onFirstLoad } = {}) {
  var [wishlist, setWishlist] = useState([]);

  useEffect(
    function loadWishlist() {
      console.info("[brady] loading wishlist!");

      fetch("/.netlify/functions/wishlist")
        .then(response => {
          if (!response.ok) {
            throw new Error(
              `Error fetching wishlist: ${response.status} -- ${
                response.statusText
              }`
            );
          }
          console.info("[brady] response is:", response);
          return response.json();
        })
        .then(wishlist => {
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
