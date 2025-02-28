const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Model/user')


const userRegister = async(username, email, password, role = "user")=>{
    const existUser = await User.findOne({email})
    if(existUser) throw new Error('Already have a user with this email')
    
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({username, email, password: hashPassword, role})
    await user.save()
    return user
}

const loginUser = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        return {error:"Invalid username or password"}
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return {error:"Invalid username or password"}
    }
    const token = jwt.sign({id: user._id, username: user.username, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '3 days'})
    return {token}
}

module.exports = {userRegister, loginUser}