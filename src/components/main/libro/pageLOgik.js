// PLANUNG
// INPUT: // [ "Zeile 1", "Zeile 2", "Zeile 3", "Zeile 4", "Zeile 5", "Zeile 6", "Zeile 7" ]
// OUTPUT DESIRED -> array of batches: // [ ["Zeile 1", "Zeile 2", "Zeile 3"], ["Zeile 4", "Zeile 5", "Zeile 6"], ["Zeile 7"] ]

// 1 Seite => 3 zeilen
// const arrZeilen = [ "Zeile 1", "Zeile 2", "Zeile 3", "Zeile 4", "Zeile 5", "Zeile 6", "Zeile 7" ]
// const arrZeilen = [ "Zeile 1", "Zeile 2" ]
const arrZeilen = ['Zeile 1', 'Zeile 2', 'Zeile 3', 'Zeile 4', 'Zeile 5'];

const batchSize = 3;
const amountBatches = Math.ceil(arrZeilen.length / batchSize);

// FOR EVERY BATCH => extract a batch using slice

const batches = [];
for (let i = 0; i < amountBatches; i++) {
  const batch = arrZeilen.slice(i * batchSize, i * batchSize + batchSize);
  batches.push(batch);
}

console.log(batches);

// RENDERING

// arrBatches.forEach( (page, i) => {

//   console.log("Page: ", i+1)

//   page.forEach(zeile => {
//     console.log("--", zeile)
//   })

// })
