import * as d3 from 'd3';
import classNames from 'classnames/bind';
import styles from 'css/components/chart';

const cx = classNames.bind(styles);
let stockChart = {};

stockChart.create = function(element, data, state) {
  let { width, height, margin } = state;

  let svg = d3.select(element).append('svg')
    .attr('class', cx('chart'))

  let g = svg.append('g')
    .attr('class', cx('groups'))

  g.append('g')
    .attr('class', cx('axis axis-x'))
    .attr('fill', 'black');

  g.append('g')
    .attr('class', cx('axis axis-y'))
    .attr('fill', 'black');

  this.update(element, data, state);
};

stockChart.update = function(element, data, state) {
  if(data.stockIndex.length < 1) {
    return null;
  }
  let scales = this._setScales(element, data, state);

  this._setDimensions(state);
  this._drawAxes(element, scales, data, state);
  this._graphLines(data, state, scales);
};

stockChart._setDimensions = function(state) {
  const { width, height, margin} = state;
  const svg = d3.select('.' + cx('chart'))
    .attr('width', width)
    .attr('height', height);

  const g = d3.select('.' + cx('groups'))
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

}

stockChart._setScales = function(element, data, state) {
  const { graphNum, adjWidth, adjHeight } = state;

  const domains = this._setDomains(data, graphNum);
  const x = d3.scaleTime().range([0, adjWidth]).domain(domains.x);
  const y = d3.scaleLinear().range([adjHeight, 0]).domain(domains.y);
  const z = d3.scaleOrdinal(d3.schemeCategory20);

  return({x, y, z});
};

stockChart._setDomains = function(data, graphNum) {
  const { stockIndex, stocks } = data;

  const parseTime = d3.timeParse('%Y-%m-%d');

  const allStocks = stockIndex.reduce((prev, next) => {
    return prev.concat(stocks[next].data);
  }, []);


  const x = d3.extent(allStocks, (s) => parseTime(s[0]));
  const y = d3.extent(allStocks, (s) => s[graphNum]);

  return {x, y};
};

stockChart._drawAxes = function(element, scales, data, state) {
  const { adjHeight, width, type } = state;

  const xAxis = d3.select('.' + cx('axis-x'));
  const yAxis = d3.select('.' + cx('axis-y'));

  xAxis
    .attr("transform", "translate(0," + adjHeight + ")")
    .call(d3.axisBottom(scales.x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('x', -37)
    .attr('y', 4);

  yAxis
    .call(d3.axisLeft(scales.y))
    .selectAll('.' + cx('y-label'))
    .remove()

  yAxis
    .call(d3.axisLeft(scales.y))
    .append('text')
    .attr('class', cx('y-label'))
    .attr('transform', 'rotate(-90)')
    .attr('y', 5)
    .attr('dy', '0.71em')
    .attr('fill', 'black')
    .text(type);

}

stockChart._graphLines = function(data, state, scales) {
  const { stocks, stockIndex } = data;
  const { graphNum } = state;

  const g = d3.select('.' + cx('groups'));
  const parseTime = d3.timeParse('%Y-%m-%d');
  const line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return scales.x(parseTime(d[0])); })
    .y(function(d) { return scales.y(d[graphNum]); });

  d3.selectAll('.stock').remove();

  const stock = g.selectAll('stocks')
    .data(stockIndex)
    .enter()
    .append('g')
    .attr('class', 'stock');

  stock.append('path')
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('d', function(d) { return line(stocks[d].data); })
    .style('stroke', function(d) { return scales.z(d); });
}

export default stockChart;