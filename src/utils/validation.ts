class Validation {
  /**
   * 半角英数字 汎用記号のみか判定します
   * @param  {string} str
   */
  isHalfWidthOnly(str: string): boolean {
    if (str.match(/^[a-zA-Z0-9!-/:-?@¥[-{}-~]+$/)) {
      return true;
    }
    return false;
  }
}

export const validation = new Validation();
