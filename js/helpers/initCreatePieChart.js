/**
 * pieChart creator.
 * Takes object with:
 *     - D3 select value
 *     - a tooltip element
 *     - Tooltip innerHTML as a function
 *     - a colorScale value
 *
 *  Returns a create function that takes data
 */

const initCreatePieChart = ({
  svgGroup,
  colorScaleValue,
  html,
  tooltip,
}) => data => {

        /**
         * D3 arcGenerator. See docs for usage
         */
        const arcGenerator = d3.arc()
            .padAngle(.03)
            .innerRadius(30)
            .outerRadius(100)
            .cornerRadius(4)

        /**
         * Uses the pieGenerator from D3 to transform absolute data
         * to acceptable data for the D3 arcGenerator
         *
         * Accepts any form of relatable JSON as long as
         * .value is changed accordingly
         *
         * @type {any}
         */
        const arcData = d3.pie()
            .value(d => d.amount)
            (data)

        /**
         * Fills the pie slices with a darker or lighter malt color
         * according to the amount of malt used with the beer.
         */
        const colorScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.amount))
            .range(colorScaleValue)

        /**
         * Create Pie Chart Slices
         */
        d3.select(svgGroup)
            .selectAll('path')
            .data(arcData, function(d) { return `${d.data.amount-d.data.name}` })
            .join('path')
            .classed('slice', true)
            .attr('fill', d => colorScale(d.data.amount))
            .attr('d', arcGenerator)
            .on('mouseover', function(event, d) {
                tooltip
                    .style('visibility', 'visible')
                    .html(html(d))
            })
            .on('mousemove', function(event) {
                tooltip
                    .style('top', event.pageY + "px")
                    .style('left', event.pageX + 16 + "px")
            })
            .on('mouseout', function() {
                tooltip
                    .style('visibility', 'hidden')
            })

}

export default initCreatePieChart;
