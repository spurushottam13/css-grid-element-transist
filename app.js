import { createRow, createRowFromValues } from "./render.js";

const tableInput = document.querySelector("#gridArea-input");
const tableOutput = document.querySelector("#gridArea-output");
const btnEl = document.querySelector("#button");

const isDDE = (input) => typeof input === "string" && input.includes("1");
const isPCE = (input) => typeof input === "string" && input.includes("0");

function checkForAdjacent(cells, zeroIndex) {
  return isDDE(cells[zeroIndex - 1]) || isDDE(cells[zeroIndex + 1]);
}

function getMovingDirection(arr, zeroIndex) {
  let leftDistance;
  let rightDistance;
  for (let rightSteps = zeroIndex; rightSteps < arr.length; rightSteps++) {
    if (isDDE(arr[rightSteps])) {
      rightDistance = rightSteps - zeroIndex;
      break;
    }
  }
  for (let leftStep = zeroIndex; leftStep > 0; leftStep--) {
    if (isDDE(arr[leftStep])) {
      leftDistance = zeroIndex - leftStep;
      break;
    }
  }
  if (!leftDistance && rightDistance) return "RIGHT";
  if (!rightDistance && leftDistance) return "LEFT";
  if (!leftDistance || !rightDistance) return "NO";
  if (leftDistance <= rightDistance) return "LEFT";
  return true;
}

const reducedArray = (arr) =>
  arr
    .map((item, index) => {
      const nextValue = arr[index + 1];
      if (nextValue && nextValue.includes(item)) {
        arr[index + 1] = undefined;
        return item + nextValue;
      }
      return item;
    })
    .filter(Boolean);

const expandArray = (arr) =>
  arr
    .map((item) => {
      if (item.length > 1) {
        return item.split("");
      }
      return item;
    })
    .flat();

function reflowRow(...cells) {
  console.log("Input", cells);
  cells = reducedArray(cells);
  console.log("Reflow", cells);
  if (cells.filter(isPCE).length < 1) {
    console.log("No Zero");
    return expandArray(cells);
  }
  for (let i = 0; i < cells.length; i++) {
    const item = cells[i];
    if (isPCE(item)) {
      const isAdjacent = checkForAdjacent(cells, i);
      console.log({ isAdjacent, i });
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
          return reflowRow(...newCells);
        }
      }
    }
  }
  console.log("Output", expandArray(cells));
  return expandArray(cells);
}

function populateTable() {
  const rowArray = [];
  tableOutput.innerHTML = "";
  tableInput.innerHTML = "";
  Array.from(Array(5))
    .map(Boolean)
    .forEach((_) => {
      const { tr, values } = createRow();
      rowArray.push(values);
      tableInput.appendChild(tr);
    });
  rowArray.forEach((rowItems, index) => {
    const result = reflowRow(...rowItems);
    console.groupCollapsed("Row no", index);
    console.table(rowItems);
    console.table(result);
    console.groupEnd();
    const { tr } = createRowFromValues(result);
    tableOutput.appendChild(tr);
  });
}
btnEl.onclick = populateTable;
populateTable();

// console.log(reflowRow(...["0", "A", "A", "0", "A", "1", "1"]));

// ['0', '1', '1', 'A', '0', '0', 'A'] => infinite
// ['0',	'A',	'A','0'	,'A'	,'1',	'1'] => infinite
