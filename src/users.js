import React from 'react';
import User from './user';
import userData from './data';

function compare(a, b) {
  if (a.expirationDate < b.expirationDate) {
    return -1;
  }
  if (a.expirationDate > b.expirationDate) {
    return 1;
  }
  return 0;
}

export default class Users extends React.Component {
  constructor() {
    super();
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.state = {data: this.sortDataByDate(userData)};
  }
  handleUserUpdate(email) {
    var newState = this.state.data.map(user => {
      if (user.email === email) {
        user.checked = !user.checked;
      }
      return user;
    });

    this.setState({data: newState});
  }
  sortDataByDate(data) {
    var usersList = Object.keys(data).map(email => {
      if (data[email].length) {
        return {email, expirationDate: new Date(data[email]), checked: false};
      }
    }).filter(user => {
      return user;
    }).sort(compare);

    return usersList;
  }
  componentWillMount() {
    fetch('data.json')
      .then(resp => {
        let data = this.sortDataByDate(resp);
        this.setState({data: data});
      })
  }
  render() {
    return(
      <div>
        <ul>
          {this.state.data.map((user, i) => {
            return <User key={i} user={user}/>;
          })}
        </ul>
      </div>
    );
  }
}