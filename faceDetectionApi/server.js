const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "smart-brain",
  },
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.getProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3001, () => {
  console.log("app is running");
});

/*
/ --> res = this is working
/signin --> POST (post some request, info) = success / fail
/register --> POST (we want to add data to database) = return user object
/profile/:userid --> GET (get user info) = user
/image --> PUT (update) --> user

*/
