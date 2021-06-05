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
  const flexFlowSid = 'FOf60f57e420d826f506d1faa915dec6ba';
  //const flexFlowSid = 'FO3823151c45ecdfd4837a5ffe2e46008b'
  fetch('https://custom-chat-6571.twil.io/createFlexChannel', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: `identity=${encodeURIComponent(this.state.username)}&flexFlowSid=${flexFlowSid}`
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
