import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) => 
    window.history.pushState(obj, '', url);

const onPopState = handler => {
    window.onpopstate = handler;      
}

//React.createClass
//Only use this syntax if you need to use state with the component.
//Or if you need lifecyle method
class App extends React.Component {
    //This is the other way of setting up state
    /* constructor(props) {
        super(props);
        this.state={ test: 42}
    }     */
    static propTypes = {
        initialData: PropTypes.object.isRequired
    };
    state = this.props.initialData;
    //{
    //     contests: this.props.initialContests
    // };
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
       onPopState((event) =>{
          this.setState({
              currentContestId : (event.state || {}).currentContestId
          })
       });
    }

    componentWillUnmount() {
        //clear your timers and listeners
        onPopState(null);
    }

    fetchContest = (contestId) => {
        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`
        );
        api.fetchContest(contestId).then(contest =>{
            this.setState({                
                currentContestId: contest._id,
                contests:{
                    ...this.state.contests,
                    [contest._id]: contest
                }
            });
        });
        //lookup contests
        //this.state.contests[contestId] this gets the id from the contest object
    };
    fetchContestList = () => {
        pushState(
            {currentContestId: null},
            '/'
        );
        api.fetchContestList().then(contests =>{
            this.setState({                
                currentContestId: null,
                contests
            });
        });
        //lookup contests
        //this.state.contests[contestId] this gets the id from the contest object
    };

    fetchNames = (nameIds) => {
        if(nameIds.length === 0){
            return;
        }
        api.fetchNames(nameIds).then(names => {
            this.setState({names});
        })
    };

    currentContest (){
        return this.state.contests[this.state.currentContestId];
    }
    
    pageHeader(){
        if(this.state.currentContestId){
            return this.currentContest().contestName;
        }
        return 'Naming Contests';
    }

    lookupName = (nameId) => {
        if(!this.state.names || !this.state.names[nameId]){
            return {
                name: '...'
            };
        }
        return this.state.names[nameId];
    };
    currentContent() {
        if(this.state.currentContestId) 
        {
            return <Contest
                    contestListClick={this.fetchContestList}
                    fetchNames ={this.fetchNames}
                    lookupName = {this.lookupName}
                    {...this.currentContest()}/>;
        }

        return <ContestList
                    onContestClick = {this.fetchContest}
                    contests ={this.state.contests} />  

    }
    render(){   
        return (
            <div className="App">
                <Header message={this.pageHeader()}/> 
                    {this.currentContent()}        
            </div>
        );
    }
}

export default App;