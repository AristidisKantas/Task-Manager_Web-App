require('../src/db/mongoose')
const { count } = require('../src/models/user')
const User = require('../src/models/user')

//User is spuros: 5fa283def065f76018268b90
//User id tns : 5fa283fef065f76018268b91
//User id petros : 5fa28415f065f76018268b92
//User id eve : 5fa28430f065f76018268b93
//User id aris : 5fa2846cf065f76018268b94

// User.findByIdAndUpdate('5f9b28f4e30ebb8301d8cd17', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeandCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeandCount('5f9b28f4e30ebb8301d8cd17', 2).then((count)=> {
    console.log(count)
}).catch((e)=> {
    console.log(e)
})