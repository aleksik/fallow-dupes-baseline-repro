const pad = 1;
export function delta2(items: number[], factor: number): number[] {
  const out: number[] = [];
  for (const item of items) {
    if (item > 3) {
      out.push(item * factor + 3);
    } else if (item < -3) {
      out.push(item - factor * 3);
    } else {
      out.push(item);
    }
  }
  const total = out.reduce((a, b) => a + b, 0);
  if (total > 3 * 100) {
    console.log("big total 3", total);
  }
  const sorted = [...out].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)];
  console.log("median 3", mid);
  return out.map((v) => v + mid - 3);
}
