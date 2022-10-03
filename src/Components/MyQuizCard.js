import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const MyQuizCard = (props) => {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);

    const [falseQuestion, setFalseQuestion] = useState(0);
    const [trueQuestion, setTrueQuestion] = useState(0);
    const [emptyQuestion, setEmptyQuestion] = useState(0);
    const [totalTrueResponse, setTotalTrueResponse] = useState(0);
    
    useEffect(() => {
        axios.get('http://localhost:8080/quiz/nombre-true-response/' + props.quiz.RefQuiz + '/' + localStorage.getItem('ID'))
        .then(response => {
            setTrueQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-false-response/' + props.quiz.RefQuiz + '/' + localStorage.getItem('ID'))
        .then(response => {
            setFalseQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-empty-response/' + props.quiz.RefQuiz + '/' + localStorage.getItem('ID'))
        .then(response => {
            setEmptyQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-total-response/' + props.quiz.RefQuiz)
        .then(response => {
            setTotalTrueResponse(parseInt(response.data[0].Nbre))
        })
        
    }, []);
    
    const deleteQuiz = () => {
        if (window.confirm('Вы уверены?')) {
            axios.get('http://localhost:8080/quiz/delete/' + props.quiz.RefQuiz)
            .then(response => {
                console.log(response);
            })
            setDeleted(true);
        }
    }

    useEffect(() => {
        if (deleted) document.getElementById(props.quiz.RefQuiz).remove();
    }, [deleted]);
    
    const deleteQuizResponse = () => {
        axios.get('http://localhost:8080/quiz/delete-quiz-response/'+localStorage.getItem('ID')+'/'+props.quiz.RefQuiz)
        localStorage.removeItem('time')
        localStorage.setItem('time', Date.now() + props.quiz.Time*60*1000)
        if (props.quiz.NbreQuestion > 0) {
            setTimeout(() => { navigate('/play/' + props.quiz.RefQuiz) }, 500)
        } else {
            alert("В настоящее время вопросник не содержит вопросов");
        }
    }

    return (
        <div id={ props.quiz.RefQuiz } className="QuizCard col-3">
            <div className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">{ props.quiz.Quiz }</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-clock"> </i>Время : { props.quiz.Time } минуты</h6>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-tag"> </i>Категория : { props.quiz.Category }</h6>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-question-circle"> </i>Количество вопросов : { props.quiz.NbreQuestion }</h6>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-trophy"> </i>Оценка : {(totalTrueResponse!=0)?Math.round((trueQuestion - falseQuestion)*100/totalTrueResponse):0 } %</h6>
                </div>
                <div className="card-footer d-flex justify-content-evenly">
                    <button onClick={() => deleteQuizResponse() } className="btn btn-primary">
                        <i className="bi bi-play-circle"></i>
                    </button>
                    <NavLink to={ "/quiz/update/" + props.quiz.RefQuiz } className="btn btn-outline-primary">
                        <i className="bi bi-pencil"></i>
                    </NavLink>
                    <NavLink to={ "/quiz/question/" + props.quiz.RefQuiz } className="btn btn-outline-primary">
                        <i className="bi bi-question-circle"></i>
                    </NavLink>
                    <button className="btn btn-outline-danger" onClick={() => deleteQuiz() }>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyQuizCard;