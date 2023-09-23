import React from 'react';
import "./loader.css"

function Loader(props) {
    return (
        <div className={"my-loader"}>
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;