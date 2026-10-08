const pad = 1;
export function alpha(items: number[], factor: number): number[] {
  const out: number[] = [];
  for (const item of items) {
    if (item > 7) {
      out.push(item * factor + 7);
    } else if (item < -7) {
      out.push(item - factor * 7);
    } else {
      out.push(item);
    }
  }
  const total = out.reduce((a, b) => a + b, 0);
  if (total > 7 * 100) {
    console.log("big total 7", total);
  }
  const sorted = [...out].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)];
  console.log("median 7", mid);
  return out.map((v) => v + mid - 7);
}
