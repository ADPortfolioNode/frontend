import React from 'react';
import PropTypes from 'prop-types';

const ReusableButton = ({ children, onClick, type = 'button', className, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

ReusableButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ReusableButton;
