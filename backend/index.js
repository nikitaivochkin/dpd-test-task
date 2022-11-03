const Express = require('express');
const cors = require('cors');
const data = require('./api.json');

const app = new Express();

app.use(
  cors({ origin: '*' }),
);

app.get('/users', (_req, res) => {
  res.json(data);
});

const port = 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}!`);
});
