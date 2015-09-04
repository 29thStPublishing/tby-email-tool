import React from 'react';
import Users from './users';
import Email from './email';
import APIKey from './apikey';
import FromEmail from './fromemail';
import EmailSubject from './subject';
import Popup from './popup';
import fetch from './fetch';

class App extends React.Component {
  constructor() {
    super();
    this.state = {popup: false, popupText: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.helpPopup = this.helpPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  helpPopup(text) {
    this.setState({popup: true, popupText: text});
  }
  closePopup() {
    this.setState({popup: false, popupText: ''});
  }
  handleSubmit(event) {
    event.preventDefault();
    var emailSubject = this.refs.emailSubject.state.text;
    var emailText = this.refs.emailText.state.text;
    var emailAddresses = this.refs.users.state.data
      .filter(user => user.checked)
      .map(user => {return {email: user.email}});
    var fromEmail = this.refs.fromEmail.state.email;
    var apiKey = this.refs.apiKey.state.key;
    var madrillUrl = `https://mandrillapp.com/api/1.0/messages/send.json`;
    var body = {
      key: apiKey,
      message: {
        subject: emailSubject,
        text: emailText,
        from_email: fromEmail,
        to: emailAddresses
      }
    }

    fetch(madrillUrl, {method: 'post', body: body})
      .then(resp => {
        var failures = resp.filter(email => email.status !== 'sent');
        if (failures.length) {
          throw Error('Something went wrong');
        }
        else{
          alert('Your email was sent!');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong. Please contact support@29.io.');
      });

  }
  render() {
    return(
      <div>
        <Popup 
          isPopped={this.state.popup}
          text={this.state.popupText}
          closePopup={this.closePopup}/>
        <form onSubmit={this.handleSubmit}>
          <FromEmail ref="fromEmail" />
          <APIKey ref="apiKey" helpPopup={this.helpPopup} />
          <EmailSubject ref="emailSubject" />
          <Email ref="emailText" />
          <Users ref="users" />
          <button type="submit">Send Email</button>
        </form>
      </div>
    );
  }
}

React.render(<App />, document.body);