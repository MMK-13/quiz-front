import axios from "axios";
import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";

const ListQuiz = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [quizes, setQuizes] = useState([]);
    const [changed, setChanged] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/categories')
        .then(response => {
            setCategories(response.data);
        });
    }, []);
    useEffect(() => {
        if (changed) {
            if (currentCategory == 0) {
                axios.get('http://localhost:8080/quiz/all')
                .then(response => {
                    setQuizes(response.data);
                });
            } else {
                axios.get('http://localhost:8080/quiz/by-category/' + currentCategory)
                .then(response => {
                    setQuizes(response.data);
                });
            }
            setChanged(false);
        }
    }, [quizes, changed]);
    return (
        <div className="ListQuiz">
            <div className="btn-group mt-4" role="group" aria-label="Basic radio toggle button group">
                { categories.map((category) => {
                    return (
                        <span key={ category.RefCategory }>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio"
                                id={ 'btnradio' + category.RefCategory }
                                value={ category.RefCategory }
                                onChange={(e) => {
                                    setCurrentCategory(e.target.value);
                                    setChanged(true);
                                }}
                                checked={ category.RefCategory == currentCategory }
                            />
                            <label className="btn btn-outline-primary" htmlFor={ 'btnradio' + category.RefCategory }>{ category.Category }</label>
                        </span>
                    )
                }) }
            </div>
            <div className="row mt-4">
                { quizes.map((quiz) => (
                    <QuizCard key={quiz.RefQuiz} quiz={ quiz } />
                )) }
            </div>
        </div>
    );
}

export default ListQuiz;