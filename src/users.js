import React from 'react';
import fetch from './fetch';
import User from './user';

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
    this.state = {data: []};
  }
  sortDataByDate(data) {
    var usersList = Object.keys(data).map(email => {
      if (data[email].length) {
        return {email, expirationDate: new Date(data[email])};
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