export function calculateDiscountedPrice(price: number, discount: number): number {
    return parseFloat((price * (1 - discount / 100)).toFixed(2));
}