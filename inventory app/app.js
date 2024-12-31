const express = require('express');
const bodyParser = require('body-parser');
const itemsController = require('./controllers/itemsController');
const categoriesController = require('./controllers/categoriesController');
const app = express();
const PORT = process.env.PORT || 3002;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', itemsController.getItems);
app.get('/item/:id', itemsController.getItem);
app.get('/new-item', (req, res) => res.render('form'));
app.post('/new-item', itemsController.createItem);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
