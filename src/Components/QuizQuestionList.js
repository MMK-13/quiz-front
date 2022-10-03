import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuestionAndAnswers from "./QuestionAndAnswers";

const QuizQuestionList = (props) => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);

    if (props.updated) {
        axios.get('http://localhost:8080/quiz/question-list/' + id)
        .then(response => setQuestions(response.data))
        props.update()
    }
    
    return (
        <div className="QuizQuestionList">
            <div className="card">
                <div className="card-header">
                    Вопросы в вопроснике
                </div>
                <div className="card-body">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        { questions.map(question => (
                            <QuestionAndAnswers key={ question.RefQuestion } question={ question } />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizQuestionList;