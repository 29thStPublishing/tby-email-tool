import React from 'react';
import localForage from 'localForage';

export default class Email extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: ''};
  }
  handleChange(event) {
    localForage.setItem('emailText', event.target.value)
      .then(resp => {
        this.setState({text: resp});
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
      <textarea 
        value={this.state.text}
        onChange={this.handleChange}
        rows="10" cols="100" />
    );
  }
}