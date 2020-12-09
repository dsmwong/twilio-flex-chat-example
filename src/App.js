import React, { Component } from 'react';
import Login from './Login';
import ChatApp from './ChatApp';
import '@progress/kendo-theme-material/dist/all.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loggedIn: false,
      flexChannel: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.createFlex = this.createFlex.bind(this);
  }

createFlex(){
  fetch('https://brass-chicken-6161.twil.io/createFlexChannel', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: `identity=${encodeURIComponent(this.state.username)}`
    })
    .then(res => res.json())
    .then(data => this.setState({flexChannel: data.channel.sid}))
    // .then(data => console.log(data.channel.sid))
}

  handleLogin(event) {
    this.createFlex()
    event.preventDefault(); 
    this.setState({ loggedIn: true });
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    let loginOrChat;
    if (this.state.loggedIn) {
      loginOrChat = <ChatApp username={this.state.username} flexChannel={this.state.flexChannel}/>;
    } else {
      loginOrChat = (
        <Login
          handleLogin={this.handleLogin}
          handleUsernameChange={this.handleUsernameChange}
          username={this.state.username}
        />
      );
    }
    return (
      <div className="Container">
        <div className="row mt-3 justify-content-center">{loginOrChat}</div>
      </div>
    );
  }
}

export default App;
