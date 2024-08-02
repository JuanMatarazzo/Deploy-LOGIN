const bcrypt = require('bcrypt');


const encrypt  = async(text) => {
    const hash = await bcrypt.hash(text, 10);
    return hash
}

const compare = async (passwordText, hashPassword) => {
    return await bcrypt.compare(passwordText, hashPassword)
}



module.exports = {
    encrypt,
    compare
}