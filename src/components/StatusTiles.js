import React from 'react';
import PropTypes from 'prop-types';

const StatusTiles = ({ statuses, onTileClick }) => {
  return (
    <div className="row">
      {statuses.map((status, index) => (
        <div key={index} className="col-md-3 mb-4">
          <div className="card" onClick={() => onTileClick(status)}>
            <div className="card-body">
              <h5 className="card-title">{status.title}</h5>
              <p className="card-text">{status.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

StatusTiles.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  })).isRequired,
  onTileClick: PropTypes.func.isRequired,
};

export default StatusTiles;