import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Components/Header";

const NotFound = () => {
    const navigate = useNavigate();
    const [connected, setConnected] = useState(false);
    
    useEffect(() => {
        const ID = localStorage.getItem('ID');
        if (ID === null) {
            navigate('/account/login');           
        } else {
            setConnected(true);
        }
    }, [connected]);
    
    return (
        <div className="NotFound">
            <Header connected={ connected } />
            <h2>Erreur 404 : Page introuvable...</h2>
        </div>
    );
}

export default NotFound;