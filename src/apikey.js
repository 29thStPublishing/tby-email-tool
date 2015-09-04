import React from 'react';
import localForage from 'localForage';

export default class APIKey extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {key: ''};
  }
  handleChange(event) {
    localForage.setItem('apiKey', event.target.value)
      .then(resp => {
        this.setState({key: resp});
      })
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
      <div>
        <label htmlFor="apiKey">Mandrill API Key</label>
        <input type="text"
          id="apiKey" 
          value={this.state.key}
          onChange={this.handleChange} 
          required />
      </div>
    );
  }
}
