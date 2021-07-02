// class Car and class carType

// eslint-disable-next-line import/no-cycle
import { addToLog } from '../controllers/ParkLog';

const carModelToPrice = new Map<string, number>();
carModelToPrice.set('SMALL', 5);
carModelToPrice.set('NORMAL', 10);
carModelToPrice.set('LARGE', 15);

export const modelEngToChn = new Map<string, string>();
modelEngToChn.set('SMALL', '小型车');
modelEngToChn.set('NORMAL', '中型车');
modelEngToChn.set('LARGE', '大型车');

/**
 * class `Car`
 */
export default class Car {
  public number: string;

  public model: string;

  public enterTime: number;

  public quitTime: number | undefined;

  public price: number;

  public cost: number | undefined;

  /**
   * construct a `Car`
   * @param number car's number
   * @param model car's model
   */
  constructor(number: string, model: string) {
    this.number = number;
    this.model = model;
    this.enterTime = new Date().getTime();
    // default model is NORMAL
    this.price = carModelToPrice.get(this.model) ?? 10;
  }

  /**
   * when the car leaves
   */
  public leave(): void {
    this.quitTime = new Date().getTime();
    const totalTime = this.quitTime - this.enterTime;
    const hours = totalTime / 1000 / 3600;
    this.cost = hours * this.price;
    // add to parking log
    addToLog(this);
  }
}
