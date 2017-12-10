const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('ok');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

