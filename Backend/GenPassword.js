const bcrypt = require('bcrypt'); //imports bcrypt

let pswrd = bcrypt.hashSync('12345', 9) 
console.log(pswrd)


//no register page so have to hash manually using this file
//create user manually mySQL and then has here by running in terminal. Copy paste that into the database and youll be OK!
