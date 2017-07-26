import React, { Component } from 'react';
import charizard from './charizard.json';

export default class AppState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: charizard
    };

    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(updater, callback) {
    this.setState(updater, () => {
      if (this.props.debug) {
        console.log('setAppState', JSON.stringify(this.state));
      }
      if (callback) {
        callback();
      }
    });
  }

  render() {
    return (
      <div className="AppState">
        {React.cloneElement(this.props.children, {
            appState: this.state,
            setAppState: this.setAppState
        })}
      </div>
    )
  }
}
