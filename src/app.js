const express = require('express');
const path = require('path');
const app = express();

// Serve static files (if your login page is a static HTML file)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Alternatively, if using a view engine like EJS, Pug, etc.
app.set('view engine', 'ejs'); // or 'pug', 'hbs', etc.
app.get('/', (req, res) => {
    res.render('login'); // Assuming you have a login.ejs or login.pug file in your views directory
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});