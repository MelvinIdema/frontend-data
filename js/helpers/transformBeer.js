/**
 * Transforms certain properties in the beer object.
 *
 * Uses dependency injection to avoid any side effects.
 */
export default ({describePh, transformFirstBrewed}, dirtyBeer) => ({
    ...dirtyBeer,
    image_url: dirtyBeer.image_url ?? "assets/empty_beer_bottle.png",
    ph: describePh(dirtyBeer.ph),
    firstBrewed: transformFirstBrewed(dirtyBeer.first_brewed),
});
