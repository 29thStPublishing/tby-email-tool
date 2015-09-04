import React from 'react';
import localForage from 'localForage';

export default class FromEmail extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {email: ''};
  }
  handleChange(event) {
    this.setState({email: event.target.value});
    localForage.setItem('fromEmail', event.target.value)
      .catch(err => {
        console.error(err);
      })
      .done();
  }
  componentWillMount() {
    localForage.getItem('fromEmail')
      .then(resp => {
        if (resp) {
          this.setState({email: resp});
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
        <label className="single-line__label" htmlFor="fromEmail">From Email</label>
        <input className="single-line__input" type="text"
          id="fromEmail" 
          value={this.state.email}
          onChange={this.handleChange} 
          required/>
      </div>
    );
  }
}
