const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3500
const app = express()
// serve static files
app.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 2. NEW PAGE ROUTE: Matches '/new-page' or '/new-page.html'
app.get(['/new-page', '/new-page.html'], (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});



app.listen(PORT, () => console.log(`server is running ${PORT}`))