import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className='bg-secondary position-relative'>
            <NavigationBar />
            <Outlet />
            <Footer />
        </div>
    );
}