import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';

const pushState = (obj, url) => 
    window.history.pushState(obj, '', url);



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
        contests: this.props.initialContests
    };
    componentDidMount() {
        //ajax
        //timeres and listeners
        // axios.get('/api/contests')
        //     .then(resp => {
        //         this.setState({
        //             contests: resp.data.contests
        //         });
        //     })
        //     .catch(console.error)       
    }

    componentWillUnmount() {
        //clear your timers and listeners
    }

    fetchContest = (contestId) => {
        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`
        );
        //lookup contests
        //this.state.contests[contestId] this gets the id from the contest object
        this.setState({
            pageHeader: this.state.contests[contestId].contestName, 
            currentContestId: contestId
        });

    };

    currentContent() {
        if(this.state.currentContestId) 
        {
            return <Contest {...this.state.contests[this.state.currentContestId]}/>;
        }

        return <ContestList
                    onContestClick = {this.fetchContest}
                    contests ={this.state.contests} />  

    }
    render(){   
        return (
            <div className="App">
                <Header message={this.state.pageHeader}/> 
                    {this.currentContent()}        
            </div>
        );
    }
}

export default App;