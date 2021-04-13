const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password must not be "password"')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0 ){
                throw new Error('Age must be a positive number.')
            }
        }
    },
    tokens: [{ //Store an array of objects
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

//Virtual attributes
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', 
    foreignField: 'owner'
})


//Clear what user data we return to the client
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Generate a Auth Token
//.methods is for methods on a user instance, an individual user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},'thisismynewcourse')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}
//Login
//.statics for methods on the User model.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login! Wrong email!')
    }

    const isMatch = await bcrypt.compare(password, user.password) //Compare the password given with the hashed password in the database.


    if(!isMatch){
        throw new Error('Unable to login! Wrong password!')
    }

    return user
}


//Hash the plain text password
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delete User tasks when User is removed
userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({owner : user._id})
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User