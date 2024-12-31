const pool = require('../models/db');

exports.getItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.render('index', { items: result.rows });
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
};

exports.getItem = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
        res.render('item', { item: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
};

exports.createItem = async (req, res) => {
    const { name, description, quantity, category_id } = req.body;
    try {
        await pool.query('INSERT INTO items (name, description, quantity, category_id) VALUES ($1, $2, $3, $4)', 
                         [name, description, quantity, category_id]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Error occurred');
    }
};
