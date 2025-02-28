
const User = require('../Model/user')

const userList = async (req, res)=>{
    try {
        const users = await User.find().select('-password');
        res.json(users);
      } catch (err) {
        res.status(500).json({ msg: 'Server error' });
      }
}

module.exports = userList