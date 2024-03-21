const updateData = require('express').Router();
const pool = require('../utils/db');

updateData.put('/updateInstructor/:instructId', async (req, res) => {
    const instructId = req.params.instructId;
    console.log('instructId for update: ', instructId)
    const { status } = req.body;

    try {
        let updateStatus;

        if (status === 'disable') {
            updateStatus = await pool.query(`UPDATE instructors SET status = 'disable' WHERE instructor_id = $1`, [instructId]);
        } else if (status === 'enable') {
            updateStatus = await pool.query(`UPDATE instructors SET status = 'enable' WHERE instructor_id = $1`, [instructId]);
        }

        if (updateStatus.rowCount !== 1) {
            return res.status(401).json({ message: 'Status Updation Failed' });
        } else {
            return res.status(200).json({ message: 'Status Updated Successfully' });
        }

        // res.json({ userVuew, addressView });
    } catch (error) {
        console.error('Error update details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

updateData.put('/updateCourse/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    console.log('instructId for update: ', courseId)
    const { status } = req.body;

    try {
        let updateStatus;

        if (status === 'disable') {
            updateStatus = await pool.query(`UPDATE courses SET status = 'disable' WHERE course_id = $1`, [courseId]);
        } else if (status === 'enable') {
            updateStatus = await pool.query(`UPDATE courses SET status = 'enable' WHERE course_id = $1`, [courseId]);
        }

        if (updateStatus.rowCount !== 1) {
            return res.status(401).json({ message: 'Status Updation Failed' });
        } else {
            return res.status(200).json({ message: 'Status Updated Successfully' });
        }

        // res.json({ userVuew, addressView });
    } catch (error) {
        console.error('Error Update details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

updateData.delete('/deleteInstructors/:instructId', async (req, res) => {
    const { instructId } = req.params;

    console.log('instructId for Delete: ', instructId)

    try {
        // Perform the deletion based on the instructor ID
        const deleteQuery = await pool.query(`DELETE FROM instructors WHERE instructor_id = $1`, [instructId]);

        // Check if the deletion was successful
        if (deleteQuery.rowCount !== 1) {
            return res.status(401).json({ message: 'Deletion Failed' });
        } else {
            return res.status(200).json({ message: 'Deletion Successful' });
        }
    } catch (error) {
        console.error('Error Deleting instructor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
updateData.delete('/deleteCourse/:courseId', async (req, res) => {
    const { courseId } = req.params;

    console.log('instructId for Delete: ', courseId)

    try {
        // Perform the deletion based on the instructor ID
        const deleteQuery = await pool.query(`DELETE FROM courses WHERE course_id = $1`, [courseId]);

        // Check if the deletion was successful
        if (deleteQuery.rowCount !== 1) {
            return res.status(401).json({ message: 'Deletion Failed' });
        } else {
            return res.status(200).json({ message: 'Deletion Successful' });
        }
    } catch (error) {
        console.error('Error Deleting Course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = updateData