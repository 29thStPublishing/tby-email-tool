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
    var classes = classNames({
      expired: timeDifference < 0,
      upcoming: diffDays <= 30
    });

    return (
      <li className={classes}>
        <input id={user.email} onChange={this.handleClick} type="checkbox" checked={user.checked}/>
        <label htmlFor={user.email}>
          {user.email}: {user.expirationDate.toLocaleDateString()}
        </label>
      </li>
    );
  }

}