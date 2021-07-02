/**
 * dummy function for calculating elapsed time
 * @param from from Date
 * @param to to Date
 * @returns Date(`to` - `from`)
 */
export default function calcTime(from: Date, to: Date): number {
  const total = to.getTime() - from.getTime();
  const hours = total / 1000 / 3600;
  return hours;
}
