import { useContext, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../../context/PublicContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function NavigationBar() {
    const { user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null)

    async function logout(ev) {
        ev.preventDefault();
        await axios.post('/api/user-logout');
        setRedirect('/login');
        setUser(null);
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <Navbar bg="secondary" expand="lg" className="border-bottom border-1">
            <Container>
                <Navbar.Brand className="me-5" href="/"><img src="/logo.png" className="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto justify-content-between w-100 fw-bold">
                        <Nav.Link href="/sponsor">Become a Sponsor</Nav.Link>
                        <Nav.Link href="/involved">Involved Now</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                        {user ?
                            <Nav.Link to="" onClick={logout}>Sign Out</Nav.Link> :
                            <Nav.Link href="/login">Sign In</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}