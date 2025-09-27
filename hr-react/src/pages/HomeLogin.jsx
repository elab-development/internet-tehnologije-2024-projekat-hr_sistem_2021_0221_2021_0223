import React, {use, useEffect} from 'react';
import Title from "../components/Title";
import {Col, Form, InputGroup, Row, Table} from "react-bootstrap";
import {Chart} from "react-google-charts";
import instance from "../app-logic/instance";
import {FaEnvelope, FaStar} from "react-icons/fa";
import useFormData from "../hooks/useFormData";

const HomeLogin = () => {

    const [chartData, setChartData] = React.useState([]);
    const [positions, setPositions] = React.useState([]);
    const {formData, handleChange} = useFormData({
        email: '',
        password: ''
    });

    const token = sessionStorage.getItem('token');


    useEffect(() => {
        instance.get('/sectors/active-contracts')
            .then(response => {
                const fetchedData = response.data;
                let dataForChart = [["Sector", "Number of Employees"]];
                if (fetchedData.success === true) {
                    let dataFromServer = fetchedData.data;
                    dataFromServer.forEach(item => {
                        dataForChart.push([item.sector_name, item.active_contracts_count]);
                    });

                    setChartData(dataForChart);
                }
            }).catch(error => {
                console.error("Error fetching sector data:", error);
        })
    }, []);

    useEffect(() => {
        instance.get('/positions')
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setPositions(fetchedData.data);
                }
            }).catch(error => {
                console.error("Error fetching positions data:", error);
            })
    }, []);

    const options = {
        title: 'Number of Employees per Sector',
    };

    const login = (e) => {
        e.preventDefault();
        instance.post('/login', formData)
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    let data = fetchedData.data;
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    window.location.reload();
                } else {
                    alert("Login failed: " + fetchedData.message);
                }
            }).catch(error => {
                console.error("Error during login:", error);
                alert("An error occurred during login. Please try again.");
            })
        }


    return (
        <>
            <Title title="Welcome to the Employee Management System" />
            <Row className="mt-3">
                <Col md={6}>
                    {
                        chartData && (
                            <>
                                <Chart
                                    chartType="PieChart"
                                    data={chartData}
                                    options={options}
                                    width={"100%"}
                                    height={"400px"}
                                />
                            </>
                        )
                    }
                </Col>

                {
                    !token && (
                        <>
                            <Col md={6}>
                                <h3>Login form</h3>
                                <Form>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FaEnvelope/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            onChange={handleChange}
                                            name="email"
                                            type="email"
                                        />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2"><FaStar/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Passwoed"
                                            aria-label="Password"
                                            aria-describedby="basic-addon2"
                                            type="password"
                                            onChange={handleChange}
                                            name="password"
                                        />
                                    </InputGroup>
                                    <hr/>
                                    <button className="btn btn-primary" onClick={login}>Login</button>

                                </Form>
                            </Col>
                        </>
                    )
                }

                <Col md={6}>
                    {
                        positions && (
                            <>
                                <Table hover>
                                    <thead>
                                    <tr>
                                        <th>Position</th>
                                        <th>Short</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        positions.map((position) => (
                                            <tr key={position.id}>
                                                <td>{position.position_name}</td>
                                                <td>{position.short_name}</td>
                                            </tr>
                                        ))
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

export default HomeLogin;
