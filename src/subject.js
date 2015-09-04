import React from 'react';
import localForage from 'localForage';

export default class EmailSubject extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: ''};
  }
  handleChange(event) {
    localForage.setItem('emailSubject', event.target.value)
      .then(resp => {
        this.setState({text: resp});
      })
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
      <div>
        <label htmlFor="emailSubject">Subject</label>
        <input type="text"
          id="emailSubject" 
          value={this.state.text}
          onChange={this.handleChange} 
          required/>
      </div>
    );
  }
}
