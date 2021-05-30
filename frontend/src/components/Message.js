import React from 'react';

const Message = ({ id, variant, message, size }) => {
  return (
    <>
      <div className={`custom-alert-${variant}-${size}`} key={id}>
        {message}
      </div>
    </>
  );
};

Message.defaultProps = {
  variant: 'danger',
  size: 'full',
};

export default Message;
