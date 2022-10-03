import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AddQuiz from "../Components/AddQuiz";
import Header from "../Components/Header";
import MyQuiz from "../Components/MyQuiz";
import QuizQuestion from "../Components/QuizQuestion";

const Quiz = () => {
    const navigate = useNavigate();
    const { page, id } = useParams();
    let renderPage;

    const [connected, setConnected] = useState(false);
    
    useEffect(() => {
        const ID = localStorage.getItem('ID');
        if (ID === null) {
            navigate('/account/login');           
        } else {
            setConnected(true);
        }
        
    }, [connected]);
    
    if (page === 'list') {
        renderPage = <MyQuiz />;
    } else if (page === 'add') {
        renderPage = <AddQuiz type="add" />;
    } else if (page === 'update') {
        renderPage = <AddQuiz type="update" id={ id } />
    } else if (page === 'question') {
        renderPage = <QuizQuestion id={ id } />
    }

    return (
        <div className="NotFound">
            <Header connected={ connected } />
            <div className="container">
                { renderPage }
            </div>
        </div>
    );
}

export default Quiz;