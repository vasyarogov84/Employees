import React from "react";
import uuid from "uuid";

export default class SmallDevice extends React.Component {
  renderUser = () => {
    return this.props.users.map(user => {
      const {
        email,
        phone,
        name: { first, last },
        picture: { large },
        dob: { age }
      } = user.results[0];
      return (
        <div key={uuid()} className="ui card">
          <div className="image">
            <img src={large} alt="small device" />
          </div>
          <div className="content">
            <p className="header">
              {first} {last}
            </p>
            <div className="meta">
              <span className="date">Age: {age}</span>
            </div>
            <div className="description">Phone: {phone}</div>
          </div>
          <div className="extra content">
            <i className="user icon" />
            {email}
          </div>
        </div>
      );
    });
  };

  render() {
    return <div className="ui container">{this.renderUser()}</div>;
  }
}
