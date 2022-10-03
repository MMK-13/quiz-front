import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

const EditQuestion = (props) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [nbreAnswers, setNbreAnswers] = useState(2);
    const [multiple, setMultiple] = useState(false);
    let nQuestionAnswers = [];
    let nIsAnswer = [];

    for (let i = 1; i <= nbreAnswers; i++) {
        nQuestionAnswers.push('Ответ #' + i)
        nIsAnswer.push(false);
    }
    
    const save = () => {
        axios.post('http://localhost:8080/question/add', {
            question: title,
            type: (multiple)?2:1,
            id: id,
            answers: [
                nQuestionAnswers, nIsAnswer
            ]
        })
        props.update()
    }
    
    return (
        <div className="EditQuestion">
            <div className="card mb-4">
                <div className="card-header">
                    Добавить вопрос
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8 mb-3">
                            <label className='form-label' htmlFor='question'>Вопрос</label>
                            <input id='question' type="text" className='form-control' placeholder='Введите вопрос...' value={ title } onChange={ (e) => setTitle(e.target.value) } required/>
                        </div>
                        <div className="col-2">
                            <label className="form-label" htmlFor="nombreAnswer">Ответы</label>
                            <input id='nombreAnswer' type="number" min="2" max="5" className='form-control' placeholder='Введите количество ответов...' value={ nbreAnswers } onChange={ (e) => setNbreAnswers(e.target.value) } required/>
                        </div>
                        <div className="col-2">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="type" checked={ multiple } onChange={ () => setMultiple(!multiple) } />
                                <label className="form-label" htmlFor="type">Множество</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        { nQuestionAnswers.map((answer, index) => (
                            <div key={ index } className="row mb-1">
                                <span className="col-1 badge bg-light text-dark">{ '#' + (index + 1) }</span>
                                <div className="col-9">
                                    <input type="text" name="answers[]" className="form-control form-control-sm" onChange={ (e) => { nQuestionAnswers[index] = e.target.value } } placeholder={ answer } />
                                </div>
                                <div className="col-2 form-check">
                                    <input className="form-check-input" type={ (multiple)?"checkbox":"radio" } id={ "correct" + index } name={ (multiple)?"correct[]":"correct" } onChange={ () => {
                                        if (!multiple) {
                                            for (let i = 0; i < nbreAnswers; i++) {
                                                nIsAnswer[i] = false;
                                            }
                                        }
                                        nIsAnswer[index] = !nIsAnswer[index]
                                        console.log(nIsAnswer)
                                    } } />
                                    <label className="form-check-label" htmlFor={ "correct" + index }>
                                        Ответ
                                    </label>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-3 d-grid gap-2">
                            <button className="btn btn-primary" onClick={() => save() }>Сохранить</button>
                        </div>
                        <div className="col-3 d-grid gap-2">
                            <NavLink to="/quiz/list" className="btn btn-light">Отменить</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditQuestion;