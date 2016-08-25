import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';

class stockInterface extends Component {
  constructor(props) {
    super(props);

  }

  getChartTypes(stockIndex, stocks) {
    if(stockIndex.length < 1) {
      return null;
    }
    const chartTypes = stocks[stockIndex[0]].column_name;

    return chartTypes.map((chart, i) => {
      return (
        <option key={i} value={chart}>{chart}</option>
      )
    })

  }

  render() {
    {stocks, stockIndex} = this.props;
    return (
      <div>
        <form>
          <select>
            {this.getChartTypes(stockIndex, stocks)}
          </select>
        </form>
      </div>
    )
  }
} 