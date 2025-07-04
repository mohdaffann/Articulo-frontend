import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header";
import authStore from "../store/authStore";
import FloatingWrite from "../components/FloatingWrite";
import Footer from "../components/Footer";
import EditorLoader from "../components/EditorLoader";
function Layout() {
    const checkAuth = authStore((s) => s.checkAuth)
    const isAuthLoading = authStore((s) => s.isAuthLoading)
    const loc = useLocation();
    const floatButton = loc.pathname === '/write'
    const hideHeader = loc.pathname === '/'
    useEffect(() => {
        checkAuth()
    }, [])
    if (isAuthLoading) {
        return <EditorLoader />
    }
    return (
        <>
            <div className="flex flex-col min-h-screen">
                {!hideHeader && <Header />}
                <main className="flex-grow">
                    <Outlet />
                </main>
                {!floatButton && <FloatingWrite />}
                <Footer />

            </div>



        </>
    )
}

export default Layout;
