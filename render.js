function createRow() {
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

function createRowFromValues(array) {
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
