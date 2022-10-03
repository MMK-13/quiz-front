import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const QuizResultCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [nbreMaxQuestion, setNbreMaxQuestion] = useState(0);
    const [falseQuestion, setFalseQuestion] = useState(0);
    const [trueQuestion, setTrueQuestion] = useState(0);
    const [emptyQuestion, setEmptyQuestion] = useState(0);
    const [totalTrueResponse, setTotalTrueResponse] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/get/' + id)
        .then(response => {
            setQuiz(response.data[0])
        })
        axios.get('http://localhost:8080/quiz/nbre-question/' + id)
        .then(response => {
            setNbreMaxQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-true-response/' + id + '/' + localStorage.getItem('ID'))
        .then(response => {
            setTrueQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-false-response/' + id + '/' + localStorage.getItem('ID'))
        .then(response => {
            setFalseQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-empty-response/' + id + '/' + localStorage.getItem('ID'))
        .then(response => {
            setEmptyQuestion(parseInt(response.data[0].Nbre))
        })
        axios.get('http://localhost:8080/quiz/nombre-total-response/' + id)
        .then(response => {
            setTotalTrueResponse(parseInt(response.data[0].Nbre))
        })
        
    }, []);

    return (
        <div className="QuizResultCard">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">Результат вопросника</div>
                        <div className="row card-body">
                            <div className="col-6">
                                <h5 className="card-title">{ quiz.Quiz }</h5>
                                <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-clock"> </i>Время : { quiz.Time } minutes</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-tag"> </i>Категория : { quiz.Category }</h6>
                                <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-question-circle"> </i>Количество вопросов : { nbreMaxQuestion }</h6>
                            </div>
                            <div className="col-6">
                                <h5 className="card-title">Результат</h5>
                                <h6 className="card-subtitle mb-2 text-success">
                                    <i className="bi bi-check-circle"> </i>
                                    { trueQuestion } / { totalTrueResponse } Правильные ответы
                                </h6>
                                <h6 className="card-subtitle mb-2 text-danger">
                                    <i className="bi bi-x-circle"> </i>
                                    { falseQuestion } Неправильные ответы
                                </h6>
                                <h6 className="card-subtitle mb-2 text-warning">
                                    <i className="bi bi-circle"> </i>
                                    { emptyQuestion } Вопросы без ответов
                                </h6>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <p className="text-info" style={{fontSize: 72 + 'px' }}> { Math.round((trueQuestion - falseQuestion)*100/totalTrueResponse) } %</p>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <button className="btn btn-sm btn-light" onClick={() => navigate('/play/' + id)}>Назад</button>
                            <button className="btn btn-sm btn-primary" onClick={() => navigate('/')}>Завершить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizResultCard;