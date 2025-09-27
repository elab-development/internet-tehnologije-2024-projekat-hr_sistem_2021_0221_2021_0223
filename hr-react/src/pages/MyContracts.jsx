import React, {useEffect} from 'react';
import Title from "../components/Title";
import instance from "../app-logic/instance";
import {Col, Row, Table} from "react-bootstrap";

const MyContracts = () => {

    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!token) {
        window.location.href = '/';
    }

    const [contracts, setContracts] = React.useState([]);
    const [chosenContract, setChosenContract] = React.useState(null);
    const [contractItems, setContractItems] = React.useState([]);

    useEffect(() => {
        instance.get('/users/' + user.id +'/contracts')
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setContracts(fetchedData.data);
                }
            }).catch(error => {
            console.error("Error fetching contracts data:", error);
        })
    }, []);

    useEffect(() => {
        if (chosenContract) {
            instance.get('/contracts/' + chosenContract.id + '/contract-items')
                .then(response => {
                    const fetchedData = response.data;
                    if (fetchedData.success === true) {
                        setContractItems(fetchedData.data);
                    }
                }).catch(error => {
                console.error("Error fetching contract items data:", error);
            })
        }
    }, [chosenContract]);


    return (
        <>
            <Title title="My contracts"/>

            <Row className="mt-4">
                <Col md={6}>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            contracts.length > 0 ? contracts.map((contract, index) => (
                                <tr key={contract.id}
                                    className={chosenContract && chosenContract.id === contract.id ? 'table-primary' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{contract.type}</td>
                                    <td>{new Date(contract.start_date).toLocaleDateString()}</td>
                                    <td>{contract.end_date ? new Date(contract.end_date).toLocaleDateString() : 'Ongoing'}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info"
                                                onClick={() => setChosenContract(contract)}>
                                            View Items
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No contracts found.</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </Col>

                <Col md={6}>
                    {chosenContract && (
                    <>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Yearly salary</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Position</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contractItems.length > 0 ? contractItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>${item.yearly_salary}</td>
                                    <td>{new Date(item.start_date).toLocaleDateString()}</td>
                                    <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : 'Ongoing'}</td>
                                    <td>{item.position.position_name}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No contract items found.</td>
                                </tr>
                            )
                            }
                            </tbody>
                        </Table>
                    </>
                    )
                    }
                </Col>
            </Row>

        </>
    );
};

export default MyContracts;
