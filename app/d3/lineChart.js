import * as d3 from 'd3';
import classNames from 'classnames/bind';
import styles from 'css/components/chart';

const cx = classNames.bind(styles);
let stockChart = {};

stockChart.create = function(element, data, state) {
  let { width, height, margin } = state;

  let svg = d3.select(element).append('svg')
    .attr('class', 'chart')

  let g = svg.append('g')
    .attr('class', 'groups')

  g.append('g')
    .attr('class', 'axis axis-x')

  g.append('g')
    .attr('class', 'axis axis-y')

  this.update(element, data, state);
};

stockChart.update = function(element, data, state) {
  let timeFrame;
  const today = Date.now();
  const newData = {stockIndex: [...data.stockIndex], stocks: {}};
  if(data.stockIndex.length < 1) {
    return null;
  }

  switch(state.view) {
    case 'year':
      timeFrame = 0;
      break;
    case '6 months':
      timeFrame = today - (86400000*183);
      break;
    case '3 months':
      timeFrame = today - (86400000*90);
      break;
    case '1 month':
      timeFrame = today - (86400000*30);
      break;
    case '1 week':
      timeFrame = today - (86400000*7);
  }

  //Write to a new stock object, so we don't write directly to props
  data.stockIndex.forEach((ticker) => {
    newData.stocks[ticker] = {...data.stocks[ticker]};
    newData.stocks[ticker].data = data.stocks[ticker].data.filter((stock) => {
      if(Date.parse(stock[0]) > timeFrame){
        return true;
      }
      return false;
    });
  });


  let scales = this._setScales(element, newData, state);

  this._setDimensions(state);
  this._drawAxes(element, scales, newData, state);
  this._graphLines(newData, state, scales);
  this._setStyles();
};

stockChart._setDimensions = function(state) {
  const { width, height, margin} = state;
  const svg = d3.select('.chart')
    .attr('width', width)
    .attr('height', height);

  const g = d3.select('.' + 'groups')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

}

stockChart._setScales = function(element, data, state) {
  const { graphNum, adjWidth, adjHeight, view } = state;

  const domains = this._setDomains(data, graphNum, view);
  const x = d3.scaleTime().range([0, adjWidth]).domain(domains.x);
  const y = d3.scaleLinear().range([adjHeight, 0]).domain(domains.y);
  const z = d3.scaleOrdinal(d3.schemeCategory20);

  return({x, y, z});
};

stockChart._setDomains = function(data, graphNum, view) {
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

  const xAxis = d3.select('.axis-x');
  const yAxis = d3.select('.axis-y');
  const tick = d3.selectAll('.tick');

  xAxis
    .attr("transform", "translate(0," + adjHeight + ")")
    .call(d3.axisBottom(scales.x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('x', -37)
    .attr('y', 4);

  yAxis
    .call(d3.axisLeft(scales.y))
    .select('.y-label')
    .remove()

  yAxis
    .call(d3.axisLeft(scales.y))
    .append('text')
    .attr('class', 'y-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 5)
    .attr('dy', '0.71em')
    .style('font-family', 'Quicksand')
    .attr('fill', '#FAF9F0')
    .text(type);

}

stockChart._graphLines = function(data, state, scales) {
  const { stocks, stockIndex } = data;
  const { graphNum } = state;

  const g = d3.select('.' + 'groups');
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
    .attr('stroke-width', 2)
    .attr('d', function(d) { return line(stocks[d].data); })
    .style('stroke', function(d) { return scales.z(d); });
}

stockChart._setStyles = function() {
  const xAxis = d3.select('.axis-x');
  const yAxis = d3.select('.axis-y');
  const tick = d3.selectAll('.tick');

  xAxis.selectAll('path')
    .attr('stroke', '#FAF9F0')

  yAxis.selectAll('path')
    .attr('stroke', '#FAF9F0')

  tick.selectAll('line')
    .attr('stroke', '#FAF9F0')

  tick.selectAll('text')
    .attr('stroke', '#FAF9F0')
    .style('font-family', 'Quicksand')
    .style('font-weight', 300)
}

export default stockChart;