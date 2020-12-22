const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
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
};

module.exports = {
  handleRegister: handleRegister,
};
