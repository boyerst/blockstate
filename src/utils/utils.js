

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function formatDate(date) {
  return date.split("T")[0]
}
