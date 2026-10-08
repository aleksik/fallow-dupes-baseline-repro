const pad = 1;
export function gamma(items: number[], factor: number): number[] {
  const out: number[] = [];
  for (const item of items) {
    if (item > 29) {
      out.push(item * factor + 29);
    } else if (item < -29) {
      out.push(item - factor * 29);
    } else {
      out.push(item);
    }
  }
  const total = out.reduce((a, b) => a + b, 0);
  if (total > 29 * 100) {
    console.log("big total 29", total);
  }
  const sorted = [...out].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)];
  console.log("median 29", mid);
  return out.map((v) => v + mid - 29);
}
