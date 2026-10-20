const http = require("http");
const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");
const port = 8080;

const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  let url = req.url.split("?")[0];
  if (url === "/") url = "/index.html";

  let filePath = path.join(dist, url);
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    const fallback = path.join(dist, "index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(fallback).pipe(res);
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
