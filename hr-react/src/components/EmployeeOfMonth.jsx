import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const EmployeeOfMonth = props => {
    return (
        <>
            <Card>
                <Card.Header as="h5">Employee of the Month</Card.Header>
                <Card.Body className="text-center">
                    <Card.Img
                        variant="top"
                        src={props.photo}
                        alt={props.name}
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px' }}
                    />
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        <a href={`mailto:${props.email}`}>{props.email}</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

EmployeeOfMonth.propTypes = {
    name : PropTypes.string.isRequired,
    photo : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired,
};

export default EmployeeOfMonth;
