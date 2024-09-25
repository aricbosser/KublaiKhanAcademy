const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve static files
const serveStaticFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading ' + filePath);
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
};

http.createServer((req, res) => {
    // Handle requests for static files
    if (req.url === '/') {
        serveStaticFile(res, 'calendar.html', 'text/html'); // Serve HTML file
    } else if (req.url === '/get_date.js') {
        serveStaticFile(res, 'get_date.js', 'application/javascript'); // Serve JS file
    } else if (req.url === '/calendar.css') { // Example for CSS (if needed)
        serveStaticFile(res, 'calendar.css', 'text/css'); // Serve CSS file
    } else {
        // Handle 404 for other requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}).listen(8080);

console.log('Server running at http://localhost:8080/');
