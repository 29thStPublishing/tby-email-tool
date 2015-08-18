import React from 'react';
import classNames from 'classnames';

export default class User extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    console.log(this.props.user.email);
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

    console.log(this.props.email)

    return (
      <li className={classes} onClick={this.handleClick}>
        {user.email}: {user.expirationDate.toLocaleDateString()}
      </li>
    );
  }

}