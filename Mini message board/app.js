const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Sample messages array
const messages = [
    { text: "Hi there!", user: "Amando", added: new Date() },
    { text: "Hello World!", user: "Charles", added: new Date() }
];

// Index route
app.get('/', (req, res) => {
    res.render('index', { title: "Mini Messageboard", messages: messages });
});

// New message form route
app.get('/new', (req, res) => {
    res.render('form');
});

// Handle new message submission
app.post('/new', (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
});

// To start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
