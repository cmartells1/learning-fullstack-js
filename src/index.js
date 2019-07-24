import React from 'react';
import PropTypes from 'prop-types'
import ReactDom from 'react-dom';


const Header = ({message}) => {
    return(
        <h2 className="text-center">
            {/* Hello React Components!! */}
            {message}
         </h2>
    );
};

Header.propTypes = {
    message: PropTypes.string
};

const App = () => {
    return (
        <div className="App">
            <Header message="Naming Contests"/>
            <div>
                ...
            </div>
        </div>
    );
};

ReactDom.render(
    //React.createElement('h2', null, 'Hello React'),
    <App />,
    document.getElementById('root')
);