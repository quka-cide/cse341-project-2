const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//GET all users
async function getUsers(req, res) {
    try {
        const users = await userModel.find()
        res.json(users)
    } catch(error) {
        res.status(500).json({ message: 'Error fetching users', error })
    }
}

//GET one user
async function getOneUser(req, res) {
    try {
        const user = await userModel.findById(req.params.id)
        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({ message: 'Error fetching user', error })
    }
}

//POST
async function createUser(req, res) {
    try {
        const { name, email, password, age, country } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email & password are required" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            age,
            country
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error: error.message })
    }
}

//PUT
async function updateUser(req, res) {
    try {
            const updated = await userModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if(!updated) {
           return res.status(400).json({ message: 'User not found' })
        }
        res.status(200).json(updated)
    } catch(error) {
        res.status(500).json({ message: 'Error updating user', error })
    }
}

//DELETE
async function deleteUser(req, res) {
    try {
        const deleted = await userModel.findByIdAndDelete(req.params.id)
        if(!deleted) {
            return res.status(404).json({ message: 'User not found'})
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch(error) {
        res.status(500).json({ message: 'Error deleting user', error})
    }
}

// login
async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        const valid = await bcrypt.compare(password, user.password)
        if(!valid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        res.json({ token })
    } catch(error) {
        res.status(500).json({ message: 'Login error', error })
    }
}

module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    login
}