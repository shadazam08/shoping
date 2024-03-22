const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET } = process.env;

const jwtGenerator = (id) => {
    if (!SECRET) {
        console.error("SECRET environment variable is not set");
        throw new Error("SECRET environment variable is not set");
    }
    // Check if either admin_id or user_id is provided
    if (!id) {
        throw new Error("At least one of admin_id or user_id is required");
    }

    console.log('id :- ', id);
    console.log('SECRET:', SECRET);

    const payload = {};
    if (id) {
        payload.id = id;
    }
    // const payload = { admin_user: admin_id, user: user_id };
    return jwt.sign(payload, SECRET, { expiresIn: '1hr' })
}

module.exports = jwtGenerator;