//#region Setting up dependencies
const express = require('express');
const mySQL = require('mysql2');
const fs = require('node:fs');
require('dotenv').config();
const app = express();
const port = 3000;
//#endregion

app.use(express.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//#region Creating database connection
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const connection = mySQL.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: 3306,
  ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') },
});
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ` + err.stack);
  }
});
//#endregion

// API END POINTS

//just to check backend is working
app.get('/', (req, res) => {
  res.send('YO ITS WORKING BRUH!');
});

//Login endpoint
app.get('/login/:username/:password', (req, res) => {
  const { username, password } = req.params;

  const checkForUserSQL = 'SELECT * FROM users where username = ? and password = ?';

  connection.query(checkForUserSQL, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.status(200).send({
        message: 'User Found',
        userInfo: results[0],
      });
    } else {
      res.status(220).send({
        message: 'Incorrect Credentials!',
        userInfo: null,
      });
    }
  });
});

app.post('/signup/:username/:password', (req, res) => {
  const { username, password } = req.params;

  const checkForUserSQL = 'SELECT * FROM users where username = ?';
  const regesterUserSQL = 'INSERT INTO users (username, password, likes) VALUES (?,?,?)';

  //Check if user already exists
  connection.query(checkForUserSQL, [username], (err, results, fields) => {
    if (err) throw err;

    if (results.length > 0) {
      res.status(220).send({
        message: 'Username Already Exists',
        userInfo: null,
      });
    } else {
      // Create User
      connection.execute(regesterUserSQL, [username, password, '[]'], (err, results, fields) => {
        if (err) throw err;

        //Get the record just created
        connection.query(checkForUserSQL, [username], (err, results, fields) => {
          if (err) throw err;

          res.status(200).send({
            message: 'User was created',
            userInfo: results[0],
          });
        });
      });
    }
  });
});

app.get('/getUserById/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users where userID = ?;';

  connection.query(sql, [id], (err, results, fields) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(400).send({
        message: `No user with ID: ${id} found`,
        userInfo: null,
      });
    } else {
      res.status(200).send({
        message: `Found user with ID:${id}`,
        userInfo: results[0],
      });
    }
  });
});

app.post('/like/:userId/:newLikesArray', (req, res) => {
  const { userId, newLikesArray } = req.params;

  const sql = 'UPDATE users SET likes = ? WHERE userID = ?;';

  console.log(newLikesArray);

  connection.execute(sql, [newLikesArray, userId], (err) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR UPDATING DATABASE',
      });
    }

    res.status(200).send({
      message: 'User info updated',
      newLikesArray: newLikesArray,
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
