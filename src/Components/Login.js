import React, { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const login = () => {
        if (username === '' || password === '') {
            setMessage(<Alert type='warning' text='Введите всю информацию' />);
        } else {
            setMessage(<Alert type='info' text='En cours de traitement...' />);
            axios.post('http://localhost:8080/user/login', {
                username : username,
                password: password
            }).then(function (response) {
                if (response.data.length === 0) {
                    setMessage(<Alert type='danger' text='Ваши данные для входа в систему неверны...' />);
                } else {
                    localStorage.setItem('ID', response.data[0].RefUser);
                    setMessage(<Alert type='success' text='Connexion réussie...' />);
                    navigate('/');
                }
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <div className="Login">
            <div className="row mt-5">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header text-white bg-primary">
                        Введите данные для входа в систему
                        </div>
                        <div className="card-body">
                            { message }
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Имя пользователя</label>
                                <input type="text" className="form-control" id="username" placeholder="Имя пользователя..." value={ username } onChange={ (e) => setUsername(e.target.value) } />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input type="password" className="form-control" id="password" placeholder="Пароль..." value={ password } onChange={ (e) => setPassword(e.target.value) } />
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <div className="row">
                                <div className="col-6 d-grid gap-2">
                                    <button className="btn btn-primary" onClick={() => login(username, password) }>Войти</button>
                                </div>
                                <div className="col-6 d-grid gap-2">
                                    <NavLink to="/" className="btn btn-light">Отменить</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;