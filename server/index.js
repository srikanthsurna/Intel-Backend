const express = require("express");
const { connectTOMongoDB } = require("./connect");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("../server/routes/auth.route");
const { ConnectionPoolMonitoringEvent } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 3000;
const databaseUrl = process.env.CONNECTIONSTRING;
connectTOMongoDB(databaseUrl).then(() => console.log("Mongodb connected"));
app.use(express.json());

app.set("view engine", "ejs");
// app.set('views',path.join(__dirname, 'server/views'))
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", cors());
app.use("/api/auth", authRouter);
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
