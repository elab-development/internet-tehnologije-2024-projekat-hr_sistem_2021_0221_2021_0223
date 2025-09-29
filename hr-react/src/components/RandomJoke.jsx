import React from 'react';
import PropTypes from 'prop-types';

const RandomJoke = props => {
    return (
        <>
            <div className="joke">
                <h3>Random Joke</h3>
                <p className="setup"><strong>{props.setup}</strong></p>
                <p className="punchline">{props.punchline}</p>
            </div>
        </>
    );
};

RandomJoke.propTypes = {
    setup: PropTypes.string.isRequired,
    punchline: PropTypes.string.isRequired,
};

export default RandomJoke;
