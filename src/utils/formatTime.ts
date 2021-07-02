/**
 * dummy function for formatting now time
 * @param date a Date
 * @returns `hh:mm:ss` formatted time string
 */
export default function formatTime(date: Date): string {
  let temp = '';

  if (date.getHours() < 10) {
    temp += `0`;
  }
  temp += `${date.getHours()}:`;

  if (date.getMinutes() < 10) {
    temp += `0`;
  }
  temp += `${date.getMinutes()}:`;

  if (date.getSeconds() < 10) {
    temp += `0`;
  }
  temp += `${date.getSeconds()}`;

  return temp;
}
