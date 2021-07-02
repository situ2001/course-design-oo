import MD5 from 'crypto-js/md5';

/**
 * CarManager, used when you log in the manager page.
 */
export default class CarManager {
  private id: string;

  private key: string;

  /**
   * construct a CarManager
   * @param id manager's id(plain)
   * @param keyMD5 manager's key(MD5)
   */
  constructor(id: string, keyMD5: string) {
    this.id = id;
    this.key = keyMD5;
  }

  /**
   * check the input id(plain) and key(plain) to determine that you can enter the manager page
   * @param id your input id(plain)
   * @param keyPlain your input key(plain)
   * @returns login success or not
   */
  public login(id: string, keyPlain: string): boolean {
    return id === this.id && MD5(keyPlain).toString() === this.key;
  }
}
