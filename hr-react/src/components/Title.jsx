import React from 'react';
import PropTypes from 'prop-types';

const Title = props => {

    const { title, subtitle } = props;

    return (
        <>
            <div className="title">
                <h1>{title}</h1>
                {subtitle && <h2>{subtitle}</h2>}
            </div>
        </>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default Title;
