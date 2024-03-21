const showData = require('express').Router();
const pool = require('../utils/db');


showData.get('/studentDetails', async (req, res) => {
    try {
        const totalStudent = await pool.query(`
            select count(student_id) from student_login
        `);
        const totalNewStudent = await pool.query(`
            SELECT COUNT(student_join_date) 
            FROM student_login 
            WHERE student_join_date >= CURRENT_DATE - INTERVAL '30' DAY;
        `);
        const countCourses = await pool.query(`
            select count(course_id) from courses;
        `);

        const totalStudents = totalStudent.rows[0].count;
        const totalNewStudents = totalNewStudent.rows[0].count;
        const totalcountCourses = countCourses.rows[0].count;

        res.json({ message: "success", totalStudents, totalNewStudents, totalcountCourses });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

showData.get('/instructorsDetails', async (req, res) => {
    try {
        const instructors = await pool.query(`
            SELECT	* FROM instructors;
        `);
        const instructorsDetails = instructors.rows;

        const courseName = [];

        for (const instructorId of instructorsDetails) {
            const courseNameQuery = await pool.query(`
                SELECT course_name FROM courses WHERE instructor_id = $1;
            `, [instructorId.instructor_id]);

            const courses = courseNameQuery.rows.map(row => row.course_name);
            courseName[instructorId.instructor_id] = courses;

        }

        res.json({ message: "success", instructorsDetails, courseName });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

showData.get('/CourseDetail', async (req, res) => {
    try {
        const courses = await pool.query(`
            SELECT * FROM courses
        `);
        const coursesinstructId = await pool.query(`
            SELECT instructor_id FROM courses
        `);

        const instructId = coursesinstructId.rows.map(coursesinstructId => coursesinstructId.instructor_id);
        console.log('instructId: ', instructId)

        const instructorNames = [];

        for (const instructorId of instructId) {
            const instructorNameQuery = await pool.query(`
                SELECT instructor_name FROM instructors WHERE instructor_id = $1;
            `, [instructorId]);

            if (instructorNameQuery.rows.length > 0) {
                const instructorName = instructorNameQuery.rows[0].instructor_name;
                instructorNames.push({ instructorId, instructorName });
            }
        }

        console.log(instructorNames)

        const coursesDetails = courses.rows;

        res.json({ message: "success", coursesDetails, instructorNames });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});
showData.get('/viewCourse/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    console.log('courseId: ', courseId);
    try {
        const coursesDetails = await pool.query(`
            select * from courses where course_id = $1
        `, [courseId]);
        const courseDetail = coursesDetails.rows[0];

        const coursesinstructId = await pool.query(`
            SELECT instructor_id FROM courses
        `);

        const instructId = coursesinstructId.rows.map(coursesinstructId => coursesinstructId.instructor_id);
        console.log('instructId: ', instructId)

        const instructorNames = [];

        for (const instructorId of instructId) {
            const instructorNameQuery = await pool.query(`
                SELECT instructor_name FROM instructors WHERE instructor_id = $1;
            `, [instructorId]);

            if (instructorNameQuery.rows.length > 0) {
                const instructorName = instructorNameQuery.rows[0].instructor_name;
                instructorNames.push({ instructorId, instructorName });
            }
        }

        res.json({ message: "success", courseDetail, instructorNames });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

showData.get('/viewInstructors/:instructId', async (req, res) => {
    const instructId = req.params.instructId;
    console.log('instructId: ', instructId);
    try {
        const instructorsDetails = await pool.query(`
            select * from instructors where instructor_id = $1
        `, [instructId]);

        const instructorsDetail = instructorsDetails.rows[0];

        res.json({ message: "success", instructorsDetail });

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});


module.exports = showData;