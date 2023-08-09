import React from "react";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import "./App.css";

class App extends React.Component {
  async componentDidMount() {
    try {
      /* What this does when app component mounts when done loading it checks if user is logged in by checking session and we deal with result in the "result" portion*/

      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false; //user is logged in so app doesn't need to load anymore
        UserStore.isLoggedIn = true; //true because logger should be successfully logged in at this point
        UserStore.username = result.username; //this sends username back as a property from api.
      } else {
        //if things go wrong and we aren't logged in successfully this happens
        UserStore.loading = false; //if loading finishes it will be false..because it's no longer loading
        UserStore.isLoggedIn = false; //isLoggedIn here gets reset to false.
      }
    } catch (e) {
      //if things go TERRIBLY wrong this catch error handling will just reset everything.
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }
  async doLogout() {
    try {
      /* What this does when app component mounts when done loading it checks if user is logged in by checking session and we deal with result in the "result" portion*/

      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false; //user logged out so status changes from true to false here
        UserStore.username = ""; //resets username to empty string on logout. Will be useful for monitoring how many users are active
      }
    } catch (e) {
      //in case of error this logs errors for debugging later
      console.log(e);
    }
  }

  render() {
    //api calls defined => build render logic
    if (UserStore.loading) {
      //by rendering this with an if statement we can set it to render this particular "Loading" bit below
      return (
        <>
          <div className="app">
            <div className="container">Loading, please wait...</div>
          </div>
        </>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          //if user successfully logs in this renders below. pulls in username from login and then also renders submit button for logout purposes
          <>
            <div className="app">
              <div className="container">
                Welcome to the homepage {UserStore.username}!!
                {/* render submit button with props that it takes in. making this a separate component makes it reusable */}
                <SubmitButton
                  text={"Log out"}
                  disabled={false}
                  onClick={() => this.doLogout()}
                  // this onClick being set as it is was done to set a callback function to run when the onClick event is triggered by user. aka it runs ".doLogout" from "here" thanks to this.doLogout()
                />
              </div>
            </div>
          </>
        );
      }

      return (
        //if not logged in then this part will be returned rendering the LoginForm component
        <div className="app">
          <div className="container">
            
            {/* <SubmitButton
              text={"Log out"}
              disabled={false}
              onClick={() => this.doLogout()}
              // this onClick being set as it is was done to set a callback function to run when the onClick event is triggered by user. aka it runs ".doLogout" from "here" thanks to this.doLogout()
            /> */}
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
