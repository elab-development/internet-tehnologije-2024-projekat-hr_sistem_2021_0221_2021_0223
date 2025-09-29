import React, {useEffect} from 'react';
import Title from "../components/Title";
import instance from "../app-logic/instance";
import {Col, Row, Table} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import {CSVLink} from "react-csv";

const Administration = () => {

    const [link, setLink] = React.useState('/contract-items/paginate');
    const [items, setItems] = React.useState([]);
    const [buttons, setButtons] = React.useState([]);

    useEffect(() => {

        instance.get(link)
            .then(response => {
                const fetchedData = response.data;
                if (fetchedData.success === true) {
                    setItems(fetchedData.data.data);
                    setButtons(fetchedData.data.links);
                }
            }).catch(error => {
            console.error("Error fetching contract items data:", error);
        })

    }, [link]);

    return (
        <div>
            <Title title="Administration"/>
            <Row>
                <Col md={12}>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee</th>
                            <th>Position</th>
                            <th>Sector</th>
                            <th>Contract Type</th>
                            <th>Yearly Salary</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length > 0 ? items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.user_name}</td>
                                <td>{item.position_name}</td>
                                <td>{item.sector_name}</td>
                                <td>{item.contract_type}</td>
                                <td>${item.yearly_salary}</td>
                                <td>{new Date(item.start_date).toLocaleDateString()}</td>
                                <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : 'Ongoing'}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={
                                        () => {
                                            instance.delete('/contract-items/' + item.id)
                                                .then(response => {
                                                    const fetchedData = response.data;
                                                    if (fetchedData.success === true) {
                                                        setItems(items.filter(i => i.id !== item.id));
                                                        toast.success("Contract item deleted successfully.");
                                                    }
                                                }).catch(error => {
                                                console.error("Error deleting contract item:", error);
                                                toast.error("Error deleting contract item.");
                                            })
                                        }
                                    }>
                                        <FaTrash/>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="text-center">No contract items found.</td>
                            </tr>
                        )
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="8">
                                <div className="d-flex justify-content-center">
                                    {buttons.map((button, index) => (
                                        <button key={index}
                                                className={"btn btn-sm mx-1 " + (button.active ? 'btn-primary' : 'btn-outline-primary')}
                                                onClick={() => {
                                                    if (button.url) {
                                                        setLink(button.url);
                                                    }
                                                }}
                                                disabled={!button.url}
                                        >
                                            <span dangerouslySetInnerHTML={{__html: button.label}}/>
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mt-3 mb-3">
                    <Title title="Download data"/>
                    <div className="d-flex justify-content-center mt-3">
                        <CSVLink
                            data={items}
                            filename={"contract_items.csv"}
                            className="btn btn-success"
                            target="_blank"
                        >
                            Download Current Page as CSV
                        </CSVLink>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Administration;
