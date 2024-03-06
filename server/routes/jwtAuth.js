const authRoute = require('express').Router();
const pool = require('../utils/db');
require('dotenv').config();
const jwtGenerator = require('../utils/jwtGenerator');


authRoute.post('/netAdminAcount', async (req, res) => {
    const { fullName, email, password, role } = req.body;
    // console.log('firstName,lastName, email, password, role: ', firstName, lastName, email, password, role);
    try {
        await pool;
        const checkAdminUser = await pool.query(`SELECT admin_email FROM admin_login where admin_email = $1`, [email]);
        if (checkAdminUser.rows.length > 0) {
            return res.status(401).json('User Already Exits !');
        }
        const newUser = await pool.query('INSERT INTO admin_login(admin_name, admin_email, admin_password, created_at, last_login) values ($1, $2, $3, NOW(), NOW()) RETURNING admin_id', [fullName, email, password]);

        const admin_id = newUser.rows[0].admin_id;

        const selectRoleid = await pool.query(`select role_id from roles where role_name = $1`, [role]);

        const role_id = selectRoleid.rows[0].role_id;

        await pool.query(`INSERT INTO account_roles (admin_id, role_id, grant_date) VALUES ($1, $2, NOW())`, [admin_id, role_id])

        const token = await jwtGenerator(admin_id);
        res.json({ message: "Account Create successfully", admin_id, token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})

module.exports = authRoute;