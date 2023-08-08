# Login-system
User login setup for allowing user usage on a react xpress app


steps
- created repo and cloned it to pull .gitignore and readme as well as set upstream. 
- npx create-react-app <name>
- installed mobx and mobx-react 
    - added both with --save to the pkg.json 
- modified the app.js to base template. This sets our app as a class and applies react.component? after that we set t to render and return html

            import React from "react";
            import "./App.css";

            class App extends React.Component {
                render() {
                    return (
                    <>
                        <div className="app">ald;kgh</div>
                    </>
                    );
                }
            }

            export default App;
- create "store" folder and a file to store user data to library using mobx that was installed.
    - this uses a class called UserStore that contains a constructor function that contains extendObservable which defines what wrap is logging
- create the components that we will be rendering inside the react app. Import these into the app.js
    - InputField
    - loginForm
    - SubmitButton
- write api calls into app.js (can do prior to having api built but might mess up server.)
    - write code for modification of user login process. (UserStore.<use something like loading,isLoggedIn or username here to take in the status of that process>)
    - set error / reset handling
        - set UserStore.loading to false because its done at this point
        - set UserStore.isLoggedIn = false to reset user status to restrict access
    - define a logout function
        -named it async doLogout
- render the new components using if statements to take in the users "status" on the site for lack of a better word.
    - if loading renders container say "loading please wait...
    - if loaded in display welcome {UserStore.username} and a submit button for logging out that runs doLogout() (not created JUST yet. need this done in controllers)
    - If user is NOT logged in the final return statement will render the LoginForm component which in this example starts the whole process over again.
- import something called an "observer" into the app.js
    - at bottom wrap the app component being exported in this observer to make app listen for changes in the UserStore.
          ex:   export default observer (App);
    - if you load server using "npm start" to deploy is it will render the LoginForm component but for a millisecond or two you will see the status change to the Loading rendering before coming back to Login form as the app monitors the observable state of user being logged in or not.