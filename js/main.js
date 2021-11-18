import grabYear from './helpers/grabYear.js';
import describeThePh from "./helpers/describePh.js";
import transformBeer from "./helpers/transformBeer.js";
import initCreatePieChart from "./helpers/initCreatePieChart.js"

/**
 * Not a functional Function. Has side effects:
 * - Uses outside functions
 * This will turn a given year (in the past) into a "x years ago" string.
 */
const yearToText = year => `First brewed ${new Date().getFullYear() - parseInt(grabYear(year))} years ago`;

/**
 * Initialize createPieChart specifically for malt data
 * @type {function(*=): void}
 */
const createMaltChart = initCreatePieChart({
    svgGroup: '#malt g',
    tooltip: d3.select('#tooltip'),
    html: d => `<strong>${d.data.amount}g</strong> <br> ${d.data.name}`,
    colorScaleValue: ['#FFE194', '#FBA633']
})

/**
 * Initialize createPieChart specifically for hops data
 * @type {function(*=): void}
 */
const createHopsChart = initCreatePieChart({
    svgGroup: '#hops g',
    tooltip: d3.select('#tooltip'),
    html: d => `<strong>${d.data.amount}g</strong> <br> ${d.data.name} <br> for ${d.data.attribute}`,
    colorScaleValue: ['#a8d2a7', '#669f67']
})

const update = () => {
d3.json('https://api.punkapi.com/v2/beers/random')
    .then(rawData => {
        const data = transformBeer({describePh: describeThePh, transformFirstBrewed: yearToText}, rawData[0]);

        /**
         * Transform data to standard object and
         * normalize the data from KG to MG
         *
         * @type {{name: string|*, mg}[]}
         */
        const malt = data.ingredients.malt.map(malt => ({ name: malt.name, amount: malt.amount.value * 1000 }))

        /**
         * Transform data to standard object
         *
         * @type {{amount: number|*, name: string|*, attribute: string|*}[]}
         */
        const hops = data.ingredients.hops.map(hop => ({ name: hop.name, amount: hop.amount.value, attribute: hop.attribute }))

        createMaltChart(malt)
        createHopsChart(hops)

        d3.select('#beerTitleHeader').text(data.name)

        d3.select('#beerThumb').attr('src', data.image_url)
        d3.select('#beerTitle').text(data.name)
        d3.select('#beerDesc').text(data.description)
        d3.select('#beerSour').text(data.ph)
        d3.select('#beerBrewed').text(data.firstBrewed)
    })
}

update();

d3.select('#giveMeABeerPlease').on('click', update);
