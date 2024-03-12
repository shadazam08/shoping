const showData = require('express').Router();
const pool = require('../utils/db');


showData.get('/studentDetails', async (req, res) => {
    try {
        await pool
        const totalStudent = await pool.query(`
            select count(student_id) from student
        `);
        const totalNewStudent = await pool.query(`
            SELECT COUNT(student_join_date) 
            FROM student 
            WHERE student_join_date >= CURRENT_DATE - INTERVAL '30' DAY;
        `);
        const totalStudents = totalStudent.rows[0].count
        const totalNewStudents = totalNewStudent.rows[0].count
        console.log('totalStudents: ', totalStudents, totalNewStudents)
        res.json({ message: "success", totalStudents, totalNewStudents });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})



module.exports = showData;