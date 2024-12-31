const pool = require('../models/db');

exports.getCategories = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.render('category', { categories: result.rows });
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
};
