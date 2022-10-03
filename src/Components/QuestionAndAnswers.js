import axios from "axios";
import React, { useEffect, useState } from "react";

const QuestionAndAnswers = (props) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/question-answers/' + props.question.RefQuestion)
        .then(response => setAnswers(response.data))
    }, []);
    
    const deleteQuestion = () => {
        if (window.confirm('Вы уверены?')) {
            document.getElementById('question' + props.question.RefQuestion).remove()
            axios.get('http://localhost:8080/quiz/delete-question/' + props.question.RefQuestion)
        }
    }
    
    return (
        <div className="QuestionAndAnswers" id={ "question" + props.question.RefQuestion }>
            <div className="accordion-item">
                <h2 className="accordion-header" id={ "h-question" + props.question.RefQuestion }>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ "#f-question" + props.question.RefQuestion } aria-expanded="false" aria-controls={ "f-question" + props.question.RefQuestion }>
                        <button onClick={() => deleteQuestion() } className="btn btn-sm btn-danger"><i className="bi bi-trash"> </i></button>
                        { ' '+ props.question.Question }
                    </button>
                </h2>
                <div id={ "f-question" + props.question.RefQuestion } className="accordion-collapse collapse" aria-labelledby={ "h-question" + props.question.RefQuestion } data-bs-parent="#accordionFlushExample">
                    <div className="row accordion-body">
                        { answers.map(answer => (
                        <div key={ answer.RefAnswer } className={ (answer.isTrue == 1)?"col-12 mb-1 badge bg-success":"col-12 mb-1 badge bg-light text-dark" }>
                            { answer.Answer }
                        </div>
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionAndAnswers;