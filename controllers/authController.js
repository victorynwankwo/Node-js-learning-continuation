const path = require("path");
// const userDb = {
  // users: require("../model/users.json"),
  // setUsers: function (data) {
    // this.users = data;
  // },
  
const fsPromises = require("fs").promises;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(404)
      .json({ message: "username and password are required required" });
  const foundUser = userDb.users.find((person) => person.username === user);
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" }); // unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWT
    const roles = Object.values(foundUsers.roles)
    
    const acccessToken = jwt.sign(
        {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
     
      process.env.ACCESS_TOKEN,
      { expiresIn: "1m" },
    );
  
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" },
    );
    const otherUser = userDb.users.filter(
      (person) => person.username !== foundUser.username,
    );
    const currentUser = { ...foundUser, refreshToken };
    userDb.setUsers([...otherUser, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDb.users),
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure:true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({
      accessToken: acccessToken,
      success: `User ${user} is logged in!`,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" }); // unauthorized
  }
};

module.exports = { handleLogin };
