// All-in-one: start ngrok, start server, test, write results, exit
const { spawn, execSync } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");
const port = 8080;
const mime = {".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".txt":"text/plain",".xml":"application/xml"};

// Kill existing processes
try { execSync("pkill -f ngrok 2>/dev/null; fuser -k 4040/tcp 2>/dev/null; fuser -k 8080/tcp 2>/dev/null"); } catch {}
execSync("sleep 3");

// Start ngrok
console.log("Starting ngrok...");
const ngrokProc = spawn("ngrok", ["http", String(port), "--log", "stdout", "--log-format", "logfmt"], {
  stdio: ["ignore", "pipe", "pipe"], detached: false
});

let ngrokUrl = "";
ngrokProc.stdout.on("data", (data) => {
  const line = data.toString();
  const match = line.match(/url=(https:\/\/\S+)/);
  if (match && !ngrokUrl) {
    ngrokUrl = match[1];
    console.log("ngrok URL:", ngrokUrl);
    startServer(ngrokUrl);
  }
});

ngrokProc.stderr.on("data", (d) => console.error("ngrok err:", d.toString()));

function startServer(url) {
  const server = http.createServer((req, res) => {
    let p = req.url.split("?")[0];
    if (p === "/") p = "/index.html";
    let fp = path.join(dist, p);
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
    console.log("Server started on port", port);
    runTests(url, server, ngrokProc);
  });
}

function runTests(url, server, ngrokProc) {
  const results = [];
  results.push("========================================");
  results.push("  ToolBox Pro - ngrok 公网部署完成！");
  results.push("========================================");
  results.push("");
  results.push("🔗 公网地址: " + url);
  results.push("");

  const pages = ["", "/tools/password", "/tools/qrcode", "/tools/json", "/tools/color", "/tools/text", "/tools/calculator", "/tools/image", "/tools/pdf"];
  results.push("--- 页面测试 ---");
  let allOk = true;
  for (const p of pages) {
    try {
      const code = execSync(`curl -s -o /dev/null -w '%{http_code}' --max-time 10 "${url}${p}"`, { timeout: 15000 }).toString().trim();
      if (code !== "200") allOk = false;
      results.push(`  ${code === "200" ? "✅" : "❌"} ${p || "/"} → HTTP ${code}`);
    } catch(e) {
      allOk = false;
      results.push(`  ❌ ${p || "/"} → ERROR`);
    }
  }

  results.push("");
  results.push("--- 资源加载 ---");
  try {
    const html = execSync(`curl -s --max-time 10 "${url}/"`, { timeout: 15000 }).toString();
    const js = html.match(/\/assets\/[^"]*\.js/)?.[0];
    const css = html.match(/\/assets\/[^"]*\.css/)?.[0];
    if (js) results.push(`  ✅ JS: ${execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' --max-time 10 "${url}${js}"`, {timeout:15000}).toString().trim()}`);
    if (css) results.push(`  ✅ CSS: ${execSync(`curl -s -o /dev/null -w '%{http_code} %{size_download}b' --max-time 10 "${url}${css}"`, {timeout:15000}).toString().trim()}`);
  } catch(e) { results.push("  ❌ " + e.message); }

  results.push("");
  results.push("========================================");
  results.push(allOk ? "✅ 全部测试通过！" : "⚠️ 部分失败");
  results.push("========================================");
  results.push("");
  results.push("🌐 浏览器打开: " + url);
  results.push("   工具示例: " + url + "/tools/password");
  results.push("");
  results.push("服务器持续运行中...");

  const output = results.join("\n");
  fs.writeFileSync("/tmp/deploy-result.txt", output);
  console.log("\n" + output);

  // Keep running
  setInterval(() => {}, 1000);
}

// Timeout safety
setTimeout(() => {
  if (!ngrokUrl) {
    console.log("ngrok URL not received, checking API...");
    try {
      const apiResp = execSync("curl -s http://127.0.0.1:4040/api/tunnels 2>/dev/null", { timeout: 5000 }).toString();
      const tunnels = JSON.parse(apiResp).tunnels;
      if (tunnels && tunnels.length > 0) {
        ngrokUrl = tunnels[0].public_url;
        console.log("Found URL via API:", ngrokUrl);
        startServer(ngrokUrl);
      } else {
        console.log("No tunnels found. ngrok log:");
        console.log(execSync("cat /tmp/ngrok-run.log 2>/dev/null || echo 'no log'").toString());
      }
    } catch(e) {
      console.log("API check failed:", e.message);
    }
  }
}, 10000);
