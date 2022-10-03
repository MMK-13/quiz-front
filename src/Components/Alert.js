import React from "react";

const Alert = (props) => {
    const type = 'alert alert-'+ props.type +' alert-dismissible fade show';
    return (
        <div className="Alert">
            <div className={ type } role="alert">
                { props.text }
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    );
}

export default Alert;