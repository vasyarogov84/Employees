import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";
import "../src/css/test.css";
import Loading from "./Loading";
import SmallDevice from "./components/SmallDevice";

class App extends Component {
  state = {
    users: [],
    width: window.screen.width
  };
  async componentDidMount() {
    let request;
    let array = [];
    for (let i = 0; i < 10; i++) {
      request = await axios.get("https://randomuser.me/api");
      let { results } = await request.data;
      array.push({ results });
    }
    this.setState({ users: [...this.state.users, ...array] });
  }

  renderSmallDevice = () => {
    if (!this.state.users.length) {
      return <Loading />;
    } else {
      return <SmallDevice users={this.state.users} />;
    }
  };

  renderUsers = users => {
    return users.map(user => {
      const {
        email,
        phone,
        name: { first, last },
        picture: { thumbnail },
        dob: { age }
      } = user.results[0];

      return (
        <tr key={uuid()}>
          <td>
            <img src={thumbnail} alt="person" />
          </td>
          <td className="single line">
            {first} {last}
          </td>
          <td>{email}</td>
          <td className="ui right center">{phone}</td>
          <td>{age}</td>
        </tr>
      );
    });
  };

  renderContent = () => {
    if (!this.state.users.length) {
      return <Loading />;
    } else {
      return (
        <div className="ui container">
          <div className="ui segment">
            <h3>Table of Employees</h3>
          </div>
          <div>
            <table className="ui celled padded table">
              <thead>
                <tr>
                  <th className="single line">Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>{this.renderUsers(this.state.users)}</tbody>
            </table>
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        {this.state.width > 600
          ? this.renderContent()
          : this.renderSmallDevice()}
      </div>
    );
  }
}

export default App;
