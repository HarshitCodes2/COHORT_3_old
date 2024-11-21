const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function authMiddleware(req, res, next){
  const authorization = req.headers.authorization;
  
  if(!authorization){
    return res.status(411).json({
      message: "Authorization header missing"
    })
  }

  const [ tokenType, token ] = authorization.split(' ');

  if(tokenType !== 'Bearer'){
    return res.status(403).json({
      message: "Invalid token type"
    });
  }

  let decodedUser;
    try{
        decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedUser.userId;
        next();
    }catch(e){
        console.log(e);
        
        return res.status(411).json({
            error: e,
            message : "Wrong User Credentials (token)"
        });
    }

}

module.exports = {
  authMiddleware: authMiddleware
}

