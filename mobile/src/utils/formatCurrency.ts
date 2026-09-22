/**
 * Format number into Indonesian Rupiah currency format.
 * Example: 24560500 -> "Rp 24.560.500" or "24.560.500"
 */
export const formatIDR = (amount: number, showPrefix: boolean = true): string => {
  if (isNaN(amount)) return showPrefix ? 'Rp 0' : '0';
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return showPrefix ? `Rp ${formatted}` : formatted;
};
