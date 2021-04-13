require('../src/db/mongoose')
const { findByIdAndDelete, countDocuments } = require('../src/models/task')
const Task = require('../src/models/task')

//Task id: 5f9b2609b4070a83b9e2b15e
// Task.findByIdAndDelete('5f9b2717eb5b6f620474a80f').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async (id) => {
    const task =  await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : false})
    return count  
}

deleteTaskAndCount('5fa285b42c2750408850cf69').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})