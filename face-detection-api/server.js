const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
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

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  db.select("*")
    .from("facedetection.login")
    .where({
      user_id: db
        .select("id")
        .from("facedetection.users")
        .where({ email: req.body.email }),
    })
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("facedetection.users")
          .where({ email: req.body.email })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  if (email && name && password) {
    db.transaction((trx) => {
      trx
        .returning("*") //return all inserted columns as response
        .insert({
          email: email,
          name: name,
          joined: new Date(),
        })
        .into("facedetection.users")
        .then((user) => {
          return trx("facedetection.login").insert({
            hash: hash,
            user_id: user[0].id,
          });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
      .then(() => {
        db.select("*")
          .from("facedetection.users")
          .where({ id: db("facedetection.users").max("id") })
          .then((user) => {
            if (user.length) {
              res.json(user[0]);
            } else {
              res.status(400).json("user not found");
            }
          });
      })
      .catch((err) => res.status(400).json("unable to register"));
  } else {
    res.status(400).json("unappropriate values");
  }
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("facedetection.users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("user not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("facedetection.users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
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
