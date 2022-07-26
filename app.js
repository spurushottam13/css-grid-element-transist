import { transitRowElement } from "./algo.js";
import { createRow, createRowFromValues } from "./render.js";

const tableInput = document.querySelector("#gridArea-input");
const tableOutput = document.querySelector("#gridArea-output");
const btnEl = document.querySelector("#button");

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
    const result = transitRowElement(...rowItems);
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

// console.log(transitRowElement(...["0", "A", "A", "0", "A", "1", "1"]));
