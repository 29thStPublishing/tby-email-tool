import React from 'react';
import classNames from 'classnames';

export default class User extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.props.updateUser(this.props.user.email);
  }
  render() {
    var user = this.props.user;
    var today = new Date();
    var timeDifference = user.expirationDate.getTime() - today.getTime();
    var diffDays = (timeDifference > 0) ? Math.ceil(timeDifference / (1000 * 3600 * 24)) : 1000000000;
    var classes = classNames('user', {
      expired: timeDifference < 0,
      upcoming: diffDays <= 30
    });

    return (
      <li className={classes}>
        <input id={user.email} onChange={this.handleClick} type="checkbox" checked={user.checked}/>
        <label htmlFor={user.email}>
          <span className="email">{user.email}</span><span className="expiration-date">{user.expirationDate.toDateString()}</span>
        </label>
      </li>
    );
  }

}