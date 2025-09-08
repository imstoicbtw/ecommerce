import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/index.tsx";
import Header from "../../components/Header/index.tsx";
import ScrollToTop from "../../components/ScrollToTop.tsx";
import type { Store } from "../../redux/store.ts";
import { useNavigate } from "react-router-dom";


export function PrivateLayout () {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: Store) => !!state.user.details?.isActive);
    useEffect(() => {
        if (!isLoggedIn) navigate("/auth/login");
    }, [ isLoggedIn, navigate ]);
    return (
        <div className={"flex flex-col min-h-screen"}>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}