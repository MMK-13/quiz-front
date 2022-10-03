import React, { useState } from "react";
import EditQuestion from "./EditQuestion";
import QuizQuestionList from "./QuizQuestionList";

const QuizQuestion = (props) => {
    const [updated, setUpdated] = useState(true);
    const update = () => {
        setUpdated(!updated)
        console.log('Mise à jour')
    }
    return (
        <div className="QuizQuestion">
            <div className='row mt-4'>
                <div className="col-2"></div>
                <div className="col-8">
                    <EditQuestion update={ update } />

                    <QuizQuestionList update={ update } updated={ updated }/>
                </div>
            </div>
        </div>
    );
}

export default QuizQuestion;