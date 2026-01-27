export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pl-PL').format(num)
}

export function formatProfit(profit: number): string {
  if (profit > 0) {
    return `+${formatNumber(profit)}`
  }
  return formatNumber(profit)
}