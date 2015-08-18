import React from 'react';
import Users from './users';
import Email from './email';

class App extends React.Component {
  render() {
    return(
      <div>
        <Email />
        <Users />
      </div>
    );
  }
}

React.render(<App />, document.body);