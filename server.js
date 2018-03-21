const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.listen(port, () => {
  console.log('Up on running on ' + port);
});