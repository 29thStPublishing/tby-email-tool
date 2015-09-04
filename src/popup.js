import React from 'react';
import classNames from 'classnames';
import closeSVG from './close';

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
    var classes = classNames('popup', {
      popped: this.props.isPopped,
    });
    return (
      <div className={classes}>
        <div className="popup__modal">
          <a className="close-popup" onClick={this.closePopup} href="#"><img src={closeSVG} /></a>
          <span dangerouslySetInnerHTML={{__html: this.props.text}} />
        </div>
      </div>
    );
  }
}