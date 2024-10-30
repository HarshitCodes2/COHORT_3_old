const jwt = require('jsonwebtoken');
const JWT_SECRET = "123456787654321";

function auth(req, res, next){
    const token = req.headers.token;

    console.log(token);

    let decodedUser;
    try{
        decodedUser = jwt.verify(token, JWT_SECRET);
        // console.log(decodedUser);
        const userId = decodedUser.userId;
        req.userId = userId;
        next();    
    }catch(e){
        res.status(401).json({
            message: "Incorrect Login Session",
            error: e
        });
    }
}


module.exports = {
    auth,
    JWT_SECRET
}