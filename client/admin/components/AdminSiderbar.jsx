import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faCircleDollarToSlot, faUsers, faShapes, faCalendarDays, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav } from "react-bootstrap";
import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../../context/PublicContext";

export default function AdminSidebar() {
    const [redirect, setRedirect] = useState(null)
    const currPage = useLocation().pathname;
    const { admin, setAdmin, ready } = useContext(AdminContext);

    async function logout() {
        await axios.post('/api/logout');
        setRedirect('/admin/login');
        setAdmin(null);
    }
    if (!ready) {
        return (<div>....</div>);
    }
    if (ready && !admin && !redirect) {
        return <Navigate to={'/admin/login'} />
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <Navbar expand="lg" className="border-bottom border-1 h-100 flex-column" id="adminSidebar">
            <Container className="d-flex flex-column justify-content-start align-items-start h-100 p-0">
                <div className="text-center w-100">
                    <Navbar.Brand className="m-0" href="/admin/"><img src="/logo.png" className="logo" /></Navbar.Brand>
                </div>
                <div className="p-3 border-bottom w-100 border-secondary d-flex">
                    <img src={"http://localhost:4000/uploads/avatar/" + admin.avatar} className="comment-icon" />
                    <div className="ms-2 mt-2">
                        <h4 className="m-0">{admin.name}</h4>
                        <p className="m-0">{admin.role}</p>
                    </div>
                </div>
                <Nav className="me-auto justify-content-between flex-column w-100 accordion-body h-100 fs-5">
                    <div>
                        <Nav.Link className={currPage === "/admin/" ? "active" : ""} href="/admin/"><FontAwesomeIcon icon={faShapes} className="me-2" /><span>Dashboard</span></Nav.Link>
                        <Nav.Link className={currPage === "/admin/sponsor" ? "active" : ""} href="/admin/sponsor"><FontAwesomeIcon icon={faCircleDollarToSlot} className="me-2" /><span>Sponsor</span> </Nav.Link>
                        <Nav.Link className={currPage === "/admin/events" ? "active" : ""} href="/admin/events"><FontAwesomeIcon icon={faCalendarDays} className="me-2" /><span>Events</span> </Nav.Link>
                        <Nav.Link className={currPage === "/admin/blog" ? "active" : ""} href="/admin/blog"><FontAwesomeIcon icon={faFileLines} className="me-2" /><span>Blog</span> </Nav.Link>
                        <Nav.Link className={currPage === "/admin/members" ? "active" : ""} href="/admin/members"><FontAwesomeIcon icon={faUsers} className="me-2" /><span>Members</span> </Nav.Link>
                        <Nav.Link className={currPage === "/admin/settings" ? "active" : ""} href="/admin/settings"><FontAwesomeIcon icon={faGear} className="me-2" /><span>Settings</span> </Nav.Link>
                    </div>
                    <div>
                        <Nav.Link onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} className="me-2" /> <span>Logout</span></Nav.Link>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
}