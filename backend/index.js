const express = require('express');
const cors = require('cors');

const app = express();

const urlRouter = require('./routes/url');
const redirectRouter = require('./routes/redirector');
const userRouter = require("./routes/user")
const { connectMongoDb } = require('./dbconnect');

app.use(cors());
app.use(express.json());
app.use("/", redirectRouter);
app.use("/url", urlRouter);
app.use("/user", userRouter);

connectMongoDb()
.then(console.log("MongoDB Atlas connected!"))
.catch((err) => console.log("Couldn't connect:" + err));

const PORT = 8008;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT} !`));