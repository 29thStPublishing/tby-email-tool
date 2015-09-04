import React from 'react';
import localForage from 'localForage';

export default class FromName extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {name: ''};
  }
  handleChange(event) {
    this.setState({name: event.target.value});
    localForage.setItem('fromName', event.target.value)
      .catch(err => {
        console.error(err);
      })
      .done();
  }
  componentWillMount() {
    localForage.getItem('fromName')
      .then(resp => {
        if (resp) {
          this.setState({name: resp});
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
        <label className="single-line__label" htmlFor="fromName">From Name</label>
        <input className="single-line__input" type="text"
          id="fromName" 
          value={this.state.name}
          onChange={this.handleChange} 
          placeholder="Your name"/>
      </div>
    );
  }
}
