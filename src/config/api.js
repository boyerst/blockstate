


export const AllCoinsMarketData = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d`;


export const CoinMarketData = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;


export const CoinHistoricData = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;


export const TopCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;


export const TrendingCoins = () =>
  `https://api.coingecko.com/api/v3/search/trending`;


export const GlobalMarketData = () =>
  `https://api.coingecko.com/api/v3/global`;

export const TrendingCoinsData = (ids, currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&sparkline=false`