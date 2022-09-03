

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDate = (date) => {
  return new Date().toLocaleString('en-US')   
}