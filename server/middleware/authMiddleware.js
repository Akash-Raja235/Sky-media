import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const authMiddleWare = async(req,res,next)=>{

    try {
        
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        if(token){
         const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
         req.body._id = verifyToken?.id
        }
        next()
       
    } catch (error) {
        return res.send(error)
    }
}
export default authMiddleWare