export function formatPrice(price, currency = 'ETB') {
  if (price === null || price === undefined || price === '') return null;
  const n = Number(price);
  if (Number.isNaN(n)) return null;
  return `${currency} ${n.toLocaleString('en-US')}`;
}

export function normalize(text) {
  return (text || '').toString().toLowerCase().normalize('NFKD');
}
