export function getRandomEntry() {
  const min = 0;
  const max = 6;
  const result = Math.floor(Math.random() * (max - min) + min);
  if (result === 0 || result === 1 || result === 2) return "A";
  if (result === 3 || result === 4) return "1";
  if (result === 5) return "0";
}
