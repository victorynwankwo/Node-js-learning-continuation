const path = require("path");
const fsPromises = require("fs").promises;

const userDb = { 
  users: require("../model/users.json"), 
  setUsers: function (data) { this.users = data; }, 
};

const handleLogout =  (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  
  const foundUser = userDb.users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie()
return res.sendStatus(403);
  }

  const otherUsers = userDb.users.filter(person => person.refreshToken !== foundUser.refreshToken)
  const currentUser = {...foundUser, refreshToken:""}

}

module.exports = handleLogout;