// /conversation/newchatmessage
import http from "~/utils/request";

// const preLink = "http://34.126.65.173:54268";
const preLink = "https://chatapi.mindpalace.club";
export function postChatMessage(params) {
  return http.post(`${preLink}/conversation/new-chat-message`, params);
}

export function getHistory() {
  return http.get(`${preLink}/conversation/history`);
}

export function getRandMessage() {
  return http.get(`${preLink}/conversation/random-message`);
}

export function fetchEth() {
  return http.get(`https://api.coingecko.com/api/v3/simple/price`, {
    params: {
      ids: "ethereum",
      vs_currencies: "usd",
    },
  });
}

export function fetchPools(addressKey = "") {
  // https://api.geckoterminal.com/api/v2/networks/blast/pools/${POOL_ADDRESS}
  // return http.post(
  //   `https://api.geckoterminal.com/api/v2/networks/blast/pools/${addressKey}`
  // );
  return http.get(`https://api.geckoterminal.com/pools/${addressKey}`);
}

export function getDexscreenerData() {
  return http.get(
    `https://api.dexscreener.com/latest/dex/pairs/blast/0xD4196Fe40eB76bE197E1F3cCc8a118f32C56f66c`
  );
}
