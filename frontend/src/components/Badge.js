import React from 'react';

const Badge = ({ count, variant, size }) => {
  return <div className={`badge-${variant}-${size}`}>{count}</div>;
};

Badge.defaultProps = {
  variant: 'red',
  count: '0',
  size: 'sm',
};

export default Badge;
