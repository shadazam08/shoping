const showData = require('express').Router();
const pool = require('../utils/db');


showData.get('/sideBarMenu', async (req, res) => {
    try {
        await pool
        const menuItems = await pool.query(`
            SELECT * FROM admin_menu_item 
        `);
        const sideMenuItems = menuItems.rows
        res.json({ message: "success", sideMenuItems });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
})



module.exports = showData;