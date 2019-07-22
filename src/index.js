import React from 'react';
import ReactDom from 'react-dom';



ReactDom.render(
    //React.createElement('h2', null, 'Hello React'),
    <h2 className="text-center">
        Hello React with JSX!!
    </h2>,
    document.getElementById('root')
);