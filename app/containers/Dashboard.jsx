import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateDimensions } from 'actions/chart';
import ChartDisplay from 'components/ChartDisplay';

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { stocks, chart, updateDimensions } = this.props;
    return (
      <div>
        <ChartDisplay 
          stocks = { stocks } 
          chart = { chart }
          updateDimensions = { updateDimensions } 
        />
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    stocks: state.stocks,
    chart: state.chart
  }
}

export default connect(mapStateToProps, { updateDimensions })(Dashboard);