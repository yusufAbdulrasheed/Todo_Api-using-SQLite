import db from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) =>{
    try{

        const { username, password } = req.body

        const hashedpassword = bcrypt.hashSync(password, 8)

        const newUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')

        const result = newUser.run(username, hashedpassword)

        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.json({ message: 'User registered successfully', token })

    }
    catch(error){
        console.error('Error during registration:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const login = async (req, res) =>{
    try{

        const { username, password } = req.body

        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)

        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.json({ message: 'Login successful', token })

    }

    catch(error){
        console.error('Error during login:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}