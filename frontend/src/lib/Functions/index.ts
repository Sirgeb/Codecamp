export const trimText = (text: string, limit: number) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text
}
  
export const formatFee = (fee: number) => {
  return (fee).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export const formatNumberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
