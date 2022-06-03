"use strict";
const csvToJson = require('convert-csv-to-json');
const json = csvToJson.getJsonFromCsv('time_series_covid19_deaths_US.csv');
const result = json.map((value) => Object.values(value));
const deathsByState = {};
const populationByState = {};
result.forEach((value) => {
    var _a, _b;
    const currentValue = value[0].split(',');
    const state = currentValue[6];
    const population = parseInt(currentValue[13]);
    const deathCount = parseInt(currentValue.slice(-1)[0]);
    deathsByState[state] = deathCount + (deathsByState[state] || 0);
    populationByState[state] = {
        count: (((_a = populationByState[state]) === null || _a === void 0 ? void 0 : _a.count) || 0) + 1,
        population: population + (((_b = populationByState[state]) === null || _b === void 0 ? void 0 : _b.population) || 0),
    };
});
const sortDeathsByState = Object.entries(deathsByState).sort((a, b) => a[1] - b[1]);
const highestNumberDeaths = sortDeathsByState.slice(-1)[0];
const lowerNumberDeaths = sortDeathsByState[0];
console.log(highestNumberDeaths, lowerNumberDeaths);
/*
 Para calcular la tasa de mortalidad tenemos que dividir el número de muertes en un periodo
 entre la población media en dicho periodo y multiplicando el resultado por mil.

  (# muertes / pob. media) * 1000
*/
