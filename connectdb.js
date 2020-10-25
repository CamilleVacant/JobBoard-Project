var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database : "database",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection
