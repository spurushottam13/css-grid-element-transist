import { getRandomEntry } from "./utils.js";

const table = document.querySelector("#gridArea");

function createRow() {
  const tr = document.createElement("tr");
  Array.from(Array(7))
    .map(getRandomEntry)
    .forEach((cellItem) => {
      const th = document.createElement("th");
      if (cellItem === "1") th.style.background = "cadetblue";
      if (cellItem === "0") th.style.background = "red";
      th.innerHTML = cellItem;
      tr.appendChild(th);
    });
  return tr;
}
// 1 => DDE
// 0 => PCE

function populateTable() {
  table.innerHTML = "";

  Array.from(Array(5))
    .map(Boolean)
    .forEach((_) => {
      table.appendChild(createRow());
    });
}

// populateTable();

function checkForAdjacent(cells, zeroIndex) {
  if (zeroIndex === 0) return cells[1] === "1";
  return cells[zeroIndex - 1] === "1" || cells[zeroIndex + 1] === "1";
}

function getMovingDirection(arr, zeroIndex) {
  let leftDistance;
  let rightDistance;
  for (let rightSteps = zeroIndex; rightSteps < arr.length; rightSteps++) {
    console.log({ rightSteps });
    if (arr[rightSteps] === "1") {
      rightDistance = rightSteps - zeroIndex;
      break;
    }
  }
  for (let leftStep = zeroIndex; leftStep > 0; leftStep--) {
    if (arr[leftStep] === "1") {
      leftDistance = zeroIndex - leftStep;
      break;
    }
  }
  console.log(leftDistance, rightDistance);
  if (!leftDistance && rightDistance) return "RIGHT";
  if (!rightDistance && leftDistance) return "LEFT";
  if (!leftDistance || !rightDistance) return "NO";
  if (leftDistance <= rightDistance) return "LEFT";
  return true;
}

function reflowRow(...cells) {
  console.log("InputCells", cells);
  if (cells.includes("0") === false) {
    console.log("No Zero", cells);
    return true;
  }
  for (let i = 0; i < cells.length; i++) {
    const item = cells[i];
    if (item === "0") {
      const isAdjacent = checkForAdjacent(cells, i);
      console.log({ isAdjacent });
      if (isAdjacent === false) {
        const direction = getMovingDirection(cells, i);
        console.log({ direction });
        if (direction === "LEFT") {
          const newCells = [...cells];
          newCells[i] = cells[i - 1];
          newCells[i - 1] = cells[i];
          return reflowRow(...newCells);
        }
        if (direction === "RIGHT") {
          const newCells = [...cells];
          newCells[i] = cells[i + 1];
          newCells[i + 1] = cells[i];
          //   console.log({ newCells });
          return reflowRow(...newCells);
        }
      }
    }
  }
  console.log("Output", cells);
  return cells;
}

reflowRow("A", "0", "A", "A", "1", "1", "A");
