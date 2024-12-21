export function priceCalc(itemsNum: number) {
  const basePrice = 6;
  const discounts: { [key: string]: number } = {
    2: 1,
    3: 0.9,
    4: 0.8,
    5: 0.7,
  };
  const discount = discounts[itemsNum] ?? 1;

  const outputPrice = basePrice * itemsNum * discount;
  return outputPrice?.toFixed(2);
}
