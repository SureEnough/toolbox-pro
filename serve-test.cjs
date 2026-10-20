const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const dist = path.join(__dirname, "dist");
const port = 8080;

const mime = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".txt": "text/plain", ".xml": "application/xml",
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
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(dist, "index.html")).pipe(res);
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`✅ 服务器启动: http://localhost:${port}`);
  console.log("");

  const NGROK = "https://remindful-pureness-resonant.ngrok-free.dev";
  console.log("🔗 ngrok 公网地址:", NGROK);
  console.log("");

  // Test pages
  console.log("=== 页面测试 ===");
  const pages = ["", "/tools/password", "/tools/qrcode", "/tools/json", "/tools/color", "/tools/text", "/tools/calculator", "/tools/image", "/tools/pdf"];
  for (const p of pages) {
    try {
      const code = execSync(`curl -s -o /dev/null -w '%{http_code}' "${NGROK}${p}"`, { timeout: 10000 }).toString().trim();
      console.log(`  ${p || "/"} → HTTP ${code}`);
    } catch(e) {
      console.log(`  ${p || "/"} → ERROR`);
    }
  }

  console.log("");
  console.log("=== 资源加载 ===");
  try {
    const html = execSync(`curl -s "${NGROK}/"`, { timeout: 10000 }).toString();
    const jsMatch = html.match(/\/assets\/[^"]*\.js/);
    const cssMatch = html.match(/\/assets\/[^"]*\.css/);
    if (jsMatch) {
      const jsCode = execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' "${NGROK}${jsMatch[0]}"`, { timeout: 10000 }).toString().trim();
      console.log(`  JS: ${jsCode}`);
    }
    if (cssMatch) {
      const cssCode = execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' "${NGROK}${cssMatch[0]}"`, { timeout: 10000 }).toString().trim();
      console.log(`  CSS: ${cssCode}`);
    }
  } catch(e) {
    console.log("  ERROR:", e.message);
  }

  console.log("");
  console.log("✅ 全部测试完成！服务器持续运行中...");
  console.log("   ngrok 地址:", NGROK);
});
