import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorBoundary from "../components/ErrorBoundary";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
// import { robots } from "./robots";
import "./App.css";
import { setSearchField, requestRobots } from "../actions";

// what state it needs to listen to
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

// action triggers the object but to send the action we need dispatch
// to dispatch it into the reducer
// what props I should listen to that are actions to be dispatched
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()), // same as requestRobots(dispatch)
  };
};

class App extends Component {
  // automatically loaded
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter((robot) => {
      return (
        robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
        robot.email.toLowerCase().includes(searchField.toLowerCase())
      );
    });

    return isPending ? (
      <h1 className="tc">Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">Robofriends</h1>
        <SearchBox searchField={searchField} searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

// connect is a highler level function so it runs and returns another function
// subscribes to any state changes in the redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);
