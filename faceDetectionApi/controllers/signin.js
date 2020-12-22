const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("incorrect form submission");
  }
  db.select("*")
    .from("facedetection.login")
    .where({
      user_id: db
        .select("id")
        .from("facedetection.users")
        .where({ email: email }),
    })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("facedetection.users")
          .where({ email: email })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentialsssssss");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
