import React, { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [message, setMessage] = useState(null);
    
    const register = (username, password, confPassword) => {
        if (username === '' || password === '' || confPassword === '') {
            setMessage(<Alert type='warning' text='Введите всю информацию' />);
        } else if (password !== confPassword) {
            setMessage(<Alert type='danger' text='Пароли не совпадают' />);
        } else {
            axios.post('http://localhost:8080/user/register', {
                username: username,
                password: password
            }).then(function (response) {
                localStorage.setItem('ID', response.data);
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            setMessage(<Alert type='success' text='Верный пароль' />);
            navigate('/');
        }
    }
    return (
        <div className="Register">
            <div className="row mt-5">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header text-white bg-primary">
                            Введите свои данные для регистрацииa
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
                            <div className="mb-3">
                                <label htmlFor="passwordConf" className="form-label">Подтвердите пароль</label>
                                <input type="password" className="form-control" id="passwordConf" placeholder="Подтвердите пароль..." value={ confPassword } onChange={ (e) => setConfPassword(e.target.value) } />
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <div className="row">
                                <div className="col-6 d-grid gap-2">
                                    <button className="btn btn-primary" onClick={ () => register(username, password, confPassword) }>Зарегистрироваться</button>
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

export default Register;