import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App'

ReactDom.render(
    //React.createElement('h2', null, 'Hello React'),
    <App initalContests = {[]}/>,
    document.getElementById('root')
);

