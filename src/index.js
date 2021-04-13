const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})


// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5fae6c7b9bf4c51bf0db3c2c')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await User.findById('5fae6c5f9bf4c51bf0db3c2a')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()
