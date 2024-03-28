const updateData = require('express').Router();
const pool = require('../utils/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profilImage');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Use the original filename
    }
});

const fileFilter = (req, file, cb) => {
    // Validate file type
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

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


updateData.post('/studentDetails', async (req, res) => {
    const { studentId, address, cities, states, country, zipCode, firstName, lastName, phone } = req.body;
    try {

        const userSelect = await pool.query(`SELECT * FROM student_login where student_id = $1`, [studentId]);

        console.log('userSelect: ', userSelect);

        if (userSelect.rows.length === 1) {
            // res.status(401).json({ message: 'id All Ready Exits !' });
            await pool.query(`UPDATE student_login SET student_firstname = $1, student_lastname = $2,  student_street = $3, student_city= $4, student_state = $5, student_zip_code = $6, student_country = $7, student_mobile = $8 where student_id = $9`, [firstName, lastName, address, cities, states, zipCode, country, phone, studentId]);

        }
        res.json({ message: 'update success full' })

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

updateData.get('/getImage', async (req, res) => {
    const studentId = req.query.studentId;

    console.log("studentId: ", studentId);

    try {
        const result = await pool.query('SELECT student_images FROM student_login WHERE student_id = $1', [studentId]);

        if (result.rows.length > 0) {
            const imageData = result.rows[0].student_images;
            res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type
            res.json(imageData);
        } else {
            res.status(404).json({ success: false, message: 'Image not found for the specified user ID' });
        }
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ success: false, message: 'Error retrieving image from the database' });
    }

});

updateData.post('/profileImage', upload.single('file'), async (req, res) => {
    try {
        const studentId = req.body.studentId;
        if (!studentId) {
            return res.status(400).json({ success: false, message: 'student Id is required' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        const { filename, path, mimetype } = req.file;
        console.log('Uploaded File:', { filename, path, mimetype });

        const imageUrl = `${req.file.filename}`;

        const success = await pool.query(`UPDATE student_login SET student_images = $1 WHERE student_id = $2`, [imageUrl, studentId]);

        if (success) {
            res.json({ success: true, message: 'Image updated successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Error updating image in the database' });
        }
    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({ success: false, message: 'Image upload failed' });
    }

})


module.exports = updateData