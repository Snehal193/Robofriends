import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: robots,
            searchfield: "",
        }
    }


    componentDidMount() {

        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(users => this.setState({robots : users}));

    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }
    render() {
        const {robots , searchfield} = this.state
        const filteredrobots = robots.filter((robots) => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return (!robots.length) ?
         <h1>loading</h1> :    /*used ternary operator= condition ? exprIfTrue : exprIfFalse */
          (
            <div className='tc'>
                <h1>Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                <ErrorBoundry>
                 <CardList robots={filteredrobots} /> {/* robots now accessed from this.state in constructor*/}
                </ErrorBoundry>
                </Scroll>
            </div>
        );
    }

}

export default App;