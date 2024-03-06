const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET } = process.env;

const jwtGenerator = (admin_id, user_id) => {
    if (!SECRET) {
        console.error("SECRET environment variable is not set");
        throw new Error("SECRET environment variable is not set");
    }
    // Check if either admin_id or user_id is provided
    if (!admin_id && !user_id) {
        throw new Error("At least one of admin_id or user_id is required");
    }

    console.log('user_id :- ', user_id + ',' + 'admin_id :- ', admin_id);
    console.log('SECRET:', SECRET);

    const payload = {};
    if (admin_id) {
        payload.admin_user = admin_id;
    }
    if (user_id) {
        payload.user = user_id;
    }
    // const payload = { admin_user: admin_id, user: user_id };
    return jwt.sign(payload, SECRET, { expiresIn: '1hr' })
}

module.exports = jwtGenerator;