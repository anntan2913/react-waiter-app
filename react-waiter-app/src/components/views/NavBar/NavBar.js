import { Navbar, Nav } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">       
            <Container>
            <Navbar.Brand>Waiter.app</Navbar.Brand>
                <Nav className="ms-auto">                                           
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>                    
                </Nav>
            </Container>        
        </Navbar>
    );
};

export default NavBar;