import React from 'react';
import localForage from 'localForage';

export default class Email extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: ''};
  }
  handleChange(event) {
    this.setState({text: event.target.value});
    localForage.setItem('emailText', event.target.value)
      .catch(err => {
        console.error(err);
      })
      .done();
  }
  componentWillMount() {
    localForage.getItem('emailText')
      .then(resp => {
        if (resp) {
          this.setState({text: resp});
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
        <label className="single-line__label" htmlFor="emailText">Email Body</label>
        <textarea 
          className="email-input"
          id="emailText"
          value={this.state.text}
          onChange={this.handleChange} 
          placeholder="Your message to your subscribers"
          required/>
      </div>
    );
  }
}