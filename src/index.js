import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App'
import data from './testData';
console.log(data);

ReactDom.render(
    //React.createElement('h2', null, 'Hello React'),
    <App contests = {data.contests}/>,
    document.getElementById('root')
);

