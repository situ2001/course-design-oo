import Store from 'electron-store';
import CarManager from '../models/CarManager';

const carManagers: Array<CarManager> = [];

// create CarManager
const store = new Store();
const carManagersFromStore = store.get('carManager') as {
  id: string;
  key: string;
}[];

carManagersFromStore.forEach((manager) => {
  const o = new CarManager(manager.id, manager.key);
  carManagers.push(o);
});

/**
 * helper function for login
 * @param id your input id(plain)
 * @param keyPlain your input key(plain)
 * @returns login success or not
 */
export default function login(id: string, key: string) {
  return carManagers.some((manager) => manager.login(id, key));
}
