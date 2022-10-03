import React from "react";
import HeaderLink from "./HeaderLink";

const Header = (props) => {
    return (
        <div className="Header">
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        Вопросник
                    </span>
                    <div className="d-flex">
                        <HeaderLink connected={props.connected} />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;