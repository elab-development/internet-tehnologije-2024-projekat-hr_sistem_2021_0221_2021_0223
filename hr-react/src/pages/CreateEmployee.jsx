import React, {useEffect} from 'react';
import Title from "../components/Title";
import instance from "../app-logic/instance";
import {Col, Form, InputGroup, Row, Table} from "react-bootstrap";
import {
    FaAnchor,
    FaBook,
    FaBuilding,
    FaClock,
    FaEnvelope,
    FaMapPin, FaMoneyBill,
    FaPhone,
    FaSearch,
    FaStar,
    FaTrash,
    FaUser
} from "react-icons/fa";
import useFormData from "../hooks/useFormData";
import {toast} from "react-toastify";
import {GiBattleAxe} from "react-icons/gi";
const CreateEmployee = () => {

    const [employeeData, setEmployeeData] = React.useState([]);
    const [choosenEmployee, setChopsenEmployee] = React.useState(null);
    const [contracts, setContracts] = React.useState([]);
    const [chosenContract, setChosenContract] = React.useState(null);
    const [contractItems, setContractItems] = React.useState([]);
    const [sectors, setSectors] = React.useState([]);
    const [positions, setPositions] = React.useState([]);
    const [forceRender, setForceRender] = React.useState(false);
    const {formData, handleChange} = useFormData({
        email: '',
        password: '',
        name: '',
        telephone: '',
        address: '',
        date_of_birth: '',
        sector_id: '',
        type: '',
        start_date_contract: '',
        end_date_contract: '',
        position_id: '',
        yearly_salary: '',
        start_date_item: '',
        end_date_item: ''
    });

    useEffect(() => {
        instance.get('/employees')
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setEmployeeData(fetchedData.data);
                }
            }).catch(error => {
            console.error("Error fetching employee data:", error);
        })
    }, []);

    useEffect(() => {
        if (choosenEmployee) {
            instance.get('/users/' + choosenEmployee.id + '/contracts')
                .then(response => {
                    const fetchedData = response.data;
                    if (fetchedData.success === true) {
                        setContracts(fetchedData.data);
                    }
                }).catch(error => {
                    console.error("Error fetching employee contracts data:", error);
                })
        }
    }, [choosenEmployee, forceRender]);

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
    }, [chosenContract, forceRender]);

    useEffect(() => {
        instance.get('/sectors')
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setSectors(fetchedData.data);
                }
            }).catch(error => {
                console.error("Error fetching sectors data:", error);
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

    const addEmployeeContract = (e) => {
        e.preventDefault();
        if (!choosenEmployee) {
            toast.error("Please select an employee first.");
            return;
        }

        instance.post('/contracts', {
            user_id: choosenEmployee.id,
            sector_id: formData.sector_id,
            start_date: formData.start_date_contract,
            end_date: formData.end_date_contract ? formData.end_date_contract : null,
            type: formData.type
        }).then(response => {
            const fetchedData = response.data;
            if (fetchedData.success === true) {
                toast.success("Contract added successfully.");
                setForceRender(!forceRender);
            } else {
                toast.error("Error adding contract: " + fetchedData.message);
            }
        }).catch(error => {
            console.error("Error adding contract:", error);
            toast.error("Error adding contract.");
        })
    }

    const endEmployeeContract = (employeeId, contractId) => {
        instance.delete('/contracts/' + contractId)
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    toast.success("Contract ended successfully.");
                    setForceRender(!forceRender);
                } else {
                    toast.error("Error ending contract: " + fetchedData.message);
                }
            }).catch(error => {
                console.error("Error ending contract:", error);
                toast.error("Error ending contract.");
            })
    }

    const addItem = (e) => {
        e.preventDefault();
        if (!chosenContract) {
            toast.error("Please select a contract first.");
            return;
        }
        instance.post('/contract-items', {
            contract_id: chosenContract.id,
            position_id: formData.position_id,
            yearly_salary: formData.yearly_salary,
            start_date: formData.start_date_item,
            end_date: formData.end_date_item ? formData.end_date_item : null
        }).then(response => {
            const fetchedData = response.data;
            if (fetchedData.success === true) {
                toast.success("Contract item added successfully.");
                setForceRender(!forceRender);
            } else {
                toast.error("Error adding contract item: " + fetchedData.message);
            }
        }).catch(error => {
            console.error("Error adding contract item:", error);
            toast.error("Error adding contract item.");
        })
    }


    const register = (e) => {
        e.preventDefault();
        console.log(formData);

        instance.post('/register', {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            telephone: formData.telephone,
            address: formData.address,
            date_of_birth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString().split('T')[0] : null
        }).then(response => {
            const fetchedData = response.data;
            if (fetchedData.success === true) {
                toast.success("Employee registered successfully.");
                setEmployeeData([...employeeData, fetchedData.data]);
            } else {
                toast.error("Error registering employee: " + fetchedData.message);
            }
        }).catch(error => {
            console.error("Error registering employee:", error);
            toast.error("Error registering employee.");
        })


        toast.info("Registering employee...");
    }

    return (
        <div>
            <Title title="Employee management"/>
            <Row>
                <Col md={4}>
                    <h3 className="text-center mb-3">Register new employee</h3>
                    <Form className="p-3">
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

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3"><FaUser/></InputGroup.Text>
                            <Form.Control
                                placeholder="Name"
                                aria-label="Name"
                                aria-describedby="basic-addon3"
                                type="text"
                                onChange={handleChange}
                                name="name"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon4"><FaPhone/></InputGroup.Text>
                            <Form.Control
                                placeholder="Telephone"
                                aria-label="Telephone"
                                aria-describedby="basic-addon4"
                                type="text"
                                onChange={handleChange}
                                name="telephone"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon5"><FaMapPin/></InputGroup.Text>
                            <Form.Control
                                placeholder="Address"
                                aria-label="Address"
                                aria-describedby="basic-addon5"
                                type="text"
                                onChange={handleChange}
                                name="address"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon6"><FaClock/></InputGroup.Text>
                            <Form.Control
                                placeholder="Date of Birth"
                                aria-label="Date of Birth"
                                aria-describedby="basic-addon6"
                                type="date"
                                onChange={handleChange}
                                name="date_of_birth"
                            />
                        </InputGroup>

                        <hr/>
                        <button className="btn gold" onClick={register}>Register</button>

                    </Form>
                </Col>
                <Col md={8}>
                    {
                        employeeData.length > 0 && (
                            <>
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Date of birth</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        employeeData.map((employee, index) => (
                                            <tr key={employee.id}>
                                                <td>{index + 1}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.telephone}</td>
                                                <td>{employee.address}</td>
                                                <td>{ employee.date_of_birth ? new Date(employee.date_of_birth).toLocaleDateString() : 'Not known'}</td>
                                                <td>
                                                    <button className="btn gold"
                                                            onClick={() => setChopsenEmployee(employee)}>
                                                        <FaSearch /> View
                                                    </button>
                                                </td>
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

            <Row>
                {
                    choosenEmployee !== null && (
                        <>
                            <Col md={4}>
                                {
                                    contracts.length > 0 && (
                                        <>
                                            <Table hover>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Type</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Options</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {contracts.length > 0 ? contracts.map((contract, index) => (
                                                    <tr key={contract.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{contract.type}</td>
                                                        <td>{new Date(contract.start_date).toLocaleDateString()}</td>
                                                        <td>{contract.end_date ? new Date(contract.end_date).toLocaleDateString() : 'Ongoing'}</td>
                                                        <td>
                                                            <button className="btn btn-info m-lg-1"
                                                                    onClick={() => setChosenContract(contract)}>
                                                                <FaSearch />
                                                            </button>
                                                            <button className="btn btn-danger" onClick={
                                                                () => {
                                                                    endEmployeeContract(choosenEmployee.id, contract.id);
                                                                }
                                                            }>
                                                                <FaTrash />
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
                                        </>
                                    )
                                }

                                <hr/>

                                {
                                    contractItems.length > 0 && (
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

                        </>
                    )
                }
                {
                    choosenEmployee !== null && (
                        <>
                            <Col md={4}>
                                <h3 className="text-center">New contract</h3>
                                <Form>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon9"><FaBuilding/></InputGroup.Text>
                                        <Form.Select name="sector_id" onChange={handleChange} aria-label="Sector">
                                            <option>Select sector</option>
                                            {
                                                sectors.map((sector) => (
                                                    <option key={sector.id} value={sector.id}>{sector.sector_name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon9"><FaBook/></InputGroup.Text>
                                        <Form.Select name="type" onChange={handleChange} aria-label="Type">
                                            <option>Select Type</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contractor">Contractor</option>
                                            <option value="Intern">Intern</option>
                                        </Form.Select>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon10"><FaClock/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Start Date"
                                            aria-label="Start Date"
                                            aria-describedby="basic-addon10"
                                            onChange={handleChange}
                                            name="start_date_contract"
                                            type="date"
                                        />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon11"><FaClock/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="End Date"
                                            aria-label="End Date"
                                            aria-describedby="basic-addon11"
                                            onChange={handleChange}
                                            name="end_date_contract"
                                            type="date"
                                        />
                                    </InputGroup>
                                    <hr/>
                                    <button className="btn gold" onClick={addEmployeeContract}>Add Contract</button>

                                </Form>
                            </Col>
                        </>
                    )
                }

                <Col md={4}>
                    {
                        chosenContract && (
                            <>
                                <h3 className="text-center">Add contract items</h3>
                                <Form>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon12"><GiBattleAxe/></InputGroup.Text>
                                        <Form.Select name="position_id" onChange={handleChange} aria-label="Position">
                                            <option>Select Position</option>
                                            {
                                                positions.map((position) => (
                                                    <option key={position.id} value={position.id}>{position.position_name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon13"><FaMoneyBill/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Yearly Salary"
                                            aria-label="Yearly Salary"
                                            aria-describedby="basic-addon13"
                                            onChange={handleChange}
                                            name="yearly_salary"
                                            type="number"
                                        />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon14"><FaClock/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="Start Date"
                                            aria-label="Start Date"
                                            aria-describedby="basic-addon14"
                                            onChange={handleChange}
                                            name="start_date_item"
                                            type="date"
                                        />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon15"><FaClock/></InputGroup.Text>
                                        <Form.Control
                                            placeholder="End Date"
                                            aria-label="End Date"
                                            aria-describedby="basic-addon15"
                                            onChange={handleChange}
                                            name="end_date_item"
                                            type="date"
                                        />
                                    </InputGroup>
                                    <hr/>
                                    <button className="btn gold"
                                            onClick={addItem}>Add Contract Item</button>
                                </Form>
                            </>
                        )
                    }
                </Col>
            </Row>
        </div>
    );
};

export default CreateEmployee;
