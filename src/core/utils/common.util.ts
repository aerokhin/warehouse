export class CommonUtil {
  static removeMultipleSpaces(s: string) {
    return s.replace(/\s{2,}/gi, ' ');
  }
}
