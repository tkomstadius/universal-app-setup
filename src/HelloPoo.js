import React from 'react';

export default class HelloPoo extends React.Component {
  render() {
    return <h1>{ ["Hello ", "Poo! ", 'BOOOO'].map(text => <span>{ text }</span>) }</h1>;
  }
}
