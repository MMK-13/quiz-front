import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Countdown from 'react-countdown';

const QuizPlayQuestion = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionID, setCurrentQuestionID] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [nbreMaxQuestion, setNbreMaxQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [changed, setChanged] = useState(true);
    const [selected, setSelected] = useState(0);
    
    useEffect(() => {
        axios.get('http://localhost:8080/quiz/get/' + id)
        .then(response => {
            setQuiz(response.data[0])
        })
        axios.get('http://localhost:8080/quiz/nbre-question/' + id)
        .then(response => {
            setNbreMaxQuestion(response.data[0].Nbre -1)
        })
    }, []);

    useEffect(() => {
        if (changed) {
            axios.get('http://localhost:8080/quiz/question-list/' + id)
            .then(response =>  {
                setQuestions(response.data)
                setCurrentQuestion(response.data[currentQuestionID])
                console.log(response.data[currentQuestionID]);
                axios.get('http://localhost:8080/questions/'+localStorage.getItem('ID')+'/'+response.data[currentQuestionID].RefQuestion)
                .then(response => {
                    setAnswers(response.data)
                    console.log(response.data);
                })
            })
            
            setChanged(false)
        }
    }, [currentQuestionID, currentQuestion, answers]);
    
    const updateResponse = (question) => {
        axios.get('http://localhost:8080/question-answers/delete-all/' + question + '/' + localStorage.getItem('ID'));
        let responses = document.querySelectorAll('input[name="response"]:checked');;
        let answer_id;
        setTimeout(() => {
            console.log(responses.length);
            for (let i = 0; i < responses.length; i++){
                if(responses[i].checked){
                    answer_id = responses[i].value;
                    //alert(answer_id);
                    axios.post('http://localhost:8080/question-answer/add', {
                        question: question,
                        user: localStorage.getItem('ID'),
                        answer: answer_id
                    })
                }
            }
        }, 500);
    }

    //const Completionist = () => navigate('/quiz-result/' + id);
    const Completionist = () => {
        navigate('/quiz-result/' + id);
        return (<div></div>)
    }
    
    return (
        <div className="QuizPlayQuestion mt-4">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <span>{ quiz.Quiz }</span>
                            <span>Время : 
                                <Countdown date={ props.time }>
                                    <Completionist />
                                </Countdown>
                            </span>
                        </div>
                        <div className="card-body">
                            <p><b>{ (currentQuestionID +1) + '. ' + currentQuestion.Question }</b></p>
                            <ul>
                                { answers.map(answer => (
                                    <div key={ answer.RefAnswer } className="form-check">
                                        <input className="form-check-input" name="response" type={ (currentQuestion.RefTypeQuestion==1)?'radio':'checkbox' } value={ answer.RefAnswer } id={ 'label' + answer.RefAnswer } onClick={ () => { updateResponse(currentQuestion.RefQuestion); setChanged(true); setSelected(answer.RefAnswer) }} onChange={() => { setChanged(true); setSelected(answer.RefAnswer) }} checked={ ((answer.MyAnswer != null && answer.MyAnswer == answer.RefAnswer))?true:null } />
                                        <label className="form-check-label" htmlFor={ 'label' + answer.RefAnswer }>{ answer.Answer }</label>
                                    </div>
                                )) }
                            </ul>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <button className="btn btn-sm btn-light mr-4" onClick={() => { if (currentQuestionID > 0) { setCurrentQuestionID(currentQuestionID -1); setChanged(true); }}}>Предыдущий</button>
                            <button className="btn btn-sm btn-primary " onClick={() => navigate('/quiz-result/' + id) }>Завершить</button>
                            <button className="btn btn-sm btn-light ml-4" onClick={() => { if (currentQuestionID < nbreMaxQuestion) { setCurrentQuestionID(currentQuestionID +1); setChanged(true); }}}>Следующий</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizPlayQuestion;