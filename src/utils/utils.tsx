/**
 *红 ---  黄   --绿  --蓝   1，2，3，4
 * @param v
 * @returns
 */
export function ColorCodeConversion(v: number) {
  switch (v) {
    case 1:
      return '#CC3300';
    case 2:
      return '#FFCC33';
    case 3:
      return '#009933';
    case 4:
      return '#1677ff';
    default:
      return '#000';
  }
}
