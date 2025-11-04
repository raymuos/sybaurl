const express = require('express');
const cors = require('cors');

const app = express();

const urlRouter = require('./routes/url');
const redirectRouter = require('./routes/redirector');
const { connectMongoDb } = require('./dbconnect');

app.use(cors());
app.use(express.json());
app.use("/url", urlRouter);
app.use("/", redirectRouter);

connectMongoDb()
.then(console.log("MongoDB Atlas connected!"))
.catch((err) => console.log("Couldn't connect:" + err));

const PORT = 8001;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT} !`));