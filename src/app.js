import React from 'react';
import Users from './users';
import Email from './email';
import APIKey from './apikey';
import UserName from './username';
import fetch from './fetch';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var emailText = this.refs.emailText.state.text;
    var emailAddresses = this.refs.users.state.data
      .filter(user => user.checked)
      .map(user => user.email);
    var apiKey = this.refs.apiKey.state.key;
    var dc = apiKey.split('-').pop()
    var mailChimpApiUrl = `https://${dc}.api.mailchimp.com/3.0/`;
    var username = this.refs.username.state.name;


    console.log(fetch(mailChimpApiUrl, {auth: {username: username, password: apiKey}}))

  }
  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <APIKey ref="apiKey" />
          <UserName ref="username" />
          <Email ref="emailText" />
          <Users ref="users" />
          <button type="submit">Generate Email</button>
        </form>
      </div>
    );
  }
}

React.render(<App />, document.body);