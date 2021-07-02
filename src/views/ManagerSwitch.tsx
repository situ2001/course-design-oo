/* eslint-disable react/prefer-stateless-function */
// manager view (logged in)
import React from 'react';
import Login from './Login';
import Manage from './Manager';

// TODO

export default class ManagerSwitch extends React.Component<any> {
  private refresh = () => {
    // update to get the latest loggedIn status
    this.setState({});
  };

  render() {
    return (
      <>
        {localStorage.getItem('loggedIn') !== 'true' ? (
          <Login foo={new Date().getTime()} refresh={this.refresh} />
        ) : (
          <Manage foo={new Date().getTime()} refresh={this.refresh} />
        )}
      </>
    );
  }
}
