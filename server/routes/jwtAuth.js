const authRoute = require('express').Router();
const pool = require('../utils/db');
require('dotenv').config();
const jwtGenerator = require('../utils/jwtGenerator');


authRoute.post('/newAdminAcount', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const checkAdminUser = await pool.query(`SELECT admin_email FROM admin_login where admin_email = $1`, [email]);
        if (checkAdminUser.rows.length > 0) {
            return res.status(401).json('User Already Exits !');
        }
        const newUser = await pool.query('INSERT INTO admin_login(admin_first_name, admin_email, admin_password, created_at, last_login, admin_last_name) values ($1, $2, $3, NOW(), NOW(), $4) RETURNING admin_id', [firstName, email, password, lastName]);

        const admin_id = newUser.rows[0].admin_id;

        await pool.query(`INSERT INTO admin_details(admin_details_admin_id) VALUES ($1)`, [admin_id]);

        const selectRoleid = await pool.query(`select role_id from roles where role_name = $1`, [role]);

        const role_id = selectRoleid.rows[0].role_id;

        await pool.query(`INSERT INTO account_roles (admin_id, role_id, grant_date) VALUES ($1, $2, NOW())`, [admin_id, role_id])

        const token = await jwtGenerator(admin_id);
        res.json({ message: "Account Create successfully", admin_id, token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

authRoute.post('/adminLogin', async (req, res) => {
    const { email, password, role } = req.body

    console.log('email:- ', email + ' password:- ', password + ' role: ', role);

    try {
        await pool;
        const adminUser = await pool.query(`
            SELECT al.*
            FROM admin_login al
            INNER JOIN account_roles ar ON al.admin_id = ar.admin_id
            INNER JOIN roles r ON ar.role_id = r.role_id
            WHERE r.role_name = $1
            AND al.admin_email = $2
        `, [role, email]);

        if (adminUser.rows.length === 0 || adminUser.rows[0].admin_email !== email) {
            return res.status(401).json({ message: 'Invalid Email ID' });
        }

        const hashedPassword = adminUser.rows[0].admin_password;
        if (password !== hashedPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const updateLastLoginTime = await pool.query(`UPDATE admin_login SET last_login  = NOW() WHERE admin_id = $1`, [adminUser.rows[0].admin_id]);
        console.log(adminUser.rows);

        if (updateLastLoginTime.rowCount !== 1) {
            console.error('Failed to update last_login_time');
        }

        const adminToken = await jwtGenerator(adminUser.rows[0].admin_id);
        const adminId = adminUser.rows[0].admin_id

        res.json({ message: 'Logged in successfully', adminToken, adminId })
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }


});

authRoute.post('/newStudentLogin', async (req, res) => {
    const { fname, email, password, lname } = req.body;
    try {

        const checkStudentUser = await pool.query(`SELECT student_email FROM student_login where student_email = $1`, [email]);

        if (checkStudentUser.rows.length > 0) {
            return res.status(401).json('User Already Exits !');
        }

        const newStudent = await pool.query('INSERT INTO student_login(student_firstname, student_email, student_password, student_join_date, student_lastname) values ($1, $2, $3, NOW(), $4) RETURNING student_id', [fname, email, password, lname]);

        const student_id = newStudent.rows[0].student_id;

        const token = await jwtGenerator(student_id);
        res.json({ message: "Account Create successfully", student_id, token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

authRoute.post('/studentLogin', async (req, res) => {
    const { email, password } = req.body
    console.log('email:- ', email + ' password:- ', password);

    try {
        const studentUser = await pool.query(`
            SELECT *
            FROM student_login
            WHERE  student_email = $1
        `, [email]);

        const studentId = studentUser.rows[0].student_id

        if (studentUser.rows.length === 0 || studentUser.rows[0].student_email !== email) {
            return res.status(401).json({ message: 'Invalid Email ID' });
        }

        const hashedPassword = studentUser.rows[0].student_password;
        if (password !== hashedPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const updateLastLoginTime = await pool.query(`UPDATE student_login SET student_last_login  = NOW() WHERE student_id = $1`, [studentId]);
        console.log(studentUser.rows);

        if (updateLastLoginTime.rowCount !== 1) {
            console.error('Failed to update last_login_time');
        }

        const studentToken = await jwtGenerator(studentId);

        res.json({ message: 'Logged in successfully', studentToken, studentId })
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }


});




module.exports = authRoute;