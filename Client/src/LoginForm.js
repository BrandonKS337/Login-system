import React from "react";
import InputField from "./InputField"; //pulls in the input field component
import SubmitButton from "./SubmitButton"; //pulls ths submit button component
import UserStore from "./stores/UserStore"; //pull userStore because we want to set some success/fail login data

class LoginForm extends React.Component {
  constructor(props) {
    //this is constructor func to take in props and a state.
    super(props);
    this.state = {
      username: "", //takes username value (string)
      password: "", //takes in password value (string)
      buttonDisabled: false, //used for when user clicks login and api starts looking for existing user, button is disabled until a failed login status is returned. if returned failed it re-enables
    };
  }

  setInputValue(property, val) {
    //defines method to....
    val = val.trim(); //string thats trimmed to avoid spaces here
    if (val.length > 12) {
      //this is aimed at limiting username and password max characters amount
      return;
    }
    this.setState({
      //this sets state. taking in property in array allows us to reuse it.
      [property]: val, // taking in property and setting it to the val
    });
  }

  resetForm() {
    //purpose is on failed login or returning to login page this resets the input fields. (can pass in a hard placeholder here if we want.)
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  //creating api call for doLogin(). this call to api is doing logic check to verify if user can pass through to site or not.

  async doLogin() {
    if (!this.state.username) {
      //if username doesn't exist then blurp return
      return;
    }
    if (!this.state.password) {
      //checks password same idea
      return;
    }
    this.setState({
      buttonDisabled: true, //keeps user from double clicking submit button
    });

    //adding try/catch statement this tells us how the api routes request....double check my wording on this.
    try {
      let res = await fetch("./login", {
        method: "post",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //using stringify because these are being pulled from the state and need to be pushed onward as strings
          username: this.state.username,
          password: this.state.password,
        }),
      });
      let result = await res.json();
      if (result && result.success) {
        //if result call is good and result is a success then changes user stat to isLoggedIn
        UserStore.isLoggedIn = true; //isLoggedIn due to the previous logic coded is by default false. this will change the active state of the use
      } else if (result && result.success === false) {
        //if result is correctly returned and it was a fail on finding username/password validation then it will push logic for failure
        this.resetForm(); //uses resetForm func from above to just clear the input fields for another attempt
        alert(result.msg); //creates an alert to return errors from api for trouble shooting
      }
    } catch (e) {
      //if errors are returned then
      console.log(e);
      this.resetForm(); //on error inputs are cleared/reset
    }
  }

  render() {
    return (
      <>
        <div className="loginForm">
          Log in
          <InputField
            // input props to take in
            type="text"
            placeholder="Username"
            value={this.state.username ? this.state.username : ""} //this is taking into account the onChange state of this input. It is also (because of the ? =ternary saying if string is empty don't pass go)
            onChange={(val) => this.setInputValue("username", val)} // passes in username and val props
          />
          <InputField
            // input props to take in
            type="password" //hides input as you go.
            placeholder="Password"
            value={this.state.password ? this.state.password : ""} //this is taking into account the onChange state of this input. It is also (because of the ? =ternary saying if string is empty don't pass go)
            onChange={(val) => this.setInputValue("password", val)} // passes in password and val props
          />
          <SubmitButton 
          text="Login"
          disabled={this.state.buttonDisabled} 
          onClick={() => this.doLogin()}
          />
        </div>
      </>
    );
  }
}

export default LoginForm;
