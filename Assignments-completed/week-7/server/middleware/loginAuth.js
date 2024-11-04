const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


async function auth(req, res, next) {
    console.log("Auth Reached");
    // console.log(req.headers);
    

    const token = req.headers.token;
    // console.log(token);
    

    let decodedUser;
    try{
        decodedUser = jwt.verify(token, JWT_SECRET);
        req.user = decodedUser;
        next();
    }catch(e){
        res.status(401).json({
            message : "Wrong User Credentials (token)"
        });
    }

}

module.exports = {
    auth : auth
}
