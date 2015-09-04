import React from 'react';
import classNames from 'classnames';

export default class Popup extends React.Component {
  constructor() {
    super();
    this.closePopup = this.closePopup.bind(this);
  }
  closePopup(event) {
    event.preventDefault();
    this.props.closePopup();
  }
  render() {
    var classes = classNames('popup-modal', {
      popped: this.props.isPopped,
    });
    return (
      <div className={classes}>
        <a onClick={this.closePopup} href="#">x</a>
        <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
      </div>
    );
  }
}