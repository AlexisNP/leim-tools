/**
 * Check if the string parses as single digit
 *
 * @param str String to test
 * @returns Result of the test
 */
export function isDigit(str: string) {
  return RegExp(/^\d{1}$/g).test(str)
}

/**
 * Check if the string parses as an int
 *
 * @param str String to test
 * @returns Result of the test
 */
export function isInt(str: string) {
  return RegExp(/^[0-9]*$/g).test(str)
}

/**
 * Check if the string parses as a signed int (negative or positive)
 *
 * @param str String to test
 * @returns Result of the test
 */
export function isSignedInt(str: string) {
  return RegExp(/^[-+]?[0-9]+$/g).test(str)
}
