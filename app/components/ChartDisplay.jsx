import React, {PropTypes, Component} from 'react';
import stockChart from 'd3/lineChart';
import classNames from 'classnames/bind';
import styles from 'css/components/chart';

const cx = classNames.bind(styles);

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      lastWidth: NaN
    }
  }

  handleResize(e) {
    const { chart: { margin }, updateDimensions } = this.props;
    const el = this.refs.chart;
    const width = window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth;

    //Move the scrollbar to the top of the page when the window
    //resizes. Otherwise, the scrollbar moves %5 of the way down
    //and disappears. Leaving an annoying view.  
    if(this.state.lastWidth < 900 && width > 900){
       window.scroll(0, 0);
    }
    
    this.setState({lastWidth: width}); 

    updateDimensions({width: el.offsetWidth, height: el.offsetHeight, margin});
  }

  componentDidMount() {
    const { stocks, chart, updateDimensions, selectDate } = this.props;
    const el = this.refs.chart;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    updateDimensions({width, height, margin: chart.margin});
    stockChart.create(el, stocks, chart, {selectDate});
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const {stocks, chart, selectDate} = this.props;
    const el = this.refs.chart;

    stockChart.update(el, stocks, chart, {selectDate});
  }

  render() {
    return (
      <div className={cx('displayWrap')}>
        <div className={cx('chartWrap')} ref={'chart'}>
        </div>
        <div className={cx('data')} >
          
        </div>
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