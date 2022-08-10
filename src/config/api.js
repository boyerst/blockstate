

export const AllCoinsMarketData = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;



export const CoinMarketData = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;



export const CoinHistoricData = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;