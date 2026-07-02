const jwt = require("jsonwebtoken")


const isAuth = async (req , res , next)=>{
    try {
        let {token} = req.cookies;

        if(!token){
            return res.status(400).json({
                message:"Unauthorized user"
            })
        }

        const verifyToken = jwt.verify(token , process.env.JWT_SECRET);

        
        if(!verifyToken){
            return res.status(400).json({
                message:"Unauthorized user"
            })
        }

        req.userId = verifyToken.userId

        next();


    } catch (error) {
        return res.status(401).json({
            message:`isAuth Error in google auth user created ${error}`
        })
    }
}


module.exports= isAuth