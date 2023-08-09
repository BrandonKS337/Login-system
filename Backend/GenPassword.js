const bcrypt = require('bcrypt'); //imports bcrypt

let pswrd = bcrypt.hashSync('12345', 9) 
console.log(pswrd)


//no register page so have to hash manually using this file
//create user manually mySQL and then has here by running in terminal. Copy paste that into the database and youll be OK!

//$ node GenPassword to generate. it will console.log into terminal

// example output: $2b$09$zIc7ZHf2dILLl62Ghlj3G.I3Mwlwvi12pObzUvN1TdLjlvCKGVEqa
//example output 2: $2b$09$K6vHoKKrrlk/CQEyOo/BCOBAD/y4NY3cOPEKpBf8h/xpwGNfVVglC