import Store from 'electron-store';
import MD5 from 'crypto-js/md5';

/**
 * check config file
 */
export default function checkConfigFile(): void {
  const store = new Store();
  // check some config keys
  if (!store.has('carManager')) {
    // if carManager does not existed in store, set default manager
    store.set('carManager', [
      {
        id: '114',
        key: MD5('514').toString(),
      },
    ]);
  } else {
    const managers = store.get('carManager') as { id: string; key: string }[];

    if (managers.length === 0) {
      // if carManager is empty, set default manager
      store.set('carManager', [
        {
          id: '114',
          key: MD5('514').toString(),
        },
      ]);
    } else {
      managers.forEach((manager) => {
        if (!manager.key.match(/^[a-fA-F0-9]{32}$/g)) {
          // if key does not match the expr, convert it to MD5
          manager.key = MD5(manager.key).toString();
        }
      });
      store.set('carManager', managers);
    }
  }
  if (!store.has('MAX_NUMBER_OF_SPOTS')) {
    store.set('MAX_NUMBER_OF_SPOTS', 27);
  }
}
