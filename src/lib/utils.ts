export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pl-PL').format(num)
}
