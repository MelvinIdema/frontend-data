/**
 *
 * If the given date is a string, there's a high chance
 * it might be a formatted date instead of just a year.
 * Thus, regex match the year and return just the year.
 * If it's not a string, then it probably is a year,
 * so return the given date parameter.
 *
 * Definitely not fool proof. Years before 1600 and
 * after 2099 are not "valid" according to this REGEX.
 *
 * @param date
 * @returns {RegExpMatchArray|*}
 */
export default date => typeof date === "string" ? date.match(/\b(16|17|18|19|20)\d{2}\b/) : date;
