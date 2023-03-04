import React from 'react';
import PropTypes from 'prop-types';

export default function Spacer ({horizontal, size}) {
  const defaultValue = 'auto';

  return (
    <div
      style={{
        width: horizontal ? size : defaultValue,
        height: !horizontal ? size : defaultValue,
      }}
    ></div>
  );
};

Spacer.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  horizontal: PropTypes.bool,
};

Spacer.defaultProps = {
  horizontal: false,
};