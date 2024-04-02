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
const adminStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/adminProfileImage');
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
const adminUpload = multer({
    storage: adminStorage,
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

});

updateData.post('/checkOldPassword', async (req, res) => {

    const { studentsEmail, oldPassword } = req.body;

    try {
        const user = await pool.query('SELECT * FROM student_login WHERE student_email = $1', [studentsEmail]);

        if (user.rows.length !== 1) {
            return res.status(401).json({ message: 'Invalid Email ID !' });
        }

        if (oldPassword !== user.rows[0].student_password) {
            return res.status(401).json({ success: false, message: 'Incorrect old password' });
        }
        // else if (oldPassword === user.rows[0].student_password) {
        //     return res.status(200).json({ success: true, message: 'Old password is correct' });
        // }

        res.status(200).json({ success: true, message: 'Old password is correct' });

    } catch (error) {
        console.error('Password Updation Failed:', error);
        res.status(500).json({ success: false, message: 'Password Updation Failed' });
    }

});
updateData.post('/updatePassword', async (req, res) => {

    const { studentsEmail, newPassword } = req.body;

    try {
        const user = await pool.query('SELECT * FROM student_login WHERE student_email = $1', [studentsEmail]);

        if (user.rows.length !== 1) {
            return res.status(401).json({ message: 'Invalid Email ID !' });
        }

        const updatePassword = await pool.query(`UPDATE student_login SET student_password = $1 WHERE student_email = $2`, [newPassword, studentsEmail]);

        if (updatePassword.rowCount !== 1) {
            return res.status(401).json({ message: 'Password Updation Failed' });
        } else {
            return res.status(200).json({ message: 'Password Updated Succesfully' });
        }

    } catch (error) {
        console.error('Password Updation Failed:', error);
        res.status(500).json({ success: false, message: 'Password Updation Failed' });
    }

});

updateData.get('/getAdminImage', async (req, res) => {
    const adminId = req.query.adminId;

    console.log("getAdminImage adminId: ", adminId);

    try {
        const result = await pool.query('SELECT admin_details_images FROM admin_details WHERE admin_details_admin_id = $1', [adminId]);

        if (result.rows.length > 0) {
            const imageData = result.rows[0].admin_details_images;
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

updateData.post('/updateAdminDetails', async (req, res) => {
    const { adminId, address, cities, states, country, zipCode, firstName, lastName, phone } = req.body;
    try {

        const userSelect = await pool.query(`SELECT * FROM admin_login where admin_id = $1`, [adminId]);

        const adminSelect = await pool.query(`SELECT * FROM admin_details where admin_details_admin_id = $1`, [adminId]);

        console.log('userSelect: ', userSelect);

        if (userSelect.rows.length === 1) {
            await pool.query(`UPDATE admin_login SET admin_first_name = $1, admin_last_name = $2 WHERE admin_id = $3`, [firstName, lastName, adminId])
        }

        if (adminSelect.rows.length === 1) {
            // res.status(401).json({ message: 'id All Ready Exits !' });
            await pool.query(`UPDATE admin_details SET admin_details_street = $1,  admin_details_city = $2, admin_details_state= $3, admin_details_country = $4, admin_details_zip_code = $5, admin_details_mobile = $6 where admin_details_admin_id = $7`, [address, cities, states, country, zipCode, phone, adminId]);

        } else {
            await pool.query(`INSERT INTO admin_details(admin_details_admin_id, admin_details_street, admin_details_city, admin_details_state, admin_details_country, admin_details_zip_code, admin_details_mobile) VALUES($1, $2, $3, $4, $5, $6, $7)`, [adminId, address, cities, states, country, zipCode, phone]);
        }
        res.json({ message: 'update success full' })

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

updateData.post('/adminProfileImage', adminUpload.single('file'), async (req, res) => {
    try {
        const adminId = req.body.adminId;

        console.log('adminProfileImage : ', adminId)
        if (!adminId) {
            return res.status(400).json({ success: false, message: 'Admin Id is required' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        const { filename, path, mimetype } = req.file;
        console.log('Uploaded File:', { filename, path, mimetype });

        const imageUrl = `${req.file.filename}`;

        const success = await pool.query(`UPDATE admin_details SET admin_details_images = $1 WHERE admin_details_admin_id = $2`, [imageUrl, adminId]);

        if (success) {
            res.json({ success: true, message: 'Image updated successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Error updating image in the database' });
        }
    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({ success: false, message: 'Image upload failed' });
    }

});

updateData.post('/adminPasswordCheck', async (req, res) => {

    const { adminEmail, oldPassword } = req.body;

    try {
        const user = await pool.query('SELECT * FROM admin_login WHERE admin_email = $1', [adminEmail]);

        if (user.rows.length !== 1) {
            return res.status(401).json({ message: 'Invalid Email ID !' });
        }

        if (oldPassword !== user.rows[0].admin_password) {
            return res.status(401).json({ success: false, message: 'Incorrect old password' });
        }

        res.status(200).json({ success: true, message: 'Old password is correct' });

    } catch (error) {
        console.error('Password Updation Failed:', error);
        res.status(500).json({ success: false, message: 'Password Updation Failed' });
    }

});

updateData.post('/adminUpdatePassword', async (req, res) => {

    const { adminEmail, newPassword } = req.body;

    try {
        const user = await pool.query('SELECT * FROM admin_login WHERE admin_email = $1', [adminEmail]);

        if (user.rows.length !== 1) {
            return res.status(401).json({ message: 'Invalid Email ID !' });
        }

        const updatePassword = await pool.query(`UPDATE admin_login SET admin_password = $1 WHERE admin_email = $2`, [newPassword, adminEmail]);

        if (updatePassword.rowCount !== 1) {
            return res.status(401).json({ message: 'Password Updation Failed' });
        } else {
            return res.status(200).json({ message: 'Password Updated Succesfully' });
        }

    } catch (error) {
        console.error('Password Updation Failed:', error);
        res.status(500).json({ success: false, message: 'Password Updation Failed' });
    }

});


module.exports = updateData