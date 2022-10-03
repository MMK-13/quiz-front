import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Register from "../Components/Register";

const Connexion = () => {
    const navigate = useNavigate();
    let { page } = useParams();
    let renderPage;
    
    if (page === 'register') {
        renderPage = <Register />
    } else if (page === 'login') {
        renderPage = <Login />
    }

    useEffect(() => {
        if (page === 'logout') {
            localStorage.removeItem('ID');
            navigate('/');
        }
    }, []);

    return (
        <div className="Connexion">
            <Header />
            <div className="container">
                { renderPage }
            </div>
        </div>
    );
}

export default Connexion;