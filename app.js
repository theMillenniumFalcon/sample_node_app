const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))

// routes

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/api/v1/tasks')        --> get all tasks
// app.post('/api/v1/tasks')       --> create a new task
// app.get('/api/v1/tasks/:id')    --> get single task
// app.patch('/api/v1/tasks/:id')  --> update task
// app.delete('/api/v1/tasks/:id') --> delete task


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}...`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()

