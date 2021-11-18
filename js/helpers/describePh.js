/**
 *
 * If the PH of a beer is lower, a more sour taste is
 * experienced. If the PH is higher, a less sour taste
 * is experienced.
 *
 * This function turns the given PH into a description:
 * Not so sour, and Sour.
 *
 * @param ph
 * @returns {string}
 */
export default ph => ph > 4.2 ? "Not so sour" : "Sour";
