const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = express()
const port = 3000
const tasks = require('./routes/tasks')

dotenv.config()

// middleware
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, unUnifiedTopology: true }, 
    () => {
    console.log("Connected to MongoDB")
})

// routes
app.get('/', (req, res) => {
    res.send('Task manager')
})

app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks')        --> get all tasks
// app.post('/api/v1/tasks')       --> create a new task
// app.get('/api/v1/tasks/:id')    --> get single task
// app.patch('/api/v1/tasks/:id')  --> update task
// app.delete('/api/v1/tasks/:id') --> delete task

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})