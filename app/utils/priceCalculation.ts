export function priceCalc(itemsNum: number) {
  const basePrice = 3.5;
  const discounts: { [key: string]: number } = {
    2: 1,
    3: 0.9,
    4: 0.85,
    5: 0.8,
  };
  const discount = discounts[itemsNum] ?? 1;

  const outputPrice = basePrice * itemsNum * discount;
  //fixed subcurrency factor for PLN = 100
  const subcurrencyPrice = outputPrice * 100;
  const displayPrice = outputPrice.toFixed(2);
  return { displayPrice, subcurrencyPrice };
}
