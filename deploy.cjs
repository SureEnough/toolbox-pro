const { spawn, execSync } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");
const port = 8080;

const mime = {".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".txt":"text/plain",".xml":"application/xml"};

// Start ngrok
console.log("Starting ngrok...");
const ngrok = spawn("ngrok", ["http", String(port), "--log", "stdout", "--log-format", "logfmt"], { stdio: ["ignore", "pipe", "ignore"] });
ngrok.stdout.on("data", (d) => {
  const line = d.toString();
  if (line.includes("url=")) {
    const url = line.match(/url=(\S+)/)?.[1];
    if (url && url.startsWith("https")) {
      console.log("ngrok URL:", url);
      startServer(url);
    }
  }
});

function startServer(ngrokUrl) {
  const server = http.createServer((req, res) => {
    let url = req.url.split("?")[0];
    if (url === "/") url = "/index.html";
    let fp = path.join(dist, url);
    const ext = path.extname(fp);
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      res.writeHead(200, {"Content-Type": mime[ext] || "application/octet-stream"});
      fs.createReadStream(fp).pipe(res);
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.createReadStream(path.join(dist, "index.html")).pipe(res);
    }
  });

  server.listen(port, "0.0.0.0", () => {
    console.log("\n========================================");
    console.log("  ToolBox Pro - ngrok 公网部署完成！");
    console.log("========================================");
    console.log("\n🔗 公网访问地址:", ngrokUrl);
    console.log("   本地地址: http://localhost:" + port);
    console.log("\n--- 页面测试 ---");

    const pages = ["", "/tools/password", "/tools/qrcode", "/tools/json", "/tools/color", "/tools/text", "/tools/calculator", "/tools/image", "/tools/pdf"];
    let allOk = true;
    for (const p of pages) {
      try {
        const code = execSync(`curl -s -o /dev/null -w '%{http_code}' --max-time 10 "${ngrokUrl}${p}"`, { timeout: 15000 }).toString().trim();
        const ok = code === "200";
        if (!ok) allOk = false;
        console.log(`  ${ok ? "✅" : "❌"} ${p || "/"} → HTTP ${code}`);
      } catch(e) {
        allOk = false;
        console.log(`  ❌ ${p || "/"} → ERROR`);
      }
    }

    console.log("\n--- 资源加载 ---");
    try {
      const html = execSync(`curl -s --max-time 10 "${ngrokUrl}/"`, { timeout: 15000 }).toString();
      const js = html.match(/\/assets\/[^"]*\.js/)?.[0];
      const css = html.match(/\/assets\/[^"]*\.css/)?.[0];
      if (js) {
        const r = execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' --max-time 10 "${ngrokUrl}${js}"`, { timeout: 15000 }).toString().trim();
        console.log(`  ✅ JS: ${r}`);
      }
      if (css) {
        const r = execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' --max-time 10 "${ngrokUrl}${css}"`, { timeout: 15000 }).toString().trim();
        console.log(`  ✅ CSS: ${r}`);
      }
    } catch(e) {
      console.log("  ❌ ERROR:", e.message);
    }

    console.log("\n--- 首页 HTML ---");
    try {
      const html = execSync(`curl -s --max-time 10 "${ngrokUrl}/"`, { timeout: 15000 }).toString();
      console.log("  " + html.split("\n").slice(0, 4).join("\n  "));
    } catch(e) {
      console.log("  ERROR");
    }

    console.log("\n========================================");
    console.log(allOk ? "✅ 全部测试通过！公网可正常访问" : "⚠️ 部分测试失败");
    console.log("========================================");
    console.log("\n服务器持续运行中... 地址不会改变");
    console.log("在浏览器打开:", ngrokUrl);
  });
}
