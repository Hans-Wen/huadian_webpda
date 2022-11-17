/**
 *
 * @param v
 * @returns
 */
export function ColorCodeConversion(v: number) {
  switch (v) {
    case 1:
      return 'red';

    case 2:
      return 'yellow';
    case 3:
      return 'green';
    case 4:
      return 'blue';
    default:
      return '#000';
  }
}
