const http=require('http');
const fs=require('fs');
const path=require('path');

const PORT= 8080;


const server = http.createServer((req, res) => {
    const url = req.url;


    let filePath;
    switch (url) {
        case '/':
            filePath = path.join(__dirname, 'public','index.html');
            break;
        case '/about':
            filePath = path.join(__dirname,'public', 'about.html');
            break;
        case '/contact-me':
            filePath = path.join(__dirname, 'public','contact-me.html');
            break;
        default:
        
            filePath = path.join(__dirname,'public',  '404.html');
            break;
    }

    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});