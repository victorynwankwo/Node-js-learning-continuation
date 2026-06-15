const path = require("path")
const userDb = {
    users: require("../model/users.json"),
    setUsers: function (data)  {this.users = data}
}
const fsPromises = require("fs").promises
const bcrypt = require("bcryptjs")

const handleNewUser = async (req, res) => {
     const {user, pwd} = req.body
     if (!user || !pwd)     return res.status(404).json({ "message": "username and password are required required" });

    const duplicate = userDb.users.find(person => person.username === user)
    if (duplicate) return res.status(409).json({ "message": "username already exists" });

    try {
        // hashing the password
         const hashedPwd = await bcrypt.hash(pwd, 10);

        const newUser = { "username": user, "password": hashedPwd }
        userDb.setUsers([...userDb.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(userDb.users)
        )
        console.log(userDb.users)
        res.status(201).json({ "success": `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}
module.exports = {handleNewUser}