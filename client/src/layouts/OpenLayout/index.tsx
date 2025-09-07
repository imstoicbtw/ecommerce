import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/index.tsx";
import Header from "../../components/Header/index.tsx";
import ScrollToTop from "../../components/ScrollToTop.tsx";


export function OpenLayout () {
    return (
        <div className={"flex flex-col min-h-screen"}>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}