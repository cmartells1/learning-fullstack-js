import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContestPreview from './ContestPreview';


//React.createClass
//Only use this syntax if you need to use state with the component.
//Or if you need lifecyle method
class App extends React.Component {
    //This is the other way of setting up state
    /* constructor(props) {
        super(props);
        this.state={ test: 42}
    }     */
    state = {
        pageHeader :'Naming Contests',
        contests: this.props.initalContests
    };
    componentDidMount() {
        //ajax
        //timeres and listeners
        axios.get('/api/contests')
            .then(resp => {
                this.setState({
                    contests: resp.data.contests
                });
            })
            .catch(console.error)       
    }

    componentWillUnmount() {
        //clear your timers and listeners
    }

    render(){   
        return (
            <div className="App">
                <Header message={this.state.pageHeader}/>
                <div>
                    {this.state.contests.map(contest =>
                    <ContestPreview key={contest.id} {...contest} />)}
                </div>
            </div>
        );
    }
}

export default App;