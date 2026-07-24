
export const loginCredentialsCheck = (req, res, next)=>{
    const {email, password} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email format"})
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
    next()
}

export const signupCredentialsCheck = (req, res, next)=>{
    const {email, password, username} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !password || !username){
        return res.status(400).json({message: "All fields are required"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email format"})
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
    if(!username.trim()){
        return res.status(400).json({message: "Username cannot be empty"})
    }
    next()
}