import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Components/Header";
import QuizResultCard from "../Components/QuizResultCard";

const QuizResult = () => {
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
        <div className="QuizResult">
            <Header connected={ connected } />
            <div className="container mt-4">
                <QuizResultCard />
            </div>
        </div>
    );
}

export default QuizResult;