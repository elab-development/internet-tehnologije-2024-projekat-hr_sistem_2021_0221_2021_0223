import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../images/logo-hr.png';

const Navigation = () => {

    const token = sessionStorage.getItem('token');
    const user = token ? JSON.parse(sessionStorage.getItem('user')) : null;
    const isAdmin = user && user.role === 'admin';

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/"><img className="logo" src={logo} alt="HR sekira" width="100px" height="100px"/> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about-us">About us</Nav.Link>
                            {
                                token && (
                                    <>
                                        <Nav.Link href="/my-contracts">My contracts</Nav.Link>
                                        <Nav.Link href="/my-reviews">My reviews</Nav.Link>
                                        <Nav.Link href="/my-bonuses">My bonuses</Nav.Link>

                                        {
                                            isAdmin && (
                                                <>
                                                    <Nav.Link href="/create-employee">Create employee</Nav.Link>
                                                    <Nav.Link href="/admin">Administration</Nav.Link>
                                                </>
                                            )
                                        }

                                        <Nav.Link href="/logout" onClick={
                                            (e) => {
                                                e.preventDefault();
                                                logout();
                                            }
                                        }>Logout</Nav.Link>
                                    </>
                                )
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
