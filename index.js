const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

const routes = require('./routes');

routes(app);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started listening on port 8000...');
});
