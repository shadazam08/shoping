const insertData = require('express').Router();
const pool = require('../utils/db');

insertData.post('/insertCourse', async (req, res) => {
    try {
        const { course_name, course_description, course_duration_hours, course_start_date, course_end_date, course_fee, instructor_id } = req.body;

        // Split the date strings and extract components
        const startDate = course_start_date.split('T')[0];
        const endDate = course_end_date.split('T')[0];

        console.log('startDate: ', startDate);
        console.log('endDate: ', endDate);

        const checkCourse = await pool.query(`
            select * from courses where course_name = $1
        `, [course_name]);

        if (checkCourse.rowCount > 0) {
            return res.status(400).json({ message: "Allready Exits" });
        }

        const insertCourse = await pool.query(`
            insert into courses (course_name, course_description, instructor_id, course_duration_hours, course_start_date, course_end_date)
            values($1, $2, $3, $4, $5, $6) RETURNING course_id
        `, [course_name, course_description, instructor_id, course_duration_hours, startDate, endDate]);

        const courseId = insertCourse.rows[0].course_id

        const coursesFee = await pool.query(`
            INSERT INTO courses_fees (course_id, course_fees) VALUES($1, $2) RETURNING courses_fee_id
        `, [courseId, course_fee]);

        const coursesFeeId = coursesFee.rows[0].courses_fee_id;

        // const studentCoursesFees = 
        await pool.query(`
            INSERT INTO student_courses_fees (course_id, courses_fee_id) VALUES($1, $2)
        `, [courseId, coursesFeeId]);

        // res.json({ message: "success" })
        res.status(200).json({ message: "success" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

insertData.post('/insertInstructors', async (req, res) => {
    try {
        const { instructor_name, instructor_email, instructors_mobile, instructors_street, instructors_city, instructors_state, instructors_zip_code, instructors_join_date } = req.body;

        const joinDate = instructors_join_date.split('T')[0];

        console.log('joinDate: ', joinDate)

        const instructor = await pool.query(`
            insert into instructors (instructor_name, instructor_email, instructors_mobile, instructors_street, instructors_city, instructors_state, instructors_zip_code, instructors_join_date)
            values($1, $2, $3, $4, $5, $6, $7, $8)
        `, [instructor_name, instructor_email, instructors_mobile, instructors_street, instructors_city, instructors_state, instructors_zip_code, joinDate]);

        const instructors = instructor.rows;

        // res.json({ message: "success", instructors });
        res.status(200).json({ message: "success", instructors });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});


module.exports = insertData