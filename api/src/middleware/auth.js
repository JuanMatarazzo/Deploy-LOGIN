const { verifyToken } = require("../helpers/generateToken")



const checkAuth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if(tokenData.id){
            next()
        }else{
            res.status(409)
            res.send({error: 'No tienes permitido el ingreso'})
        }
    } catch (error) {
        console.log(error)
        res.status(409)
        res.send({error: "No tienes permitido el ingreso"})
    }
}


module.exports = {
    checkAuth
}