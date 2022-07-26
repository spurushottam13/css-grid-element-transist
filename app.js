import { getRandomEntry } from "./utils.js";
import { createRow, createRowFromValues } from "./render.js";

const tableInput = document.querySelector("#gridArea-input");
const tableOutput = document.querySelector("#gridArea-output");
const btnEl = document.querySelector("#button");

const isDDE = (input) => typeof input === "string" && input.includes("1");
const isPCE = (input) => typeof input === "string" && input.includes("0");


const rowArray = [];
function populateTable() {
  tableInput.innerHTML = "";

  Array.from(Array(5))
    .map(Boolean)
    .forEach((_) => {
      const { tr, values } = createRow();
      rowArray.push(values);
      tableInput.appendChild(tr);
    });
}

populateTable();

function checkForAdjacent(cells, zeroIndex) {
  if (cells[zeroIndex + 1] === "0") return true;
  if (zeroIndex === cells.length - 1) return true;
  console.log({ zeroIndex, cells });
  return isDDE(cells[zeroIndex - 1] || isDDE(cells[zeroIndex + 1])
}

function getMovingDirection(arr, zeroIndex) {
  let leftDistance;
  let rightDistance;
  for (let rightSteps = zeroIndex; rightSteps < arr.length; rightSteps++) {
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
  if (!leftDistance && rightDistance) return "RIGHT";
  if (!rightDistance && leftDistance) return "LEFT";
  if (!leftDistance || !rightDistance) return "NO";
  if (leftDistance <= rightDistance) return "LEFT";
  return true;
}
let maxAttemp = 3;
function reflowRow(...cells) {
  if (maxAttemp > 5) throw new Error("knksd");
  maxAttemp += 1;
  console.log("InputCells", cells);
  if (cells.includes("0") === false) {
    console.log("No Zero");
    return cells;
  }
  for (let i = 0; i < cells.length; i++) {
    const item = cells[i];
    if (item === "0") {
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
  console.log("Output", cells);
  return cells;
}

btnEl.onclick = function () {
  rowArray.forEach((rowItems, index) => {
    const result = reflowRow(...rowItems);
    console.groupCollapsed("Row no", index);
    console.table(rowItems);
    console.table(result);
    console.groupEnd();
    const { tr } = createRowFromValues(result);
    tableOutput.appendChild(tr);
  });
};

console.log(reflowRow(...["0", "1", "1", "A", "0", "0", "A"]));

// ['0', '1', '1', 'A', '0', '0', 'A'] => infinite
