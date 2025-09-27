import React, {useEffect} from 'react';
import instance from "../app-logic/instance";
import {toast} from "react-toastify";
import Title from "../components/Title";
import {Col, Row, Table} from "react-bootstrap";

const MyReviews = () => {

    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!token) {
        window.location.href = '/';
    }

    const [reviews, setReviews] = React.useState([]);

    useEffect(() => {
        instance.get('/users/' + user.id +'/reviews')
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setReviews(fetchedData.data);
                } else {
                    toast.info("No reviews found.");
                }
            }).catch(error => {
            console.error("Error fetching review data:", error);
            toast.error("Error fetching review data.");
        })
    }, []);
    return (
        <>
            <Title title="My Reviews"/>
            <Row>
                <Col md={12}>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Comments</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviews.length > 0 ? reviews.map((review, index) => (
                            <tr key={review.id}>
                                <td>{index + 1}</td>
                                <td>{new Date(review.review_date).toLocaleDateString()}</td>
                                <td>{review.score}</td>
                                <td>{review.comments}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center">No reviews found.</td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </Col>

            </Row>
        </>
    );
};

export default MyReviews;
