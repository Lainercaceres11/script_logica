const csvToJson = require('convert-csv-to-json');

const json: any[] = csvToJson.getJsonFromCsv(
  'time_series_covid19_deaths_US.csv'
);

const result: string[][] = json.map((value) => Object.values<string>(value));
const deathsByState: any = {};
const populationByState: any = {};

result.forEach((value: string[]) => {
  const currentValue: string[] = value[0].split(',');
  const state: string = currentValue[6];
  const population: number = parseInt(currentValue[13]);

  const deathCount: number = parseInt(currentValue.slice(-1)[0]);
  deathsByState[state] = deathCount + (deathsByState[state] || 0);
  populationByState[state] = {
    count: (populationByState[state]?.count || 0) + 1,
    population: population + (populationByState[state]?.population || 0),
  };
});

const sortDeathsByState = Object.entries<number>(deathsByState).sort(
  (a: [string, number], b: [string, number]) => a[1] - b[1]
);

const highestNumberDeaths = sortDeathsByState.slice(-1)[0];
const lowerNumberDeaths = sortDeathsByState[0];

console.log(highestNumberDeaths, lowerNumberDeaths);

/*
 Para calcular la tasa de mortalidad tenemos que dividir el número de muertes en un periodo
 entre la población media en dicho periodo y multiplicando el resultado por mil.

  (# muertes / pob. media) * 1000
*/
