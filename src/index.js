import React from 'react';
import ReactDom from 'react-dom';
//import axios from 'axios';


import App from './components/App'

ReactDom.render(
            //React.createElement('h2', null, 'Hello React'),
            <App initialData = {window.initialData}/>,
            document.getElementById('root')
        );

// axios.get('/api/contests')
// .then(resp => {
//     ReactDom.render(
//         //React.createElement('h2', null, 'Hello React'),
//         <App initalContests = {resp.data.contests}/>,
//         document.getElementById('root')
//     );
    
//     // this.setState({
//     //     contests: resp.data.contests
//     // });
// })
// .catch(console.error)    


