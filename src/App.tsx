/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Head from './views/Head';
import './App.global.css';

type State = {
  currentComponent: number;
};

export default class App extends React.Component<any, State> {
  render() {
    return (
      <>
        <Head />
      </>
    );
  }
}
