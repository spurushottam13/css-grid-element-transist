### [Demo URL](https://geta.onrender.com/)


### Algo Implementation

```
Motivation
  - to arrange RED box (PCE) nearest to Blue box (DDE)

Steps for individual Row
  - let the array be the array representing the each cell of row
  - i)   reduce the array by merging the entity with same nature into one, example: ['A', '1', '1' ,'0',] => ['A','11','0']
  - ii)  if the array does not contain any PCE ('0'); return the array
  - iv)  start a loop over the array with a variable PCEi (i>0; i < array.length)
    - a) if PCEi  adjacent to DDE, increment the i.
    - b) if PCEi NOT adjacent to DDE
      - move PCEi one unit in direction of the nearest DDE
      - return to steps iv)
  - vi) expand the array and let it be expandedArray
  - v)  return expandedArray
```
