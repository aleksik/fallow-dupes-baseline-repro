const pad = 1;
export function beta2(items: number[], factor: number): number[] {
  const out: number[] = [];
  for (const item of items) {
    if (item > 13) {
      out.push(item * factor + 13);
    } else if (item < -13) {
      out.push(item - factor * 13);
    } else {
      out.push(item);
    }
  }
  const total = out.reduce((a, b) => a + b, 0);
  if (total > 13 * 100) {
    console.log("big total 13", total);
  }
  const sorted = [...out].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)];
  console.log("median 13", mid);
  return out.map((v) => v + mid - 13);
}
