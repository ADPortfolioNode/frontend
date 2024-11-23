import React from 'react';
import PropTypes from 'prop-types';

const DisplayArea = ({ response }) => {
    return (
        <div className="display-area">
            <h3>Response Message:</h3>
            <p>{response.message}</p>
            {response.savedpath && (
                <div>
                    <h3>Saved Path:</h3>
                    {response.savedpath.endsWith('.mp3') ? (
                        <audio controls>
                            <source src={response.savedpath} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        <img src={response.savedpath} alt="Response Media" />
                    )}
                </div>
            )}
        </div>
    );
};

DisplayArea.propTypes = {
    response: PropTypes.shape({
        message: PropTypes.string.isRequired,
        savedpath: PropTypes.string,
    }).isRequired,
};

export default DisplayArea;