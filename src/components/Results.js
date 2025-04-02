import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ results }) => {
  return (
    <div className="mt-4">
      <h2>Results</h2>
      <ul className="list-group">
        {results.map((result, index) => (
          <li key={index} className="list-group-item">{result}</li>
        ))}
      </ul>
    </div>
  );
};

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Results;
