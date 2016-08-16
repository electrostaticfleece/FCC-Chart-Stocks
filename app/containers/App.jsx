import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

//const cx = classNames.bind(styles);

const App = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App; 