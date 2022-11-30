const fruits = [
  'apple',
  'banana',
  'canteloupe',
  'durian',
  'fig',
  'grape',
];

// const bestFruit = fruits[0];
// const secondBest = fruits[1];
// const thirdBest = fruits[2];

{
  const [bestFruit, secondBest, thirdBest, ...allTheRest] = fruits;
}

{
  const [fruit1, fruit2, fruit3] = fruits;

  let i = 0;
  fruits.forEach(fruit => {
    process[`fruit${i}`] = fruit;
    i++
  });
}

{
  const fruitsButAnObjNow = {
    bestFruit: 'apple',
    secondBest: 'banana',
    thirdBest: 'canteloupe',
    grossFruit: 'durian',
  };
  // Just use the key name
  const { secondBest, bestFruit, thirdBest } = fruitsButAnObjNow;

  // Rename it
  const { secondBest: silverMedal, bestFruit: goldMedal, thirdBest: bronzeMedal } = fruitsButAnObjNow;
  console.log(goldMedal === fruitsButAnObjNow.bestFruit); // This will be true
}
