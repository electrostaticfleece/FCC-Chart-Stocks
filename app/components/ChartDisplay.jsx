import React, {PropTypes, Component} from 'react';
import stockChart from 'd3/lineChart';
import classNames from 'classnames/bind';
import styles from 'css/components/chart';

const cx = classNames.bind(styles);

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    const { chart: { margin }, updateDimensions } = this.props;
    const el = this.refs.chart;

    updateDimensions({width: el.offsetWidth, height: el.offsetHeight, margin});
  }

  componentDidMount() {
    const { stocks, chart, updateDimensions } = this.props;
    const el = this.refs.chart;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    updateDimensions({width, height, margin: chart.margin});
    stockChart.create(el, stocks, chart);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const {stocks, chart} = this.props;
    const el = this.refs.chart;

    stockChart.update(el, stocks, chart);
  }

  render() {
    return (
      <div className={cx('chartWrap')} ref={'chart'}>
      </div>
    )
  }
}

ChartDisplay.propTypes = {
  stocks: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  updateDimensions: PropTypes.func.isRequired
}

export default ChartDisplay;