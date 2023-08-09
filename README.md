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
- further built up the actual component contest for inputField, LoginForm and submitbutton.
    - it is important to note that the templates I am using are older react coding. using class and extends react.component is old syntax. It is "more clear and easier to work with. Supposedly optimizes the performance as well.
            function {component_name} {
                return(
                    <>
                    rendered details
                    </>
                )
            }
            export {component_name}
    - most of the logical coding in this step is done inside the LoginForm. Input and Submit are very simple multi use components meant to just be tossed around and reused. The login form is going to be the general Home for the login experience so It is passing in all the checks and api calls from there as the other components render inside its container.
- moving on to backend
    - new folder
    - in client directory run npm run build this will create a build folder. copy paste this into backend.
    - npm init starts a new npm project
        - changed entry point to main.js but this is something that can get swapped to Server.js or index.js depending on name preferences.
    - dependencies
        - bcrypt //hashes the user passwords
        - npm i express
        - npm i express-mysql-session //session store like modx for the frontend
        - npm i express-session //this is for the session itself 
        - npm i mysql //to connect to mysql database
- create SQL database
    - named it myapp
    - create schema and create basic user table with something like this sql code here
                CREATE TABLE `myapp`.`user` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `username` VARCHAR(255) NOT NULL,
                `password` VARCHAR(255) NOT NULL,
                PRIMARY KEY (`id`)
                );
- create GenPassword to get bcrypt ready for usage.
    - just used for hashing password

    running out of time. update later on p3 atm and need to push past.

*** to add new users to the database you need to do manually for now. 
*** the session will create a table and generate but users will need a table created using sql info above. in the password space put in the hashed password
to test it at the end type the username and 12345 because that is what the current password is taking in for all users created due to getPassword.js acting as our hashing component right now.
Will expand this into an actual user login as I can but for now the login verification process is established!!!

