import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLink = (props) => {
    let links;

    if (props.connected) {
        links = [
            <NavLink to="/" className="btn btn-primary">
                <i className="bi bi-home"> </i>
                Главная
            </NavLink>,
            <NavLink to="/quiz/list" className="btn btn-primary">
                <i className="bi bi-question-circle"> </i>
                Мои вопросники
            </NavLink>,
            <NavLink to="/account/logout" className="btn btn-primary">
                <i className="bi bi-box-arrow-left"> </i>
                Выйти
            </NavLink>
        ];
    } else {
        links = [
            <NavLink to="/account/login" className="btn btn-primary">
                <i className="bi bi-box-arrow-right"> </i>
                Войти
            </NavLink>,
            <NavLink to="/account/register" className="btn btn-primary">
                <i className="bi bi-box-arrow-in-up"> </i>
                Зарегистрироваться
            </NavLink>
        ];
    }

    return (
        <div className="HeaderLink">
            {links.map((link, key) => (  
                <span key={key}>{ link }</span>
            ))}  
        </div>
    );
}

export default HeaderLink;