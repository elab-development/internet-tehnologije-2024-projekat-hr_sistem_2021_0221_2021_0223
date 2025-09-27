import React, {useEffect} from 'react';
import instance from "../app-logic/instance";
import {toast} from "react-toastify";
import Title from "../components/Title";
import {Col, Row, Table} from "react-bootstrap";

const MyBonuses = () => {

    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!token) {
        window.location.href = '/';
    }

    const [bonuses, setBonuses] = React.useState([]);

    useEffect(() => {
        instance.get('/users/' + user.id +'/bonuses')
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setBonuses(fetchedData.data);
                } else {
                    toast.info("No bonuses found.");
                }
            }).catch(error => {
            console.error("Error fetching bonuses data:", error);
            toast.error("Error fetching bonuses data.");
        })
    }, []);

    return (
        <>
            <Title title="My Bonuses"/>
            <Row>
                <Col md={12}>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Date Awarded</th>
                            <th>Note</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bonuses.length > 0 ? bonuses.map((bonus, index) => (
                            <tr key={bonus.id}>
                                <td>{index + 1}</td>
                                <td>${bonus.amount}</td>
                                <td>{new Date(bonus.date_awarded).toLocaleDateString()}</td>
                                <td>{bonus.note}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center">No bonuses found.</td>
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

export default MyBonuses;
