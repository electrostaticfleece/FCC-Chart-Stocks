import * as d3 from 'd3';
import classNames from 'classnames/bind';
import styles from 'css/components/chart';

const cx = classNames.bind(styles);
const parseTime = d3.timeParse('%Y-%m-%d');
let stockChart = {};

stockChart.create = function(element, data, state, actions) {

  //Create the initial svgs and groups
  let svg = d3.select(element).append('svg')
    .attr('class', 'chart');

  let g = svg.append('g')
    .attr('class', 'groups');

  g.append('g')
    .attr('class', 'axis axis-x');

  g.append('g')
    .attr('class', 'axis axis-y');

  g.append('g')
    .attr('class', 'freeze');


  this.update(element, data, state, actions);
};

stockChart.update = function(element, data, state, actions) {
  if(data.stockIndex.length < 1) {
    return null;
  }
  let newData = this._filterData(data, state);
  let scales = this._setScales(element, newData, state);

  this._setDimensions(state); 
  this._drawAxes(element, scales, newData, state); 
  this._graphLines(newData, state, scales); 
  this._addTooltip(newData, scales, state, actions); 
  this._setStyles(); 
};

stockChart._filterData = function(data, state) {
  const today = Date.now();
  const newData = {stockIndex: [...data.stockIndex], stocks: {}};
  let timeFrame;

  //Sets the timeframe based on the number of miliseconds in a day
  switch(state.view) {
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
      break;
    case 'year':
    default:
      timeFrame = 0;
      break;
  }

  //Rewrite object properties to a new data object, so we don't
  //risk altering the props object.
  data.stockIndex.forEach((ticker) => {
    newData.stocks[ticker] = {...data.stocks[ticker]};
    newData.stocks[ticker].data = data.stocks[ticker].data.filter((stock) => {
      if(Date.parse(stock[0]) > timeFrame){
        return true;
      }
      return false;
    });
  });

  return newData;
}

//Set dimensions with margins taken into consideration
stockChart._setDimensions = function(state) {
  const { width, height, margin} = state;
  const svg = d3.select('.chart')
    .attr('width', width)
    .attr('height', height);

  const g = d3.select('.' + 'groups')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

}

//Sets scales and returns an object with scale datq
stockChart._setScales = function(element, data, state) {
  const { graphNum, adjWidth, adjHeight, view } = state;

  const domains = this._setDomains(data, graphNum, view);
  const x = d3.scaleTime().range([0, adjWidth]).domain(domains.x);
  const y = d3.scaleLinear().range([adjHeight, 0]).domain(domains.y);
  const z = d3.scaleOrdinal(d3.schemeCategory20);

  return({x, y, z});
};

//Sets domains and returns and object with domain data
stockChart._setDomains = function(data, graphNum, view) {
  const { stockIndex, stocks } = data;

  //Concat all of the stocks into one array and then
  let allStocks = stockIndex.reduce((prev, next) => {
    return prev.concat(stocks[next].data);
  }, []).map((stock) => {
    let newStock = [...stock]; //Copy the stock data, so we don't write to the original
    newStock[0] = parseTime(newStock[0]);
    return newStock;
  });

  const x = d3.extent(allStocks, (s) => s[0]);
  const y = d3.extent(allStocks, (s) => s[graphNum]);

  //Create a sorted copy of the stock data for use later
  data.allStocks = [...allStocks];

  //Save all stocks to data, so we can access it later
  data.allStocks = allStocks;

  return {x, y};
};

stockChart._drawAxes = function(element, scales, data, state) {
  const { adjHeight, width, type } = state;

  const xAxis = d3.select('.axis-x');
  const yAxis = d3.select('.axis-y');
  const tick = d3.selectAll('.tick');
  const removeLabel = d3.select('.y-label').remove();

  //Transitions the X-axis and sets the text attributes
  xAxis
    .transition()
    .ease(d3.easeExpOut)
    .duration(1000)
    .attr("transform", "translate(0," + adjHeight + ")")
    .call(d3.axisBottom(scales.x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('x', -37)
    .attr('y', 4);

  //Transitions y-axis
  yAxis
    .transition()
    .duration(1000)
    .call(d3.axisLeft(scales.y))

  //Add on a new label to the y-axis
  yAxis
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

  //Map over the data and only return the date
  //and the data for the graph we are depicting
  const stocksArr = stockIndex.map((ticker) => {
    return stocks[ticker].data.map((values) => {
      return [ticker, values[0], values[graphNum]];
    });
  });

  const g = d3.select('.groups');
  const line = d3.line()
    .curve(d3.curveLinear)
    .x(function(d) { return scales.x(parseTime(d[1])); })
    .y(function(d) { return scales.y(d[2]); });

  //Draw all of the stocks lines
  const stock = g.selectAll('.line')
    .data(stocksArr)
    .attr('class', 'line');

  //Transition from previous paths to new ones
  stock.transition().ease(d3.easeExpOut).duration(1000)
    .attr('d', function(d) { return line(d); })
    .style('stroke', function(d) { return scales.z(d); });

  //Enter new lines
  stock
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .attr('d', function(d) { return line(d); })
    .style('stroke', function(d) { return scales.z(d); });

  //Exit
  stock.exit().remove();
}


stockChart._addTooltip = function(data, scales, state, actions) {
  const { adjWidth, adjHeight, margin, width, height, selected: { d3Date } } = state;
  const { allStocks } = data;
  const bisectDate = d3.bisector(function(d) { return d; }).left;
  //Removes all repeated dates and sorts the dates to add lines 
  //to the X-axis
  const sortedX = allStocks.reduce((prev, next) => {
    const nextDate = Date.parse(next[0])
    return (prev.indexOf(nextDate) === -1) ? prev.concat(nextDate) : prev;
  }, []).sort((a,b) => a - b);

  const svg = d3.select('.groups');

  //Remove previous versions of the map and focus
  svg.select('.mouseMap')
    .remove();

  svg.select('.focus')
    .remove();

  //Hide all focus attributes, until we mouseover
  const focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

  const freezeLines = svg.select('.freeze')

  //Move Lines to their appropriate locations
  freezeLines.select('line')
    .transition()
    .ease(d3.easeExpOut)
    .duration(1000)
    .attr('transform', 'translate(' + scales.x(d3Date) + ',' + 0 + ')')
    .style('stroke-opacity', 1);

  //If our selected date is outside of the range set it to transparent
  if(sortedX.indexOf(Date.parse(d3Date)) === -1) {
      freezeLines.select('line')
        .transition()
        .ease(d3.easeExpOut)
        .duration(1500)
        .style('stroke-opacity', 0);
  }


  //Append a line to foucs
  focus.append('line')
    .attr('class', 'x-line')
    .style('stroke', '#FAF9F0')
    .attr('stroke-width', 1)
    .attr('opacity', 0.5)
    .attr('y1', 0)
    .attr('y2', adjHeight);

  //Append text to focus that will be the date on hover
  focus.append('text')
    .attr('class', 'date')
    .attr('y', 10)
    .attr('dy', '0.71em')
    .style('font-family', 'Quicksand')
    .attr('fill', '#FAF9F0')
    .attr('x', adjWidth/2);

  //Append the mouseMap for tracking 
  svg.append('rect')
    .attr('class', 'mouseMap')
    .attr('width', adjWidth)
    .attr('height', adjHeight)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none')})
    .on('mousemove', mousemove)
    .on('click', click);

  //Gets location based data for clicks and hovers
  function hoverData() {
    const x0 = Date.parse(scales.x.invert(d3.mouse(this)[0]));
    const i = bisectDate(sortedX, x0, 1);
    const d0 = sortedX[i - 1];
    const d1 = sortedX[i];
    const d = new Date(x0 - d0 > d1 - x0 ? d1 : d0);

    return {x0, i, d0, d1, d};
  }

  //Add a red line on click and remove the previous line
  function click() {
    const hover = hoverData.bind(this)();
    const { d } = hover;

    const month = function(month) {
      if(Number(month) < 10) {
        return '0' + month;
      }
      return month;
    }

    const apiDate = d.getFullYear() + '-' + month((d.getMonth() + 1)) + '-' + d.getDate();
    actions.selectDate({ d3Date: d, apiDate});

    freezeLines.selectAll('.freezeLine').remove();

    freezeLines.append('line')
      .attr('class', 'freezeLine')
      .style('stroke', 'red')
      .attr('stroke-width', 1)
      .attr('opacity', 0.5)
      .attr('y1', 0)
      .attr('y2', adjHeight)
      .attr('transform', 'translate(' + scales.x(d) + ',' + 0 + ')')
      .style('display', null);

  }

  //When the mouse moves show the line, set a crosshair to the cursor and set the date
  function mousemove() {
    const hover = hoverData.bind(this)();
    const options = { month: 'long', day: 'numeric' };
    const shortDate = hover.d.toLocaleString('en-US', options);

    svg.select('.mouseMap')
      .style('cursor', 'crosshair');

    focus.select('.x-line')
      .attr('transform', 'translate(' + scales.x(hover.d) + ',' + (0) + ')');

    focus.select('.date')
      .text(shortDate);
  }

}

//Styles are set in D3 because class names are not accessible due to css-loaders hashing
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