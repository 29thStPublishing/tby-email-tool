import React from 'react';
import localForage from 'localForage';

export default class EmailSubject extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: ''};
  }
  handleChange(event) {
    this.setState({text: event.target.value});
    localForage.setItem('emailSubject', event.target.value)
      .catch(err => {
        console.error(err);
      })
      .done();
  }
  componentWillMount() {
    localForage.getItem('emailSubject')
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
        <label className="single-line__label" htmlFor="emailSubject">Subject</label>
        <input className="single-line__input" type="text"
          id="emailSubject" 
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Your email subject" 
          required/>
      </div>
    );
  }
}
