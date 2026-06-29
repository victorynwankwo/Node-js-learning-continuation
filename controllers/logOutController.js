const path = require("path");
const fsPromises = require("fs").promises;

const userDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = userDb.users.find(
    (person) => person.refreshToken === refreshToken,
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  const otherUsers = userDb.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken,
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  userDb.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDb.users),
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};
module.exports = { handleLogout };
