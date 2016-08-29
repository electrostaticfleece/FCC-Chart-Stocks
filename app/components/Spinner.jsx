import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/spinner';

const cx = classNames.bind(styles);

const Spinner = () => {
  return (
    <div className={cx('wrapper')}>
      <svg 
          version="1.1" 
          x="0px" 
          y="0px"
          width="75px" 
          height="75px" 
          viewBox="0 0 50 50"
          className={cx('spinner')}>
            <path 
              fill="#000" 
              d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            </path>
        </svg>
    </div>
  );
};

export default Spinner;
