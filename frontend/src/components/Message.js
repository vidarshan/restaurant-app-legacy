import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ id, variant, message, size }) => {
  return (
    <Alert className={`custom-alert-${variant}-${size}`} key={id}>
      {message}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'danger',
  size: 'full',
};

export default Message;
