const jwt = require('jsonwebtoken')
const authService = require('../Services/authService')



const register = async (req,res) => {
    try {
    const { username, email, password } = req.body;
    const user = await authService.userRegister(username, email, password)
    res.status(201||200).json({message:"user register successfully", user})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res)=>{
    
    try{
        const {email, password} = req.body
        const {token, error} = await authService.loginUser(email, password)

        if(error){
            return res.status(401).json({ message: error });
        }

        res.cookie("go-vaga-token", token, {
            httpOnly: true,  // Prevent access via JavaScript (recommended)
            secure: true,    // Must be true in production with HTTPS
            sameSite: "None", // Required for cross-origin cookies
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            path: "/",
        });

        res.status(201).json({message: "login successfull", token})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const logout = async (req, res) => {
    try {
      res.clearCookie('go-vaga-token', {
        httpOnly: true,  // Prevent access via JavaScript (recommended)
        secure: true,    // Must be true in production with HTTPS
        sameSite: "None", // Required for cross-origin cookies
        path: "/",
      });
  
      res.status(200).json({ message: 'Logout Successfully' });
    } catch (err) {
      console.error('Error during logout:', err);
      res.status(500).json({ message: 'Server error during logout' });
    }
  };

const getUser = async (req,res)=>{
    try{
        const token = req.cookies['go-vaga-token']
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
    const { userId, role, username } = decoded; // Extract user details from the token
    res.json({ userId, role, username });
        
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

module.exports = {register, login, getUser, logout}