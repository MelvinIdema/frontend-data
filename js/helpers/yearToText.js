/**
 * Not a functional Function. Has side effects:
 * - Uses outside functions
 * This will turn a given year (in the past) into a "x years ago" string.
 */
export default year => `First brewed ${new Date().getFullYear() - parseInt(grabYear(year))} years ago`;
