import express from 'express'
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../controller/todoController.js'
import authMiddleware from '../middleware/authMiddleware.js'
 const router = express.Router()

    router.get('/', authMiddleware, getAllTodos)
    router.post('/addTodos', authMiddleware, createTodo)
    router.put('/updateTodos/:id', authMiddleware, updateTodo)
    router.delete('/deleteTodos/:id', authMiddleware, deleteTodo)




 export default router