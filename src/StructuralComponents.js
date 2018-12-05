import React from 'react';

import './App.css';

const Row = (props) => (
    <div className={ `row ${ (props.className) ? props.className : '' }` }>
        {props.children}
    </div>
);

const Column = (props) => (
    <div className={`cols-${ (props.cols) ? props.cols : 12 } ${ (props.className) ? props.className : '' }`}>
        {props.children}
    </div>
);

const Modal = (props) => (
    <div>
        <div className={ `modal ${ (props.className) ? props.className : '' } ${ (props.open) ? 'open' : '' }` }>
            <div className="content">
                <div className="close-btn" onClick={ props.toggleModal }>x</div>
                {props.children}
            </div>
        </div>
        <div className={`overlay ${ (props.open) ? 'open' : '' }`} onClick={props.toggleModal}></div>
    </div>
);


export { Row, Column, Modal };