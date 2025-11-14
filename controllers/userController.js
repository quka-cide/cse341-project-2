const userModel = require('../models/user')

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
            res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({ message: 'Error fetching user', error })
    }
}

//POST
async function createUser(req, res) {
    try {
        const { name, email, age, country } = req.body
        if(!name || !email) {
            res.status(400).json({ message: 'Name and email are required' })
        }
        const user = new userModel({
            name,
            email,
            age,
            country
        })

        const saved = await user.save()
        res.status(200).json(saved)
    } catch(error) {
        res.status(500).json({ message: 'Error creating user', error })
    }
}

//PUT
async function updateUser(req, res) {
    try {
        const updated = await userModel.findOneAndUpdate(req.params.id, req.body, { new: true })
        if(!updated) {
            res.status(400).json({ message: 'User not found' })
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
            res.status(404).json({ message: 'User not found'})
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch(error) {
        res.status(500).json({ message: 'Error deleting user', error})
    }
}

module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}