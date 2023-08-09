//contains actual api endpoints

const bcrypt = require("bcrypt");

class Router {
  constructor(app, db) {
    //wrapping in constructor so that we can access these in the routes
    this.login(app, db);
    this.logout(app, db);
    this.isLoggedIn(app, db);
  }
  //each method below is a route
  login(app, db) {
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;

      username = username.toLowerCase();

      if (username.length > 12 || password.length > 12) {
        res.json({
          success: false,
          msg: "An error occurred, guess we need to start over SORRY.",
        });
        return;
      }

      let cols = [username];
      db.query(
        "SELECT * FROM user WHERE username = ? LIMIT 1",
        cols,
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              msg: "An error occurred, guess we need to start over SORRY.",
            });
            return;
          }

          //found 1 user with this username
          if (data && data.length === 1) {
            //using bcrypt to check if password matches password in database
            bcrypt.compare(
              password,
              data[0].password,
              (bcryptErr, verified) => {
                if (verified) {
                  //if verified START session
                  req.session.userID = data[0].id;

                  res.json({
                    success: true,
                    username: data[0].username, //this calls the username to display on success to user so we don't need to do a separate call elsewhere
                  });
                  return;
                } else {
                  res.json({
                    success: false,
                    msg: "Invalid Username or Password",
                  });
                }
              }
            );
          } else {
            res.json({
              success: false,
              msg: "User not found, please try again",
            });
          }
        }
      );
    });
  }
  logout(app, db) {
    app.post("./logout", (req, res) => {
      if (req.session.userID) {
        req.session.destroy();
        res.json({
          success: true,
        });
        return true;
      } else {
        res.json({
          success: false,
        });
        return false;
      }
    });
  }
  isLoggedIn(app, db) {
    app.post("/logout", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "SELECT * FROM user WHERE id = ? LIMIT 1", cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({
                success: true,
                username: data[0].username,
              });
              return true;
            } else {
              res.json({
                success: false,
              });
            }
          }
        );
      } else {
        res.json({
          success: false,
        });
      }
    });
  }
}

module.exports = Router;
