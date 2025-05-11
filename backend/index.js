require('dotenv').config();
const express = require('express');
const app = express();
require('./Models/db');
const PORT = process.env.PORT || 3200;
const bodyParser = require('body-parser');
const TaskRouter = require('./Routes/TaskRouter');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/', TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
