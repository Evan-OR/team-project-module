const express = require('express');
const MySQL = require('mysql2');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('YO ITS WORKING BRUH!');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
