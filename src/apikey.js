import React from 'react';
import localForage from 'localForage';

export default class APIKey extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
    this.state = {key: ''};
  }
  handleHelp(event) {
    event.preventDefault();
    var helpText = `
      <a href="https://mandrill.com/signup/" target="blank">Sign up</a> for Mandrill 
      to send email from this form. After registering, 
      <a href="https://mandrillapp.com/settings/index/" target="blank">generate a new API Key</a> 
      and plug it in here to send mail.`;
    this.props.helpPopup(helpText);
  }
  handleChange(event) {
    this.setState({key: event.target.value});
    localForage.setItem('apiKey', event.target.value)
      .catch(err => {
        console.error(err);
      })
      .done();
  }
  componentWillMount() {
    localForage.getItem('apiKey')
      .then(resp => {
        if (resp) {
          this.setState({key: resp});
        }
      })
      .catch(err => {
        console.error(err);
      })
      .done();
  }
  render() {
    return (
      <div className="single-line">
        <label className="single-line__label" htmlFor="apiKey">Mandrill API Key</label>
        <a className="single-line__help" onClick={this.handleHelp} href="#">?</a>
        <input className="single-line__input" type="text"
          id="apiKey" 
          value={this.state.key}
          onChange={this.handleChange}
          placeholder="Your Mandrill API key" 
          required />
      </div>
    );
  }
}
