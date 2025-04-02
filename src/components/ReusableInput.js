import React from 'react';
import PropTypes from 'prop-types';

const ReusableInput = ({ label, name, value, onChange, type = "text", id }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        id={id}
      />
    </div>
  );
};

ReusableInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
};

export default ReusableInput;
