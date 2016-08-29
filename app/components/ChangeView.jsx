import React, {PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/changeView';

const cx = classNames.bind(styles);

//TODO map the buttons

class ChangeView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { changeView } = this.props;

    changeView(e.target.value);
  }

  render() {
    const { view } = this.props;
    return (
      <div className={cx('timeFrame')}>
        <label>Timeframe</label>
        <div className={cx('buttons')}>
          <button 
            className={cx({timeBtn: true, selected: view === 'year' })}  
            value = {'year'} onClick={this.onClick} >1 year</button>
          <button 
            className={cx({timeBtn: true, selected: view === '6 months' })}  
            value = {'6 months'} onClick={this.onClick} >6 months</button>
          <button 
            className={cx({timeBtn: true, selected: view === '3 months' })}  
            value = {'3 months'} onClick={this.onClick} >3 months</button>
          <button 
            className={cx({timeBtn: true, selected: view === '1 month' })}  
            value = {'1 month'} onClick={this.onClick} >1 month</button>
          <button 
            className={cx({timeBtn: true, selected: view === '1 week' })}  
            value = {'1 week'} onClick={this.onClick} >1 week</button>
        </div>
      </div>
    )
  }
}

export default ChangeView;