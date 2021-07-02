/* eslint-disable import/prefer-default-export */
import Store from 'electron-store';
import Car from '../models/Car';
import { province } from '../models/Data';

const store = new Store();

// every spots may have a car or not
// TODO read from local file
const MAX_NUMBER_OF_SPOTS = store.get('MAX_NUMBER_OF_SPOTS') as number ?? 30;

let spots = new Array<Car | null>(MAX_NUMBER_OF_SPOTS).fill(null);

/**
 * build Car from store
 * @param item a Car
 * @returns a built `Car`
 */
function carFactory(item: Car) {
  const car = new Car(item.number, item.model);
  car.enterTime = item.enterTime;
  car.quitTime = item?.quitTime;
  car.cost = item?.cost;
  return car;
}

// push Car from store into spots
const spotsFromStore = store.get('spots') as Array<Car | null> ?? null;
if (Array.isArray(spotsFromStore) && spotsFromStore.length === MAX_NUMBER_OF_SPOTS) {
  spots = [];

  spotsFromStore.forEach(item => {
    if (item === null) {
      spots.push(null);
    } else {
      spots.push(carFactory(item));
    }
  });
}

/**
 * @returns current spots
 */
export function currentSpots(): (Car | null)[] {
  return spots.slice();
}

/**
 * park a `Car`
 * @param car a `Car`
 * @param index the index to be parked
 */
export function park(car: Car, index: number): void {
  spots[index] = car;
  store.set('spots', spots);
}

/**
 * impl for 一键抢位
 * @param cb the callback used for showing a message in View
 */
export function randomParking(cb: (hint: string) => void) {
  let isSuccess = false;
  for (let i = 0; i < spots.length; i += 1) {
    if (spots[i] === null) {
      const num = `${province[Math.floor(province.length * Math.random())]} ${String.fromCharCode(65+Math.floor(Math.random() * 26))}${(Math.floor((Math.random() + 1) * 10000)).toFixed(0)}`;
      park(new Car(num, ['SMALL', 'NORMAL', 'LARGE'][Math.floor(Math.random() * 3)]), i);
      isSuccess = true;
    }
  }
  if (isSuccess) {
    cb('一键抢位成功');
  } else {
    cb('没有位置了');
  }
}

/**
 * leave a `Car`
 * @param index the index the `Car` being left
 */
export function leave(index: number): void {
  if (spots[index] !== null) {
    const car = spots[index];
    car?.leave();
    spots[index] = null;
    store.set('spots', spots);
  }
}

/**
 * leave all the car, impl for 一键离场
 * @param cb the callback used for showing a message in View
 */
export function leaveAll(cb: (hint: string) => void): void {
  let isSuccess = false;
  for (let i = 0; i < spots.length; i += 1) {
    if (spots[i] !== null) {
      leave(i);
      isSuccess = true;
    }
  }
  if (isSuccess) {
    cb('一键离场成功');
  } else {
    cb('没有车了');
  }
}

/**
 * get available spots
 * @returns array that contains available spots and total spots
 */
// eslint-disable-next-line prettier/prettier
export function availableSpots(): [available: number, total: number] {
  return [spots.filter((v) => v === null).length, spots.length];
}
