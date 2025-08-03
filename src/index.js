import express from 'express'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT 
const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})