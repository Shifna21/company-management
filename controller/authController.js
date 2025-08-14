const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "provide a valid data" })
        }
      if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8characters long." });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "email already in use" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const updateUser = {

            email,
            password: hashedpassword
        }
        await User.create(updateUser)

        return res.status(201).json({ message: "register successfully" })

    } catch (error) {
        return res.status(500).json({ message: "register error", error: error.message })

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

          if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(409).json({ message: "user not found" })
        }
        const match = await bcrypt.compare(password, existingUser.password)

        if (!match) {
            return res.status(400).json({ message: "password not match" })
        }

        // console.log(existingUser.password);

        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPRIRE_IN }
        )


        return res.status(201).json({ message: "login successfully", token })

    } catch (error) {
        return res.status(500).json({ message: "login error", error: error.message })

    }
}

