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

showData.post('/viewsData', async (req, res) => {
    const studentId = req.body.studentId;

    console.log('studentId viewsData:', studentId);

    try {

        const user = await pool.query(`SELECT * FROM student_login where student_id = $1`, [studentId]);

        const studentEmail = user.rows[0].student_email
        const studentFirstName = user.rows[0].student_firstname;
        const studentLastName = user.rows[0].student_lastname;
        const studentMobileNumber = user.rows[0].student_mobile;
        const studentCreatedOn = user.rows[0].student_join_date;
        const studentLastLogin = user.rows[0].student_last_login;

        const studentStreet = user.rows[0].student_street;
        const studentCity = user.rows[0].student_city;
        const studentState = user.rows[0].student_state;
        const studentZipCode = user.rows[0].student_zip_code;
        const studentCountry = user.rows[0].student_country;


        res.json({ studentEmail, studentFirstName, studentLastName, studentMobileNumber, studentCreatedOn, studentLastLogin, studentStreet, studentCity, studentState, studentZipCode, studentCountry })

    } catch (error) {
        console.error('Error fetching image from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

showData.post('/adminViewsData', async (req, res) => {
    const adminId = req.body.adminId;

    // console.log('adminId viewsData:', adminId);

    try {

        const adminUser = await pool.query(`SELECT * FROM admin_login where admin_id = $1`, [adminId]);

        const adminEmail = adminUser.rows[0].admin_email
        const adminFirstName = adminUser.rows[0].admin_first_name;
        const adminLastName = adminUser.rows[0].admin_last_name;
        const adminLastLogin = adminUser.rows[0].last_login;
        const adminCreatedOn = adminUser.rows[0].created_at;

        const adminDetails = await pool.query(`SELECT * FROM admin_details WHERE admin_details_admin_id = $1`, [adminId]);


        // console.log(adminDetails);


        const adminMobileNumber = adminDetails.rows[0].admin_details_mobile;
        const adminStreet = adminDetails.rows[0].admin_details_street;
        const adminCity = adminDetails.rows[0].admin_details_city;
        const adminState = adminDetails.rows[0].admin_details_state;
        const adminZipCode = adminDetails.rows[0].admin_details_zip_code;
        const adminCountry = adminDetails.rows[0].admin_details_country;


        res.json({ adminEmail, adminFirstName, adminLastName, adminLastLogin, adminCreatedOn, adminMobileNumber, adminStreet, adminCity, adminState, adminZipCode, adminCountry });

    } catch (error) {
        console.error('Error fetching image from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


module.exports = showData;