import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Alert from './Alert';

const AddQuiz = (props) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("0");
    const [title, setTitle] = useState('');
    const [time, setTime] = useState(0);
    const [id, setId] = useState(null);
    const [message, setMessage] = useState(null);
    const [updated, setUpdated] = useState(false);
    let cardTitle = '';

    if (props.type === 'update') {
        cardTitle = "Создание вопросника"
    } else if (props.type === 'add') {
        cardTitle = "Создание вопросника"
    }

    useEffect(() => {
        if (!updated) {
            axios.get('http://localhost:8080/quiz/categories')
                .then(response => setCategories(response.data));
            if (props.type === 'add') {
            
            } else if (props.type === 'update') {
                axios.get('http://localhost:8080/quiz/get/' + props.id)
                    .then(response => {
                        setTitle(response.data[0].Quiz)
                        setCurrentCategory(response.data[0].RefCategory)
                        setTime(response.data[0].Time)
                        setId(response.data[0].RefQuiz)
                    })
            }
            setUpdated(true)
        }
    }, [categories, updated]);

    const createQuiz = (title, category, time) => {
        if (title == '' || category == "0") {
            setMessage(<Alert type='warning' text='Veuillez renseigner tous les champs...' />)
        } else {
            setMessage(<Alert type='info' text='Traîtement en cours...' />);
            if (id === null) {
                axios.post('http://localhost:8080/quiz/add', {
                    title: title,
                    category: category,
                    time: time,
                    user: localStorage.getItem('ID')
                }).then(response => {
                    setMessage(<Alert type='success' text='Enrégistrement éffectué...' />);
                    console.log(response)
                    navigate('/quiz/list')
                })
                .catch(error => console.log(error))
            } else {
                axios.post('http://localhost:8080/quiz/update/' + id, {
                    title: title,
                    category: category,
                    time: time
                }).then(response => {
                    setMessage(<Alert type='success' text='Enrégistrement éffectué...' />);
                    console.log(response)
                    navigate('/quiz/list')
                })
                .catch(error => console.log(error))
            }
        }
    } 
    
    return (
        <div className="AddQuiz">
            <div className='row mt-4'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header'>
                            { cardTitle }
                        </div>
                        <div className='card-body'>
                            { message }
                            <div className="mb-3">
                                <label className='form-label' htmlFor='titre'>Титул</label>
                                <input id='titre' type="text" className='form-control' placeholder='Титул...' value={ title } onChange={ (e) => setTitle(e.target.value) } required/>
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor='category'>Категория</label>
                                <select id='category' className='form-control' onChange={ (e) => setCurrentCategory(e.target.value) } required>
                                    <option value="0">Категория</option>
                                    { categories
                                    .filter(category => category.RefCategory != 0)
                                        .map((category) => (
                                            <option key={ category.Category } value={ category.RefCategory } selected={ (category.RefCategory === currentCategory)?'selected':'' }>{ category.Category }</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor='time'>Время</label>
                                <input id='time' type="number" className='form-control' min="0" max="60" placeholder='Время...' value={ time } onChange={ (e) => setTime(e.target.value) } required/>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className="row">
                                <div className="col-6 d-grid gap-2">
                                    <button className="btn btn-primary" onClick={() => createQuiz(title, currentCategory, time) }>Сохранить</button>
                                </div>
                                <div className="col-6 d-grid gap-2">
                                    <NavLink to="/quiz/list" className="btn btn-light">Отменить</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddQuiz;
