const path = require("path");
const fsPromises = require("fs").promises;
const jwt = require("jsonwebtoken");

const userDb = { 
  users: require("../model/users.json"), 
  setUsers: function (data) { this.users = data; }, 
};

const handleRefreshToken =  (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); //
  
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  
  const foundUser = userDb.users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    
    console.log("decoded",decoded)

    if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 
    const roles = Object.values(foundUser.roles)
    //unauthorized
    const accessToken = jwt.sign(
        {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
    
      process.env.ACCESS_TOKEN,
      {expiresIn:"2m"}
    )
    res.json({accessToken})
  });
}

module.exports = { handleRefreshToken }
