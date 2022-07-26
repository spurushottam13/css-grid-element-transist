const isDDE = (input) => typeof input === "string" && input.includes("1");
const isPCE = (input) => typeof input === "string" && input.includes("0");

// Test for the element weather it's adjacent to DDE(Default design Empty) cell
const checkForAdjacent = (cells, zeroIndex) =>
  isDDE(cells[zeroIndex - 1]) || isDDE(cells[zeroIndex + 1]);

// Reduce the array by merging the same consecutive entity into one
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

// Expand the array by splitting the merged entity
const expandArray = (arr) =>
  arr
    .map((item) => {
      if (item.length > 1) {
        return item.split("");
      }
      return item;
    })
    .flat();

/**
 * Find the direction which has the nearest DDE (Default Design Empty) cell
 * @param {string[]} arr
 * @param {number} zeroIndex
 * @returns
 */
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

/**
 * Re-arranges the element with intention of keeping DDE & PCE near to each other,
 * but not moving the DDE
 * Steps:
 * - reduce the array by merging the entity with same nature
 * - [return] if arguments does not contain any PCE
 * - if argument contains PCE
 *   - [return] if PCE is adjacent to DDE
 *   - get the direction for the nearest DDE and move the PCE one unit in this direction
 *   - repeat the steps
 * @param  {...string} cells
 * @returns
 */
export function transitRowElement(...cells) {
  cells = reducedArray(cells);
  if (cells.filter(isPCE).length < 1) {
    return expandArray(cells);
  }
  for (let i = 0; i < cells.length; i++) {
    const item = cells[i];
    if (isPCE(item)) {
      const isAdjacent = checkForAdjacent(cells, i);
      if (isAdjacent === false) {
        const direction = getMovingDirection(cells, i);
        if (direction === "LEFT") {
          const newCells = [...cells];
          newCells[i] = cells[i - 1];
          newCells[i - 1] = cells[i];
          return transitRowElement(...newCells);
        }
        if (direction === "RIGHT") {
          const newCells = [...cells];
          newCells[i] = cells[i + 1];
          newCells[i + 1] = cells[i];
          return transitRowElement(...newCells);
        }
      }
    }
  }
  return expandArray(cells);
}
