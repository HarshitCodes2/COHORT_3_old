const crypto = require('crypto');

const input = "100xHarshit";

const hashedIp = crypto.createHash('SHA256').update(input).digest("hex");

console.log(hashedIp);


