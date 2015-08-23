import React from 'react';
import Router from 'react-router';
import Request from 'superagent';

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount() {
    console.log(localStorage)
    if(window.localStorage.token != "")
      this.setState({isLoggedIn: true})
  }

  handleSubmit(e) {
    var inputs = document.getElementsByTagName('input');
    var username = inputs[0].value
    var password = inputs[1].value
    var user = {
      username: username,
      password: password
    }

    console.log(user);
    e.preventDefault();
    var _this = this
    Request.post("http://localhost:3000/tokens/verify")
    .send({user:user})
    .end((err,res) => {
      console.log(res);
      let response = JSON.parse(res.text)
      const token  = response.token
      _this.setState({
        isLoggedIn: true
      })
      window.localStorage.token = token
    })
  }

  logOut(e) {
    e.preventDefault();
    window.localStorage.token = ""
    console.log(localStorage)
    this.setState({
      isLoggedIn: false
    })
  }
  render () {
    if(this.state.isLoggedIn)
      var logout = <button onClick={this.logOut.bind(this)}> Logout </button>
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="enter username" ref="user" />
          <input type="password" placeholder="enter password" ref="pass" />
          <input type="submit" />
        </form>
        {logout}
      </div>
    );
  }
}

module.exports = Login;
