function getRandomEntry() {
  const min = 0;
  const max = 6;
  const result = Math.floor(Math.random() * (max - min) + min);
  if (result === 0 || result === 1 || result === 2) return "A";
  if (result === 3 || result === 4) return "1";
  if (result === 5) return "0";
}

export function createRow() {
  const tr = document.createElement("tr");
  const values = Array.from(Array(7)).map(getRandomEntry);
  values.forEach((cellItem) => {
    const th = document.createElement("th");
    if (cellItem === "1") th.style.background = "cadetblue";
    if (cellItem === "0") th.style.background = "red";
    th.innerHTML = cellItem;
    tr.appendChild(th);
  });
  return { tr, values };
}

export function createRowFromValues(array) {
  const tr = document.createElement("tr");
  array.forEach((cellItem) => {
    const th = document.createElement("th");
    if (cellItem === "1") th.style.background = "cadetblue";
    if (cellItem === "0") th.style.background = "red";
    th.innerHTML = cellItem;
    tr.appendChild(th);
  });
  return { tr };
}
