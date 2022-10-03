import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import MyQuizCard from "./MyQuizCard";

const MyQuiz = () => {
    const [quizes, setQuizes] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/quiz/my-quiz/' + localStorage.getItem('ID'))
        .then(response => {
            setQuizes(response.data);
        });
    }, []);

    return (
        <div className="MyQuiz">
            <NavLink to="/quiz/add" className="btn btn-primary mt-4">
                <i className="bi bi-plus-circle"></i>
            </NavLink>
            <div className="row mt-4">
                { quizes.map((quiz) => (
                    <MyQuizCard key={ quiz.RefQuiz } quiz={ quiz } />
                )) }
            </div>
        </div>
    );
}

export default MyQuiz;