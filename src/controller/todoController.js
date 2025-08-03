import db from '../db.js'

export const getAllTodos = async (req, res) =>{
    try{
        const getTodos = await db.prepare('SELECT * FROM todos WHERE user_id = ?')
        const todos = getTodos.all(req.userId)
        res.status(200).json(todos)
        
    }
    catch(error){
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)');
        const newTodo = stmt.run(title, description, req.userId);
        res.status(201).json({ id: newTodo.lastInsertRowid, title, description });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params
    const { title, description, completed } = req.body
    try {
        const stmt = db.prepare('UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?');
        const updateResult = stmt.run(title, description, completed, id, req.userId)
        if (updateResult.changes > 0) {
            res.status(200).json({ message: 'Todo updated successfully' })
        } else {
            res.status(404).json({ message: 'Todo not found or not authorized' });
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');
        const deleteResult = stmt.run(id, req.userId);
        if (deleteResult.changes > 0) {
            res.status(200).json({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).json({ message: 'Todo not found or not authorized' });
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}