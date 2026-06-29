
const User = require("../model/User")
const bcrypt = require("bcryptjs")

const handleNewUser = async (req, res) => {
     const {user, pwd} = req.body
     if (!user || !pwd)     return res.status(404).json({ "message": "username and password are required required" });

    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.status(409).json({ "message": "username already exists" });

    try {
        // hashing the password
         const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await User.create({ "username": user, "password": hashedPwd });
        console.log(result);
     
        res.status(201).json({ "success": `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}
module.exports = {handleNewUser}