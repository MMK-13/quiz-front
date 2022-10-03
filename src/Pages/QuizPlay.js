import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Components/Header";
import QuizPlayQuestion from "../Components/QuizPlayQuestion";

const QuizPlay = () => {
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
        <div className="QuizPlay">
            <Header connected={ connected } />
            <div className='container'>
                <QuizPlayQuestion time={ parseInt(localStorage.getItem('time')) } />
            </div>
        </div>
    );
}

export default QuizPlay;