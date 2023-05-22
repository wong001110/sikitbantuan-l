import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSiderbar";


export default function AdminLayout() {
    return (
        <Row className="g-0 h-100" id="admin">
            <Col lg="2">
                <AdminSidebar />
            </Col>
            <Col lg="10">
                <div className="bg-secondary admin-content">
                    <div className="w-100 h-100">
                        <Outlet />
                    </div>
                </div>
            </Col>
        </Row>
    );
}