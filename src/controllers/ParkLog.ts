/* eslint-disable import/prefer-default-export */
// modules that hold the log for the park lot

import Store from 'electron-store';
// eslint-disable-next-line import/no-cycle
import Car from '../models/Car';

const store = new Store();

const parkingLog = store.has('parkingLog')
  ? (store.get('parkingLog') as Car[])
  : Array<Car>();

/**
 * add a Car to log
 * @param car the car being added to log
 */
export function addToLog(car: Car) {
  // the car was left
  if (car.cost !== undefined) {
    parkingLog.push(car);
    store.set('parkingLog', parkingLog);
  }
}

/**
 * get `parkLog`
 * @param reverse get log of reversed order
 * @returns a copy of the log
 */
export function getLog(reverse = false) {
  const tmp = parkingLog.slice();
  return reverse ? tmp.reverse() : tmp;
}

/**
 * clear `parkLog`
 */
export function clearLog() {
  while (parkingLog.length > 0) {
    parkingLog.pop();
  }
  store.set('parkingLog', parkingLog);
}

/**
 * get total cost from `parkLog`
 * @returns total cost
 */
export function getTotalCost() {
  let cost = 0;
  parkingLog.forEach((e) => {
    cost += e.cost ?? 0;
  });
  return cost.toFixed(2);
}

/**
 * get the costs prospectively according to the model of Car
 * @returns an array of object `{ type: string; value: number }` that contains the car type and the cost of each car type
 */
export function getCostByModel() {
  const modelCostMap = new Map<string, { type: string; value: number }>();
  for (let i = 0; i < parkingLog.length; i += 1) {
    const { model, cost } = parkingLog[i];
    if (!modelCostMap.has(model)) {
      modelCostMap.set(model, { type: model, value: cost as number });
    } else {
      const prev = modelCostMap.get(model);
      if (prev !== undefined) {
        modelCostMap.set(model, {
          ...prev,
          value: prev.value + (cost as number),
        });
      }
    }
  }

  return Array.from(modelCostMap.values()).map((v) => ({
    ...v,
    value: Number(v.value.toFixed(2)),
  }));
}
