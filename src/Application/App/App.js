import React, { Component } from 'react';
import { fetchSchoolsInfo } from '../api-call';
import Navbar from '../Navbar/Navbar';
import StateSelectionForm from '../StateForm/StateSelectionForm';
import SchoolContainer from '../SchoolContainer/SchoolContainer'
import FavoriteSchools from '../FavoriteSchools/FavoriteSchools';
import SchoolDetailPage from '../SchoolDetailPage/SchoolDetailPage'
import { Route, Switch } from 'react-router-dom'
import './App.css';

class App extends Component {
  state = {
    lists: [],
    favoriteSchoolsApp: [],
    favorite: false,
    error: false
  }

  getSchoolsByState = state => {
    fetchSchoolsInfo(state)
      .then(data => {
        this.setState({ 
            lists: data.results
         })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ error: true })
      })
  }

  getFavoriteSchols = schools => {
    this.setState({favoriteSchoolsApp: [...schools]})
  }

  render() {
    return (
      <main className="App">
          <Navbar />
          <StateSelectionForm getSchoolsByState = {this.getSchoolsByState} /> 
          <Switch>
            {console.log(this.state.favoriteSchoolsApp)}
            {/* <Route exact path="/" render={() => {
            return (
              <>
                <Navbar />
                <StateSelectionForm getSchoolsByState = {this.getSchoolsByState} /> 
              </>
            )
           }}/> */}
            <Route exact path='/:state' render={(match) => {
              return (
                <SchoolContainer 
                  usState={match.match.params.state} 
                  lists={this.state.lists} 
                  favorite={this.state.favorite}
                  getFavoriteSchols={this.getFavoriteSchols}
                />
              )
            }}/>
            <Route exact path="/state/chosen/favorites" render={() => {
                return (
                  <FavoriteSchools 
                    favoriteSchools={this.state.favoriteSchoolsApp}
                  />
                ) 
              }}/>
            <Route exact path="/:state/:schoolName" render={(match) => {
                return (
                  <SchoolDetailPage 
                    schoolName={match.match.params.schoolName} 
                    lists={this.state.lists} 
                  />
                ) 
              }}/>
              <Route exact path="/state/chosen/:state/:schoolName" render={(match) => {
                return (
                  <SchoolDetailPage 
                    schoolName={match.match.params.schoolName} 
                    lists={this.state.lists} 
                  />
                ) 
              }}/>
          </Switch>
      </main>
    );
  }
}


export default App;
